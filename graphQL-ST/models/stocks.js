const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  stock: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  date: { type: Date, default: Date.now },
  //date: String
});

module.exports = mongoose.model("stockData", stockSchema);
