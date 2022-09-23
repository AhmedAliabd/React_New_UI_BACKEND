const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//@Desc Login user
//@Route api/users/login
//@Access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error("please include all fields");
  }
  const user = await User.findOne({ email });
  console.log(user);
  //check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ user: user, token: generateToken(user._id) });
  } else {
    res.status(401);
    throw new Error("invalid credentials");
  }
});

//@Desc register user
//@Route api/users
//@Access public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log({ name, email, password });
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please Include all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//@Desc Get account
//@Route /account
//@Access Private
const getAccount = asyncHandler(async (req, res) => {
  const userAccount = {
    email: req.user.email,
    name: req.user.name,
    id: req.user._id,
  };
  res.send({ user: userAccount });
});

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
module.exports = {
  loginUser,
  register,
  getAccount,
};
