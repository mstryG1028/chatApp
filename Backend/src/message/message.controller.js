import { User } from "../user/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Message } from "../message/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../converstion/conversation.model.js";
import { getClient } from "../socket/socket.manager.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { message, conversationId } = req.body;

  const senderId = req.user._id;

  // 1. Find conversation
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  // 2. Verify sender belongs to conversation
  const isParticipant = conversation.participants.some(
    (participant) => participant.toString() === senderId.toString(),
  );

  if (!isParticipant) {
    throw new ApiError(403, "Unauthorized request");
  }

  // // 3. Find receiver
  // const receiverId = conversation.participants.find(
  //   (participant) => participant.toString() !== senderId.toString(),
  // );

  // 4. Save message
  const newMessage = await Message.create({
    conversation: conversation._id,
    message,
    senderId,
    status: "sent",
  });

  console.log("message form msgConrooler", newMessage);
  if (!newMessage) {
    throw new ApiError(400, "Message not saved");
  }

  // 5. Update last message
  conversation.lastMessage = newMessage._id;

  await conversation.save();

  const receiverId = conversation.participants.find(
    (participant) => participant.toString() !== senderId.toString(),
  );

  console.log("Sender:", senderId.toString());
  console.log("Receiver:", receiverId.toString());

  // 6. Find receiver's WebSocket
  const receiverSocket = getClient(receiverId);
  const senderSocket = getClient(senderId);

  console.log("Receiver socket:", receiverSocket ? "ONLINE" : "OFFLINE");
  // 7. Send real-time message
  console.log("Sending NEW_MESSAGE to receiver");

  const socketPayload = JSON.stringify({
    type: "new_message",
    message: newMessage,
    conversationId: conversation._id,
    senderId: senderId.toString(),
    receiverId: receiverId.toString(),
  });

  if (receiverSocket) {
    console.log("📤 Sending NEW_MESSAGE to ONLINE receiver");

    receiverSocket.send(socketPayload);
  } else {
    console.log("❌ Receiver OFFLINE - NOT sending socket message");
  }

  if (senderSocket) {
    senderSocket.send(socketPayload);
  }

  // 8. HTTP response to sender
  return res
    .status(200)
    .json(new ApiResponse(201, newMessage, "Successfully sent"));
});
