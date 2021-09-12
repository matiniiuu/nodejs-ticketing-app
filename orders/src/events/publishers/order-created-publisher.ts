import { Publisher, OrderCreatedEvent, Subjects } from "@msetick/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
