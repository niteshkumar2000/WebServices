const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  stockName: String,
  sharesCount: { type: Number, default: 0 },
  limit: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  key: String,
  admin: { type: Boolean, default: false },
  name: String,
  balance: { type: Number, default: 0 },
  ipo: { type: Boolean, default: false },
  portfolio: [portfolioSchema],
});

module.exports = mongoose.model("user", userSchema);
