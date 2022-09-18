const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.status(200).json({ message: "HELLO FROM ROUTER" });
});
module.exports = router;
