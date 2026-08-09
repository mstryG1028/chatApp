import { verifyJWT } from "../middlewares/auth.middleware.js";
import { sendMessage } from "./message.controller.js";
import express from "express";
const router = express.Router();

router.route("/send-message").post(verifyJWT, sendMessage);

export default router;
