const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    remarks: {
      type: String,
      required: [true, "Remarks is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required"],
    },
    transaction_type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required!"],
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Use `const` here
const transactionModel = mongoose.model("transactions", transactionSchema);

module.exports = transactionModel;
