const stocks = require("../models/stocks");

const resolvers = {
  Query: {
    async getList() {
      return await stocks.distinct("stock");
    },
    async getStockData(parent, args) {
      return await stocks.find({ stock: args.stock }).sort({ date: 1 });
    },
  },
};

module.exports = { resolvers };
