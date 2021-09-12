import express, { Request, Response } from "express";

import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validationReques, BadRequestError } from "@msetick/common";
import { User } from "../models/user";
// import { validationReques } from "../middlewares/validate-request";
// import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";

const router = express.Router();

router.post("/api/users/signin", [body("email").isEmail().withMessage("Email must be valid"), body("password").trim().notEmpty().withMessage("Password must suppy password")], validationReques, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError("Email not found!");
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError("Invalid Password");
    }
    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email,
        },
        "MATIN"
    );

    // Store it on session object
    req.session = {
        jwt: userJwt,
    };

    res.status(200).send(existingUser);
});

export { router as signinRouter };
