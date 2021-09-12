import { body } from "express-validator";
import express, { Request, Response } from "express";
import { BadRequestError, currentUser, NotAuthorizedError, NotFoundError, requireAuth, validationReques } from "@msetick/common";

import { Ticket } from "../models/ticket";

import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put("/api/tickets/:id", currentUser, requireAuth, [body("title").not().isEmpty().withMessage("Title is required"), body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0")], validationReques, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
        throw new NotFoundError();
    }

    if (ticket.orderId) {
        throw new BadRequestError("Cannot edit a reseved ticket");
    }

    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    ticket.set({
        title,
        price,
    });
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version,
    });
    res.status(200).send(ticket);
});

export { router as updateTicketRouter };
