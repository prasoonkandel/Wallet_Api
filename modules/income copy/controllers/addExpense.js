const mongoose = require("mongoose");
const addExpense = async (req, res) => {
  const { amount, remarks } = req.body;
  const Users = mongoose.model("users");
  try {
    if (!amount) throw "Please enter amount!";
    if (amount < 1) throw "Amount must be more then 1!";

    if (!remarks) throw "Remarks is required!";
    if (remarks.length < 2) throw "Remarks must be at least 2 charcter long.";
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e,
    });
    return;
  }
  try {
    await Transaction.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "expense",
    });
    await Users.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: { balance: amount * -1 },
      },
      {
        runValidator: true,
      }
    );
  } catch (e) {
    res.status(400).json({
      status: "fails",
      message: e.message,
    });
  }

  res.status(200).json({
    status: "success",
  });
};

module.exports = addExpense;
