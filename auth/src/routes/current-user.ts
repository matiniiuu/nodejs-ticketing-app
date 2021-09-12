import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { currentUser, requireAuth } from "@msetick/common";

const router = express.Router();

router.get("/api/users/currentUser", currentUser, requireAuth, (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
