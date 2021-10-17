const APIKeyHelper = require("./helpers/APIKey");
const mongoose = require("mongoose");
const auth = require("./models/auth");

mongoose.connect("mongodb://localhost/stocktimes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database successfully!");
});

// Pass token here to verify
token = "";

auth
  .find({ key: token })
  .then((res) => {
    if (res[0]["key"] === token) {
      console.log("Success");
    } else {
      console.log("fail");
    }
  })
  .catch((err) => {
    console.log(err);
  });
