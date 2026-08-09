import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
import mongoose from "mongoose";
const PORT = process.env.PORT || 8000;
import cors from "cors";
import userRouter from "./user/user.routes.js";
import messageRouter from "./message/message.routes.js";
import conversationRouter from "./converstion/conversation.routes.js";
import initDB from "./db/initdb.js";
import http from "http";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./socket/socket.server.js";

const server = http.createServer(app);
initializeSocket(server);

import errorMiddleware from "./middlewares/error.middleware.js";

initDB().then(() => {
  server.listen(PORT, (req, res) => {
    console.log(`Listening at : ${PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/conversations", conversationRouter);

app.use(errorMiddleware);
