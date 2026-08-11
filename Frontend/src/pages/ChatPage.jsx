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
import { sendSocketMessage } from "../socket/socket";
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

    // ==========================================
    // 1. NEW MESSAGE
    // ==========================================

    if (data.type === "new_message") {
      const newMessage = data.message;

      const conversationId = data.conversationId?.toString();

      const currentUserId = user?._id?.toString();

      const messageSenderId =
        newMessage.senderId?._id?.toString() || newMessage.senderId?.toString();

      console.log("========== MESSAGE FLOW ==========");
      console.log("Current User:", currentUserId);
      console.log("Message Sender:", messageSenderId);

      // ==========================================
      // ADD MESSAGE TO CURRENT CHAT
      // ==========================================

      if (conversationId === selectedConversationRef.current?._id?.toString()) {
        setMessages((prevMessages) => {
          const alreadyExists = prevMessages.some(
            (message) => message._id?.toString() === newMessage._id?.toString(),
          );

          if (alreadyExists) {
            return prevMessages;
          }

          return [...prevMessages, newMessage];
        });
      }

      // ==========================================
      // DELIVERY
      // ONLY RECEIVER SENDS ACK
      // ==========================================

      if (messageSenderId !== currentUserId) {
        console.log("📥 I AM RECEIVER → sending delivered ACK");

        sendSocketMessage({
          type: "message_delivered",
          messageId: newMessage._id,
        });
      } else {
        console.log("📤 I AM SENDER → NOT sending delivered ACK");
      }

      // ==========================================
      // UPDATE SIDEBAR
      // ==========================================

      setConversations((prevConversations) => {
        const existingConversation = prevConversations.find(
          (conversation) => conversation._id?.toString() === conversationId,
        );

        // Existing conversation
        if (existingConversation) {
          const updatedConversation = {
            ...existingConversation,
            lastMessage: newMessage.message,
            time: newMessage.createdAt,
          };

          const remainingConversations = prevConversations.filter(
            (conversation) => conversation._id?.toString() !== conversationId,
          );

          return [updatedConversation, ...remainingConversations];
        }

        // New conversation
        console.log("🆕 New conversation received:", conversationId);

        fetchConversations();

        return prevConversations;
      });

      return;
    }

    // ==========================================
    // 2. MESSAGE DELIVERED
    // ==========================================

    if (data.type === "message_delivered") {
      const deliveredMessage = data.message;

      console.log("📩 MESSAGE DELIVERED:", deliveredMessage);

      if (!deliveredMessage?._id) {
        console.log("❌ Delivered message has no ID");
        return;
      }

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id?.toString() === deliveredMessage._id?.toString()
            ? {
                ...message,
                status: "delivered",
              }
            : message,
        ),
      );

      return;
    }

    // ==========================================
    // 3. MESSAGE READ
    // ==========================================

    if (data.type === "message_read") {
      const readMessage = data.message;

      console.log("📖 MESSAGE READ:", readMessage);

      if (!readMessage?._id) {
        return;
      }

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id?.toString() === readMessage._id?.toString()
            ? {
                ...message,
                status: "read",
              }
            : message,
        ),
      );

      return;
    }

    // ==========================================
    // UNKNOWN EVENT
    // ==========================================

    console.log("⚠️ Unknown socket event:", data.type);
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
