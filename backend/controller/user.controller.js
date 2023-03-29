const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");

/**
 *
 * @desc    Register New User
 * @route   /api/users/
 * @method  Post
 * @access  Public
 *
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all Fields");
  }

  // Check if User Exist
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating User
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  // Check If User is Created Successfully
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

/**
 *
 * @desc    Login User
 * @route   /api/users/login
 * @method  POST
 * @access  Public
 *
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Fetch User From DB
  const user = await UserModel.findOne({ email });

  // Check If User is not Present
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  // Check If User is Present and also Compare Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (user && isMatch) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

/**
 *
 * @desc    Get LoggedIn User Profile
 * @route   /api/users/
 * @method  GET
 * @access  Private
 *
 */
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const { _id, username, email } = await UserModel.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

// Function to Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: "30d", // Expires In 30 Days
  });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUserProfile,
};
