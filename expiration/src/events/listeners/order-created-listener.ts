import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@msetick/common";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log("Waiting this many mi to p t j ", delay);
        try {
            await expirationQueue.add(
                {
                    orderId: data.id,
                },
                { delay }
            );
        } catch (err) {
            console.log({ err });
        }
        msg.ack();
    }
}
