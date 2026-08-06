import { User } from "./user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const options = {
  httpOnly: true,
  secure: false,
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  if ([name, username, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (await User.findOne({ username: username })) {
    throw new ApiError(409, "username already existed");
  }

  let newUser = await User.create({
    name,
    username: username.toLowerCase(),
    password,
    //  avatar,
  });

  let createdUser = await User.findById(newUser._id).select(
    " -password -refreshToken ",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while Registering");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "succesfully registered"));
});

// generate accesToken and refreshToken

const generateAccessRefreshToken = async (id) => {
  const user = await User.findById(id);
  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  user.refreshToken = refreshToken;
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(401, "Username is required");
  }
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "Incorrect Password");
  }
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { loggedInUser, accessToken, refreshToken },
        "Successfully LoggedIn",
      ),
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Succesfully LoggedOut"));
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(400, {}, "User no longer Exists");
  }

  res.status(200).json(new ApiResponse(200, user, "Successfully fetched"));
});

export const getAllFriends = asyncHandler(async (req, res) => {

console.log("req.user",req.user);

  const userId = req.user._id;
  const user = await User.findById(userId)
    .select("friends")
    .populate("friends", "name  avatar");

  console.log("user form allfriends:", user);
  if (!user) {
    throw new ApiError(404, "user not Exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user.friends, "Successfully fetched friends"));
});

export const addFriend = asyncHandler(async (req, res) => {
  const { id } = req.params; // friends id
  const userId = req.user._id; // currUser id

  if (userId.toString() === id) {
    throw new ApiError(400, "You cannot add yourself as a friend");
  }
  const friend = await User.findById(id);

  if (!friend) {
    throw new ApiError(404, "User not Found");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { friends: id } }, // directly push can add duplicate also

    { new: true },
  ).populate("friends", "name avatar");

  res.status(200).json(new ApiResponse(201, user, "New Friend Added"));
});
