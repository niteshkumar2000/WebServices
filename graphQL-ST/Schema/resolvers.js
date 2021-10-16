const stocks = require("../models/stocks");
const { GraphQLDateTime } = require("graphql-iso-date");

const resolvers = {
  Query: {
    async getList(root, args, context) {
      if (context.userRole === "admin" || context.userRole === "client")
        return await stocks.distinct("stock");
    },
    async getStockData(root, args, context) {
      if (context.userRole === "admin" || context.userRole === "client")
        return await stocks.find({ stock: args.stock }).sort({ date: 1 });
    },
  },
  Mutation: {
    async insertStockData(root, args, context) {
      if (context.userRole === "admin") {
        const res = await stocks.insertMany(args.input);
        if (res) {
          return "success";
        } else {
          return "fail";
        }
      }
    },
  },
  ISODate: GraphQLDateTime,
};

module.exports = { resolvers };
