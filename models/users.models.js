const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is used"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    balance: {
      type: Number,
      required: [true, "balance is required"],
    },
    ip: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userModel = mongoose.model("users", userSchema);

module.exports = userModel;
