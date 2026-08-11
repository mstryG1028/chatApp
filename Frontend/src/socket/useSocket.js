import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "./socket";

export const useSocket = (userId, onMessage) => {
  useEffect(() => {
    if (!userId) return;

    const socket = connectSocket();

    const handleOpen = () => {
      console.log("Socket ready");

      socket.send(
        JSON.stringify({
          type: "identify",
          userId,
        }),
      );
    };

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("Socket event:", data);

      // IMPORTANT:
      // useSocket only receives socket events.
      // It does NOT send message_delivered.
      // ChatPage decides whether this user is sender or receiver.

      if (onMessage) {
        onMessage(data);
      }
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
    };
  }, [userId, onMessage]);

  return {
    disconnect: disconnectSocket,
  };
};
