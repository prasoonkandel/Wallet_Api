// this is main file aka app.js run this file to start server
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const userRouter = require("./modules/Users/user.route");
const incomeRouter = require("./modules/income/income.routes");
const expenseRouter = require("./modules/income copy/expense.routes");
require("dotenv").config();
const app = express();
require("./models/users.models.js");
require("./models/transaction.model.js");
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_CONNECT, {})
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("MOYE MOYE", e);
  });

app.use("/users", userRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);
app.listen(8000, () => {
  console.log("server is running very fast");
});
