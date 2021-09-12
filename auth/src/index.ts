import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/auth", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }

    app.listen(5000, () => {
        console.log("Listening on port 5000!!!!!!!!");
    });
};

start();
