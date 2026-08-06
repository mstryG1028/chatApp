import mongoose from "mongoose";
import { User } from "../user/user.model.js";
import { Conversation } from "../converstion/conversation.model.js";


const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receverId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messsage: {
      type: String,
      required: true,
    },

    files: {
      type: [],
    },
  },
  { timestamps: true },
);

export const Message = mongoose.model("Message", messageSchema);
