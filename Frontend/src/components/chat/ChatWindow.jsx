import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = ({ selectedConversation, messages }) => {
  console.log(selectedConversation);
  const handleSend = (text) => {
    console.log("New Message:", text);
  };

  return (
    <section
      className="
        flex
        h-full
        flex-col

        bg-background
      "
    >
      {/* Header */}

      <ChatHeader user={selectedConversation} online={true} />

      <div
        className="
          flex-1

          overflow-y-auto

          p-4
        "
      >
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
            isOwn={message.sender === "me"}
          />
        ))}
      </div>

      {/* Input */}

      <MessageInput onSend={handleSend} />
    </section>
  );
};

export default ChatWindow;
