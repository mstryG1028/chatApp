import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "./conversation.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Message } from "../message/message.model.js";

export const getConversation = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  console.log(" params from getCOnversation", req.params);
  const { id } = req.params;


  let conversation = await Conversation.findOne({
    participants: {
      $all: [senderId, id],
    },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, id],
    });
  }
  console.log(
    "Conversation ID from getCoversation:",
    conversation._id.toString(),
  );

  // we can also create a seperate controller to fetch only messages
  // but our requirement is if user click on any friend list then if prev message exist then return all messages
  // so we have to make 2 api req 1: for finding conv exist 2. get All messages
  const messages = await Message.find({
    conversation: conversation._id,
  })
    .populate("senderId", "name avatar") // bcz evry msg is sended by someone
    .sort({ createdAt: 1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        { conversation, messages },
        "Successfully fetched Conversation",
      ),
    );
});

export const getAllConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const allConversations = await Conversation.find({
    participants: userId,
  })
    .populate("participants", "name username avatar")
    .populate({
      path: "lastMessage",
      populate: {
        path: "senderId",
        select: "name avatar",
      },
    })
    .sort({ updatedAt: -1 });

  const sidebarChats = allConversations.map((conversation) => {
    const otherUser = conversation.participants.find(
      (p) => p._id.toString() !== userId.toString(),
    );
    if (!otherUser) {
      console.log("Invalid conversation:", conversation._id.toString());

      return null;
    }

    return {
      _id: conversation._id,
      friendId: otherUser._id,
      name: otherUser.name,
      username: otherUser.username,
      avatar: otherUser.avatar,
      lastMessage: conversation.lastMessage?.message || "",
      time: conversation.lastMessage?.createdAt,
    };
  });

  res
    .status(200)
    .json(
      new ApiResponse(201, sidebarChats, "Successfully fetched Conversation"),
    );
});
