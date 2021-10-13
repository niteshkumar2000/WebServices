const stocks = require("../models/stocks");
const { GraphQLDateTime } = require("graphql-iso-date");

const resolvers = {
  Query: {
    async getList() {
      return await stocks.distinct("stock");
    },
    async getStockData(parent, args) {
      return await stocks.find({ stock: args.stock }).sort({ date: 1 });
    },
  },
  Mutation: {
    async insertStockData(parent, args) {
      const res = await stocks.insertMany(args.input);
      if (res) {
        return "success";
      } else {
        return "fail";
      }
    },
  },
  ISODate: GraphQLDateTime,
};

module.exports = { resolvers };
