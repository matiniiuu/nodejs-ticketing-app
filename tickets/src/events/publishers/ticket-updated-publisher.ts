import { Publisher, TicketUpdatedEvent, Subjects } from "@msetick/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
