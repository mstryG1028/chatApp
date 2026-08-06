import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
import mongoose from "mongoose";
const PORT = process.env.PORT || 8000;

import userRouter from "./user/user.routes.js";
import messageRouter from "./message/message.routes.js";
import initDB from "./db/initdb.js";
import http from "http";
import cookieParser from "cookie-parser";
const server = http.createServer(app);
import { WebSocketServer } from "ws";
import errorMiddleware from "./middlewares/error.middleware.js";

const wss = new WebSocketServer({
  server,
});

let connCount = 0;

wss.on("connection", (ws) => {
  connCount++;

  console.log("New client connected");
  ws.on("message", (message) => {
    console.log(message.toString());

    ws.send(`welcome to message service`);
  });
});

initDB().then(() => {
  server.listen(PORT, (req, res) => {
    console.log(`Listening at : ${PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

app.use(errorMiddleware);
