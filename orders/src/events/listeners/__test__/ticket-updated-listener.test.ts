import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@msetick/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client);
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: "test",
        price: 10,
    });
    await ticket.save();
    const data: TicketUpdatedEvent["data"] = {
        version: ticket.version + 1,
        id: ticket.id,
        title: "test",
        price: 10,
        userId: mongoose.Types.ObjectId().toHexString(),
    };
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };
    return { listener, data, msg, ticket };
};
it("finds, updates and saves a ticket", async () => {
    const { listener, data, msg, ticket } = await setup();
    await listener.onMessage(data, msg);
    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket).toBeDefined();
    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
});
it("ackts the message", async () => {
    const { data, msg, listener } = await setup();
    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has a skipped version number", async () => {
    const { listener, data, msg, ticket } = await setup();
    data.version = 20;
    try {
        await listener.onMessage(data, msg);
    } catch (err) {}
    expect(msg.ack).not.toHaveBeenCalled();
});
