import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
// import { natsWrapper } from "../../nats-wrapper";
const createOrder = async (cookie: string[]) => {
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: "test",
        price: 20,
    });
    await ticket.save();
    return request(app)
        .post("/api/orders")
        .set("Cookie", cookie)
        .send({
            ticketId: ticket.id,
        })
        .expect(201);
};

it("fetches orders for an particular user", async () => {
    const cookie = global.signin();
    await createOrder(cookie);
    await createOrder(cookie);
    await createOrder(cookie);
    const respones = await request(app).get(`/api/orders`).set("Cookie", cookie).expect(200);
    expect(respones.body.length).toEqual(3);
});
