import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import { cn } from "../../utils/cn";

const ChatItem = ({
  user = { name: "deepak" },
  lastMessage,
  time = "20:20",
  unread = 20,
  active = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex gap-3",
        "cursor-pointer",
        "rounded-md",
        "p-3",
        "transition",

        active ? "bg-primary/10" : "hover:bg-surface",
      )}
    >
      {/* Avatar */}

      <Avatar src={user?.avatar} name={user?.name} />

      {/* Chat Content */}

      <div className="flex-1 min-w-0">
        {/* Name + Time */}

        <div className="flex items-center justify-between gap-2">
          <h3
            className="
              font-medium
              text-text
              truncate
            "
          >
            {user?.name}
          </h3>

          <span
            className="
              text-xs
              text-text-muted
              whitespace-nowrap
            "
          >
            {time}
          </span>
        </div>

        {/* Message + Badge */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
          "
        >
          <p
            className="
              text-sm
              text-text-muted
              truncate
            "
          >
            {lastMessage}
          </p>

          {unread > 0 && <Badge variant="primary">{unread}</Badge>}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
