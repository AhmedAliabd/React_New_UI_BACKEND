const express = require("express");

const {
  loginUser,
  register,
  getAccount,
} = require("../controllers/userController");
const protected = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/login", loginUser);
router.post("/", register);
router.get("/account", protected, getAccount);

module.exports = router;
