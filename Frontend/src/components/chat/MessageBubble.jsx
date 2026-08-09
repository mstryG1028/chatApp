import { CheckCheck } from "lucide-react";
import { cn } from "../../utils/cn";

const MessageBubble = ({ message, currentUserId }) => {
  const senderId = message.senderId?._id || message.senderId;

  const isSender = senderId?.toString() === currentUserId?.toString();
  //console.log("💬 MessageBubble:", message);

  return (
    <div
      className={cn("mb-3 flex", isSender ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 shadow-sm",
          isSender
            ? "rounded-br-md bg-primary text-white"
            : "rounded-bl-md border border-border bg-surface text-text",
        )}
      >
        {message.message}

        <div
          className={cn(
            "mt-2 flex items-center justify-end gap-1 text-xs",
            isSender ? "text-white/80" : "text-text-muted",
          )}
        >
          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isSender && <CheckCheck size={15} />}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
