import { User } from "../models/users.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { v4 as uuid } from "uuid"
// @desc    Auth user & get token
// @route   POST /auth/login
// @access  Public
const authorizeUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    res.json({
      ...user,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Add new user / SignUp
// @route   POST /auth/setup
// @access  Public
const addUser = asyncHandler(async (req, res) => {
  const { email, password, name, currentBalance } = req.body;
  const walletId = uuid()

  // duplicate email check
  const forDupCheck = await User.findOne({ email });
  if (forDupCheck) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const newUser = new User({
    name,
    email,
    password,
    currentBalance: currentBalance ? currentBalance : 0,
    walletId
  });

  await newUser.save();

  if (newUser) {
    res.status(201).json({
      ...newUser._doc,
      token: generateToken(newUser._id),
    });
  } else {
    throw new Error("Some Error occured while signuip");
  }
});

export { authorizeUser, addUser };
