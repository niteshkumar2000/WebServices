const stocks = require("../models/stocks");

exports.postStocks = (req, res) => {
  stocks
    .insertMany(req.body)
    .then((result) => {
      res.status(201).json({
        message: "Success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    });
};

exports.getStocksList = (req, res) => {
  stocks
    .distinct("stock")
    .then((stockList) => {
      res.status(200).json({ data: stockList });
    })
    .catch((err) => console.log(err));
};

exports.getStockData = (req, res) => {
  stocks
    .find({ stock: req.params.stock })
    .sort({ date: 1 })
    .then((stockData) => {
      res.status(200).json({ data: stockData });
    })
    .catch((err) => console.log(err));
};

exports.getStockOpenData = (req, res) => {
  stocks
    .find({ stock: req.params.stock }, { open: 1, date: 1 })
    .sort({ date: 1 })
    .then((stockData) => {
      res.status(200).json({ data: stockData });
    })
    .catch((err) => console.log(err));
};
