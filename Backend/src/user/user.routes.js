import express from "express";
import {
  addFriend,
  getAllFriends,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "./user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/allFriends").get(verifyJWT, getAllFriends);

router.route("/:id").get(getUserDetails);
router.route("/:id/addFriend").post(verifyJWT, addFriend);

export default router;

