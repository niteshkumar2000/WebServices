const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  company: String,
  date: Date,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("news", newsSchema);
