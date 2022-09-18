const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "Welcome!",
  });
});
console.log("WOW");

app.listen(8000, () => {
  console.log("SERVER RUNNING");
});
