const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send({
    message: "Welcome!",
  });
});

//Routes
app.use("/api/users", require("./routes/userRoute"));

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.brightMagenta);
});
