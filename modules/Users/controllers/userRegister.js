const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Fixed the typo here

const userRegister = async (req, res) => {
  const Users = mongoose.model("users"); // Model name should be capitalized

  const { name, password, email, balance } = req.body;
  const ip = req.ip;

  // Validation (You can add more validations here)

  // Creation code
  const encPass = await bcrypt.hash(password, 10); // Fixed the typo here
  try {
    const createdUser = await Users.create({
      name,
      password: encPass,
      email,
      balance,
      ip,
    });
    res.status(200).json({
      status: "Registration successful",
      user: createdUser,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
    console.log(createdUser);
    return;
  }
};

module.exports = userRegister;
