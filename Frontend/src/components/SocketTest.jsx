import React from "react";
import { useState, useEffect, useRef } from "react";

const SocketTest = () => {
  const [status, setStatus] = useState("Disconnected");
  const [serverMessage, setServerMessage] = useState("");

  const wsRef = useRef(null);

  useEffect(() => {
    console.log("connecting...");

    const ws = new WebSocket("ws://localhost:8000");
    wsRef.current = ws;
    ws.onopen = () => {
      console.log("connected to webSocket");
      setStatus("connected");
    };

    ws.onmessage = (e) => {
      console.log("received from server", e.data);

      const data = JSON.parse(e.data);
      setServerMessage(data.message);
    };

    ws.onclose = () => {
      console.log("Socket closed");
      setStatus("disconnected");
    };
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const ws = wsRef.current;

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "identify",
          message: "Hello from React",
        }),
      );
    }
  };
  return (
    <>
      <h1> WS test</h1>
      <p>Status: {status}</p>

      <p>Server: {serverMessage}</p>
      <button onClick={sendMessage}>Send message</button>
    </>
  );
};

export default SocketTest;
