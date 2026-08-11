import Avatar from "../ui/Avatar";
import { cn } from "../../utils/cn";

const ChatCard = ({ chat, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200",
        active ? "bg-primary text-white shadow-md" : "hover:bg-background",
      )}
    >
      <Avatar src={chat.avatar} name={chat.name} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-medium">{chat.name}</h3>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs",
                active ? "text-white/80" : "text-text-muted",
              )}
            >
              {new Date(chat.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            {chat.unreadCount > 0 && (
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium",
                  active ? "bg-white text-primary" : "bg-primary text-white",
                )}
              >
                {chat.unreadCount}
              </span>
            )}
          </div>
        </div>

        <p
          className={cn(
            "mt-1 truncate text-sm",
            active ? "text-white/80" : "text-text-muted",
          )}
        >
          {chat.lastMessage || "Start a conversation"}
        </p>
      </div>
    </button>
  );
};

export default ChatCard;
