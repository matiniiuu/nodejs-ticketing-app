import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
// import cors from "cors";
import { errorHandler, NotFoundError } from "@msetick/common";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
// import { errorHandler } from "./middlewares/error-handler";
// import { NotFoundError } from "./errors/not-found-error";
// const corsOptions = {
//     origin: ["http://localhost:3000", "http://127.0.0.1"],
//     credentials: true,
//     exposedHeaders: ["set-cookie"],
// };

const app = express();
app.set("trust proxy", true);
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", new Boolean(true).toString());

    // Pass to next layer of middleware
    next();
});
app.use(json());
// app.use(cors(corsOptions));
// app.use(cors());

app.use(
    cookieSession({
        signed: false,
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);
export { app };
