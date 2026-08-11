import { useRef, useState } from "react";
import { Image, Paperclip, Send, Smile } from "lucide-react";

import { sendMessage } from "../../services/chat.service";
import { sendSocketMessage } from "../../socket/socket";

const MessageInput = ({ conversationId, receiverId }) => {
  // States

  const [message, setMessage] = useState("");

  const typingTimer = useRef(null);

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      message,
      conversationId,
    };

    console.log(data);
    await sendMessage(data);
    setMessage("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // whenever state of input field will change this will run
    if (value.trim() != "") {
      console.log("⌨️ TYPING START");
      console.log("Receiver:", receiverId);

      sendSocketMessage({
        type: "typing_start",
        receiverId,
      });

      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => {
        console.log("🛑 TYPING STOP");
        console.log("Receiver:", receiverId);

        sendSocketMessage({
          type: "typing_stop",
          receiverId,
        });
      }, 1000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        border-t
        border-border

        bg-surface

        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2

          rounded-xl

          border
          border-border

          bg-background

          px-3
          py-2
        "
      >
        <button type="button" className="rounded-lg p-2 hover:bg-surface">
          <Smile size={20} />
        </button>

        <button type="button" className="rounded-lg p-2 hover:bg-surface">
          <Paperclip size={20} />
        </button>

        <button type="button" className="rounded-lg p-2 hover:bg-surface">
          <Image size={20} />
        </button>

        <input
          type="text"
          name="input"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          className="
            flex-1

            bg-transparent

            px-2

            text-sm

            outline-none

            placeholder:text-text-muted
          "
        />

        <button
          type="submit"
          className="
            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-full

            bg-primary

            text-white

            transition

            hover:bg-primary-hover
          "
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
