import { MessageCircleMore } from "lucide-react";

const EmptyChat = () => {
  return (
    <div
      className="
        flex
        flex-1
        flex-col
        items-center
        justify-center

        px-6
      "
    >
      <div
        className="
          mb-6

          flex
          h-28
          w-28

          items-center
          justify-center

          rounded-full

          bg-primary/10
        "
      >
        <MessageCircleMore size={50} className="text-primary" />
      </div>

      <h2
        className="
          text-2xl
          font-semibold
          text-text
        "
      >
        Welcome to ChatFlow
      </h2>

      <p
        className="
          mt-3
          max-w-sm

          text-center
          text-text-muted
        "
      >
        Select a conversation from the sidebar to start chatting with your
        friends.
      </p>
    </div>
  );
};

export default EmptyChat;
