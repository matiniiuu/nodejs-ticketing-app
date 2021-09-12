import { currentUser, NotAuthorizedError, NotFoundError, requireAuth } from "@msetick/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders/:id", currentUser, requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("ticket");
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    res.send(order);
});
export { router as showOrderRouter };
