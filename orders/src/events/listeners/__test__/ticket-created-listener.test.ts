import mongoose from "mongoose";
import { TicketCreatedEvent } from "@msetick/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListener } from "../ticket-created-listener";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
const setup = () => {
    const listener = new TicketCreatedListener(natsWrapper.client);
    const data: TicketCreatedEvent["data"] = {
        version: 0,
        id: mongoose.Types.ObjectId().toHexString(),
        title: "test",
        price: 10,
        userId: mongoose.Types.ObjectId().toHexString(),
    };
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };
    return { listener, data, msg };
};
it("creates and saves a ticket", async () => {
    const { data, msg, listener } = await setup();
    await listener.onMessage(data, msg);
    const ticket = await Ticket.findById(data.id);
    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});
it("ackts the message", async () => {
    const { data, msg, listener } = await setup();
    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});
