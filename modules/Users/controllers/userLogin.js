const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const Users = mongoose.model("users");
  const ip = req.ip;
  const { email, password } = req.body;

  try {
    if (!email) throw new Error("Please provide an email");
    if (!password) throw new Error("Please provide a password");

    const user = await Users.findOne({ email });
    if (!user) throw new Error("User not found");

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new Error("Email and password didn't match");
    const ipAddress = await Users.put({
      ip,
    });

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.jwt_salt,
      {
        expiresIn: "90d",
      }
    );

    res.status(200).json({
      status: "success",
      message: "Login successful",
      accessToken,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message || e,
    });
  }
};

module.exports = userLogin;
