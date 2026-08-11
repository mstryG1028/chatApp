import { WebSocketServer } from "ws";
import { addClient, removeClient, getClient } from "./socket.manager.js";
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

      console.log("Received:", parsedData);

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
