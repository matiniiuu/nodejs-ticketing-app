import mongoose from "mongoose";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { BadRequestError, currentUser, NotFoundError, OrderStatus, requireAuth, validationReques } from "@msetick/common";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.post(
    "/api/orders",
    currentUser,
    requireAuth,
    [
        body("ticketId")
            .not()
            .isEmpty()
            .custom((input: string) => {
                return mongoose.Types.ObjectId.isValid(input);
            })
            .withMessage("TicketId must be provided"),
    ],
    validationReques,
    async (req: Request, res: Response) => {
        console.log("Asdasd");
        const { ticketId } = req.body;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new NotFoundError();
        }

        const isReserved = await ticket.isReserved();
        if (isReserved) {
            throw new BadRequestError("Ticket is already reserved");
        }

        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + 1 * 60);

        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket,
        });
        await order.save();

        await new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            ticket: {
                id: ticket.id,
                price: ticket.price,
            },
        });
        res.status(201).send(order);
    }
);

export { router as createOrderRouter };
