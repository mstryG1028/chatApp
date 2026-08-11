import { Message } from "./message.model.js";
import { Conversation } from "../converstion/conversation.model.js";

export const markMessageAsDelivered = async (messageId) => {
  const message = await Message.findByIdAndUpdate(
    messageId,
    {
      status: "delivered",
    },
    {
      returnDocument: "after",
    },
  );

  return message;
};

export const markMessageAsRead = async (messageId) => {
  const message = await Message.findByIdAndUpdate(
    messageId,
    {
      status: "read",
    },
    {
      returnDocument: "after",
    },
  );

  return message;
};

// ==========================================
// MARK ALL PENDING MESSAGES FOR ONLINE USER
// ==========================================

export const deliverPendingMessages = async (userId) => {
  // Find conversations where this user is a participant
  const conversations = await Conversation.find({
    participants: userId,
  }).select("_id");

  const conversationIds = conversations.map((conversation) => conversation._id);

  if (conversationIds.length === 0) {
    return [];
  }

  // Find messages:
  // 1. Belong to user's conversations
  // 2. Are still sent
  // 3. Were NOT sent by the user himself
  const pendingMessages = await Message.find({
    conversation: { $in: conversationIds },
    status: "sent",
    senderId: { $ne: userId },
  });

  return pendingMessages;
};
