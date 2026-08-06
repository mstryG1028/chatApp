import { sendMessage } from "./message.controller.js";
import express from 'express'
const router = express.Router();

router.route("/send-message").post(sendMessage);


export default router;
