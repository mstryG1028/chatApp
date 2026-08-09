import Input from "../ui/Input";
import ChatItem from "./ChatItem";

const ChatSidebar = () => {
  const [conversations, setConveration] = ueeState({});

  const fetchAllConversations = async () => {
    try {
      const conversations = await Axios.get(``);
      setConveration(conversations.data);
      console.log(conversations.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchAllConversations();
  }, []);

  const chats = [
    {
      id: 1,

      user: {
        name: "Rahul",
      },

      lastMessage: "Hey bro...",
      time: "10:30 AM",
      unread: 2,
    },

    {
      id: 2,

      user: {
        name: "Amit",
      },

      lastMessage: "See you soon",
      time: "09:20 AM",
      unread: 0,
    },

    {
      id: 3,

      user: {
        name: "John",
      },

      lastMessage: "Let's meet tomorrow",
      time: "Yesterday",
      unread: 1,
    },
  ];

  return (
    <aside
      className="
        flex
        h-full
        w-full
        flex-col

        border-r
        border-border

        bg-background
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-border
          p-4
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            text-text
            mb-4
          "
        >
          Chats
        </h2>

        <Input placeholder="Search chats..." />
      </div>

      {/* Chat List */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-3
          space-y-2
        "
      >
        {conversations.map((conversation) => (
          <ChatItem
            key={conversation.id}
            user={conversation.user}
            lastMessage={conversation.lastMessage}
            time={conversation.time}
            unread={conversation.unread}
          />
        ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;
