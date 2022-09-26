const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const DB = require("./configs/db");
const { errorHandler } = require("./middleware/errorHandler");

//Connect DB 💰
DB();

const app = express();
//use middleware section 🐛
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get("/", (req, res) => {
  res.json({ message: "working" });
});
//Routes 🚆
app.use("/api/users", require("./routes/userRoute"));
if (process.env.NODE_ENV === "production") {
}

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.brightMagenta);
});
process.on("uncaughtException", (err) => {
  console.log(`uncaughtException => ${err.message}`.red.bold);
});
