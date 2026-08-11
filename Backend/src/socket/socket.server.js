import { WebSocketServer } from "ws";
import {
  addClient,
  removeClient,
  getClient,
  isUserOnline,
} from "./socket.manager.js";
import {
  markMessageAsDelivered,
  markMessageAsRead,
  deliverPendingMessages,
} from "../message/messages.status.service.js";

export const initializeSocket = (server) => {
  const wss = new WebSocketServer({
    server,
  });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    let userId = null;

    ws.on("message", async (data) => {
      const parsedData = JSON.parse(data.toString());

      if (parsedData.type === "identify") {
        userId = parsedData.userId;

        addClient(userId, ws);

        console.log("✅ User identified:", userId);

        ws.send(
          JSON.stringify({
            type: "connected",
            message: "Socket connected successfully",
          }),
        );

        // ==========================================
        // DELIVER PENDING MESSAGES
        // ==========================================

        const pendingMessages = await deliverPendingMessages(userId);

        console.log(
          `📦 Pending messages for ${userId}:`,
          pendingMessages.length,
        );

        for (const message of pendingMessages) {
          // ------------------------------------------
          // Mark message as delivered
          // ------------------------------------------

          const updatedMessage = await markMessageAsDelivered(message._id);

          if (!updatedMessage) {
            continue;
          }

          console.log(
            "✅ Offline message delivered:",
            updatedMessage._id.toString(),
          );

          // ------------------------------------------
          // Find original sender
          // ------------------------------------------

          const senderId = updatedMessage.senderId.toString();

          const senderSocket = getClient(senderId);

          // ------------------------------------------
          // Notify sender
          // ------------------------------------------

          if (senderSocket) {
            senderSocket.send(
              JSON.stringify({
                type: "message_delivered",
                message: updatedMessage,
              }),
            );

            console.log("📤 Delivered ACK sent to sender:", senderId);
          }
        }
      }

      // for isTyping
      if (parsedData.type === "typing_start") {
        const { receiverId } = parsedData;

        const receiverSocket = getClient(receiverId);

        console.log("Receiver socket:", receiverSocket ? "ONLINE" : "OFFLINE");

        if (receiverSocket) {
          receiverSocket.send(
            JSON.stringify({
              type: "typing_start",
              userId,
            }),
          );
        }
      }

      // stoppedTyping

      if (parsedData.type === "typing_stop") {
        const { receiverId } = parsedData;
        const receiverSocket = getClient(receiverId);

        if (receiverSocket) {
          receiverSocket.send(
            JSON.stringify({
              type: "typing_stop",
              userId,
            }),
          );
        }
      }

      // implementation for mark as read fn
      if (parsedData.type === "message_delivered") {
        const { messageId } = parsedData;

        console.log("📩 MESSAGE DELIVERED:", messageId);

        const updatedMessage = await markMessageAsDelivered(messageId);

        if (!updatedMessage) {
          console.log("Message not found:", messageId);
          return;
        }

        console.log("✅ Message status updated:", updatedMessage.status);

        // Sender ko identify karna hai
        const senderId = updatedMessage.senderId.toString();

        const senderSocket = getClient(senderId);

        if (senderSocket) {
          senderSocket.send(
            JSON.stringify({
              type: "message_delivered",
              message: updatedMessage,
            }),
          );
        }
      }

      // for message read by receiver

      if (parsedData.type === "message_read") {
        const { messageId } = parsedData;

        console.log("📖 MESSAGE READ:", messageId);

        const updatedMessage = await markMessageAsRead(messageId);

        if (!updatedMessage) {
          console.log("Message not found:", messageId);
          return;
        }

        console.log("✅ Message status updated:", updatedMessage.status);

        const senderId = updatedMessage.senderId.toString();

        const senderSocket = getClient(senderId);

        if (senderSocket) {
          senderSocket.send(
            JSON.stringify({
              type: "message_read",
              message: updatedMessage,
            }),
          );
        }
      }

      // check user is online or not
      if (parsedData.type === "check_online") {
        const { userId: targetUserId } = parsedData;

        console.log("🔍 CHECK ONLINE:", targetUserId);

        const targetSocket = getClient(targetUserId);

        const isOnline = !!targetSocket;

        console.log(
          "User:",
          targetUserId,
          "is",
          isOnline ? "ONLINE" : "OFFLINE",
        );

        // Response sirf us user ko bhejna
        ws.send(
          JSON.stringify({
            type: "user_status",
            userId: targetUserId,
            online: isOnline,
          }),
        );

        return;
      }
    });

    ws.on("close", () => {
      if (userId) {
        removeClient(userId);
      }

      console.log("Socket closed");
    });
  });

  return wss;
};
