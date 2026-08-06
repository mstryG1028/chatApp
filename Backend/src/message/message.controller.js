import { User } from "../user/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Message } from "../message/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../converstion/conversation.model.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { message, converationId } = req.body;
  const senderId = req.user._id;

  // Validate that the provided conversationId belongs to an existing conversation.
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  // the user sending convId could be stolen, so check this conversation belong to requsted id
  const isPrticipant = conversation.participants.some(
    (participants) => participants.toString() === senderId.toString(),
  );
  if (!isPrticipant) {
    throw new ApiError(403, "unauthorized req");
  }

  const newMessage = await Message.create({
    conversation: conversation._id,
    message,
    senderId: req.user._id,
    receiverId: req.params.id,
  });

  if (!newMessage) {
    throw new ApiError(400, "Message not saved");
  }

  converation.lastMessage = newMessage._id;
  await conversation.save();

  res.status(200).json(new ApiResponse(201, newMessage, "Successfully sent"));
});

export const getAllMessage = async (req, res) => {
  // from currUSer.Id, to searched user id

  const allMessages = await Message.find({
    $or: [
      {
        from: req.user._id,
        to: req.params.id,
      },
      {
        from: req.params.id,
        to: req.user._id,
      },
    ],
  }).sort({ createdAt: 1 });

  if (!allMessages) {
    throw new ApiError(404, "No messages Found");
  }

  res.status(200).json(201, allMessages, "Successfully fetched all records");
};
