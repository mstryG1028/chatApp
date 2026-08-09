import express from "express";
import {
  getAllConversations,
  getConversation,
} from "./conversation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, getAllConversations);

router.route("/:id").get(verifyJWT, getConversation);

export default router;
