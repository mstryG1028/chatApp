import LeftSidebar from "../components/chat/LeftSidebar";
import RightSidebar from "../components/chat/RightSidebar";
import { useState, useCallback, useRef, useEffect } from "react";
import { getConversation } from "../services/conversation.service";
import { useAuth } from "../hooks/useAuth";
import { useSocket } from "../socket/useSocket";
import {
  connectSocket,
  identifySocket,
  disconnectSocket,
} from "../socket/socket";
import { getAllConversation } from "../services/conversation.service";

const ChatPage = () => {
  const { user } = useAuth();
  // States
  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  // Functions
  const selectedConversationRef = useRef(null);
  const handleSelectChat = async (chat) => {
    console.log("🟢 SELECTED CHAT:", chat);

    setSelectedConversation(chat);
    selectedConversationRef.current = chat;
    const res = await getConversation(chat.friendId);

    console.log("🟢 CONVERSATION FROM API:", res.data.message.conversation);

    setMessages(res.data.message.messages);
  };

  const handleStartChat = async (user) => {
    try {
      console.log("Starting chat with:", user._id);

      const res = await getConversation(user._id);

      const { conversation, messages } = res.data.message;

      const chat = {
        _id: conversation._id,
        friendId: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      };

      setSelectedConversation(chat);
      selectedConversationRef.current = chat;

      setMessages(messages);

      await fetchConversations();
    } catch (error) {
      console.log("Error starting chat:", error);
    }
  };

  const fetchConversations = useCallback(async () => {
    try {
      const res = await getAllConversation();
      setConversations(res.data.message);
    } catch (err) {
      console.log("err from chat page while fetching conversations", err);
    }
  }, []);

  const handleSocketMessage = (data) => {
    console.log("🔥 ChatPage received:", data);

    if (data.type !== "new_message") {
      return;
    }

    const newMessage = data.message;
    const conversationId = data.conversationId.toString();

    // ==========================================
    // 1. UPDATE CURRENTLY OPEN CHAT
    // ==========================================

    if (conversationId === selectedConversationRef.current?._id?.toString()) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    // ==========================================
    // 2. CHECK SIDEBAR CONVERSATION
    // ==========================================

    const existingConversation = conversations.find(
      (conversation) => conversation._id.toString() === conversationId,
    );

    // ==========================================
    // 3. EXISTING CONVERSATION
    // ==========================================

    if (existingConversation) {
      setConversations((prevConversations) => {
        const updatedConversation = {
          ...existingConversation,
          lastMessage: newMessage.message,
          time: newMessage.createdAt,
        };

        const remainingConversations = prevConversations.filter(
          (conversation) => conversation._id.toString() !== conversationId,
        );

        return [updatedConversation, ...remainingConversations];
      });

      return;
    }

    // ==========================================
    // 4. NEW CONVERSATION
    // ==========================================

    console.log("🆕 New conversation received:", conversationId);

    fetchConversations();
  };

  useSocket(user?._id, handleSocketMessage);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <main
      className="
        flex
        min-w-0 
        h-screen
        overflow-hidden

        bg-background
      "
    >
      <LeftSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectChat={handleSelectChat}
        onStartChat={handleStartChat}
      />

      <RightSidebar
        selectedConversation={selectedConversation}
        messages={messages}
      />
    </main>
  );
};

export default ChatPage;
