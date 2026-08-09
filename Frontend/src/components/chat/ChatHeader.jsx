import { EllipsisVertical, Phone, Video } from "lucide-react";

import Avatar from "../ui/Avatar";

const ChatHeader = ({ user, online }) => {
  // Functions
  if (!user) {
    return (
      <header className="flex h-20 items-center border-b border-border bg-surface px-6">
        <p className="text-text-muted">Select a conversation</p>
      </header>
    );
  }

  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between

        border-b
        border-border

        bg-surface

        px-6
      "
    >
      <div className="flex items-center gap-4">
        <Avatar src={user.avatar} name={user.name} online={user.online} />

        <div>
          <h2 className="text-lg font-semibold text-text">{user.name}</h2>

          <p className="text-sm text-text-muted">
            {user.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="
            rounded-lg
            p-2.5

            transition

            hover:bg-background
          "
        >
          <Phone size={20} />
        </button>

        <button
          className="
            rounded-lg
            p-2.5

            transition

            hover:bg-background
          "
        >
          <Video size={20} />
        </button>

        <button
          className="
            rounded-lg
            p-2.5

            transition

            hover:bg-background
          "
        >
          <EllipsisVertical size={20} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
