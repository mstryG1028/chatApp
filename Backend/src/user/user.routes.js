import express from "express";
import {
  addFriend,
  getAllFriends,
  getCurrentUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  searchUser,
} from "./user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/all-friends").get(verifyJWT, getAllFriends);
router.route("/search").get(verifyJWT, searchUser);
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/:id").get(verifyJWT, getUserDetails);
router.route("/:id/add-friend").post(verifyJWT, addFriend);

export default router;
