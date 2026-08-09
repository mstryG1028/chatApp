import { WebSocketServer } from "ws";
import { addClient, removeClient } from "./socket.manager.js";

export const initializeSocket = (server) => {
  const wss = new WebSocketServer({
    server,
  });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    let userId = null;

    ws.on("message", (data) => {
      const parsedData = JSON.parse(data.toString());

      console.log("Received:", parsedData);

      if (parsedData.type === "identify") {
        userId = parsedData.userId;

        addClient(userId, ws);

        ws.send(
          JSON.stringify({
            type: "connected",
            message: "Socket connected successfully",
          }),
        );
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
