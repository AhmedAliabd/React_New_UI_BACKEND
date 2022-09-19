const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
//@Desc Login user
//@Route api/users/login
//@Access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please include all fields");
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    res.status(200).json({ user: user });
  }
  //res.status(200).json({ message: "user controller" });
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
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
module.exports = {
  loginUser,
  register,
};
