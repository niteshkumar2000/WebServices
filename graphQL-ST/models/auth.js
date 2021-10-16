const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  key: String,
  read: { type: Boolean, default: false },
  write: { type: Boolean, default: false },
  name: String,
});

module.exports = mongoose.model("auth", authSchema);
