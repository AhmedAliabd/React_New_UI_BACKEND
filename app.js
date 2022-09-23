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

//Routes 🚆
app.use("/api/users", require("./routes/userRoute"));
if (process.env.NODE_ENV === "production") {
}
app.use(errorHandler);

process.on("uncaughtException", (err) => {
  console.log(`uncaughtException => ${err.message}`.red.bold);
});
