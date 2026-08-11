import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { sendSocketMessage } from "../../socket/socket";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
  const { user } = useAuth();

  useEffect(() => {
    messages.forEach((message) => {
      const senderId =
        message.senderId?._id?.toString() || message.senderId?.toString();

      const currentUserId = user?._id?.toString();

      const isReceivedMessage = senderId !== currentUserId;

      if (isReceivedMessage && message.status !== "read") {
        sendSocketMessage({
          type: "message_read",
          messageId: message._id,
        });
      }
    });
  }, [messages, user?._id]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5">
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          currentUserId={user._id}
        />
      ))}
    </div>
  );
};

export default MessageList;
