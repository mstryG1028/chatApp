import mongoose from "mongoose";
import { User } from "../user/user.model.js";
import { Message } from "../message/message.model.js";
const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
