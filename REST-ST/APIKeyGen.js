const APIKeyHelper = require("./helpers/APIKey");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/stocktimes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database successfully!");
});

token = APIKeyHelper.genAPIKey();
console.log(token);

//encrypted = APIKeyHelper.encryptKey(token);

data = {
  APIKey: token,
  read: true,
  write: true,
  name: "admin",
};

APIKeyHelper.pushKey(data);
