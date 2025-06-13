const express = require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userDashboard = require("./controllers/userDashboard"); // Add this import
const auth = require("../../middleware/auth");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.use(auth);
userRouter.get("/dashboard", userDashboard);

module.exports = userRouter;
