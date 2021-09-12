import { Publisher, OrderCancelledEvent, Subjects } from "@msetick/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
