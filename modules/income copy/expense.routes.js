const express = require("express");
const auth = require("../../middleware/auth");
const addExpense = require("./controllers/addExpense");

const expenseRouter = express.Router();

expenseRouter.use(auth);
expenseRouter.post("/add", addExpense);

module.exports = expenseRouter;
