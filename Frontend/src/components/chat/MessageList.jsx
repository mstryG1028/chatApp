import { useAuth } from "../../hooks/useAuth";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
  const { user } = useAuth();
 // console.log("📨 MessageList rendered:", messages);

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
