let socket = null;

export const connectSocket = () => {
  if (socket) {
    return socket;
  }

  socket = new WebSocket("ws://localhost:8000");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
    socket = null;
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return socket;
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const sendSocketMessage = (data) => {
  if (!socket) {
    console.log("Socket is not connected");
    return;
  }

  if (socket.readyState !== WebSocket.OPEN) {
    console.log("Socket is not open");
    return;
  }

  socket.send(JSON.stringify(data));
};

export const identifySocket = (userId) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.log("Socket is not connected");
    return;
  }

  socket.send(
    JSON.stringify({
      type: "identify",
      userId,
    }),
  );
};
