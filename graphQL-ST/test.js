const user = require("./models/user");
const news = require("./models/news");
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

createUser = async (data) => {
  await user.insertMany(data);
};

createNews = async (data) => {
  await news.insertMany(data);
};

const userData1 = {
  key: "T1TE8DJ-1ND4T3W-KF3HJCZ-9NCAN9C",
  admin: true,
  name: "niti",
};

const userData2 = {
  key: "W01SAW9-MH64XRE-GG8M01J-HBKZ6F1",
  admin: false,
  name: "niti",
};

createUser(userData1);
createUser(userData2);

const newsData = {
  company: "Hoote",
  date: "2021-12-12",
  price: 12,
  quantity: 1212,
};

createNews(newsData);
