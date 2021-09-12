import { Publisher, TicketCreatedEvent, Subjects } from "@msetick/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
