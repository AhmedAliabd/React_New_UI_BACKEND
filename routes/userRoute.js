const express = require("express");
const { loginUser, register } = require("../controllers/userController");
const router = express.Router();

router.get("/login", loginUser);
router.post("/", register);
module.exports = router;
