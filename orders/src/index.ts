import { randomBytes } from "crypto";
import mongoose from "mongoose";

import { app } from "./app";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { natsWrapper } from "./nats-wrapper";
const start = async () => {
    try {
        await natsWrapper.connect("ticketing", randomBytes(4).toString("hex"), "http://localhost:4222");
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed!");
            process.exit();
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
        await mongoose.connect("mongodb://localhost:27017/orders", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();
        new ExpirationCompleteListener(natsWrapper.client).listen();

        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }

    app.listen(5002, () => {
        console.log("Listening on port 5002!!!!!!!!");
    });
};

start();
