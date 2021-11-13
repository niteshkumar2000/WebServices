const stocks = require("../models/stocks");
const user = require("../models/user");
const { GraphQLDateTime } = require("graphql-iso-date");

const resolvers = {
  Query: {
    async getList(root, args, context) {
      if (context.id) return await stocks.distinct("stock");
    },
    async getStockData(root, args, context) {
      if (context.id)
        return await stocks.find({ stock: args.stock }).sort({ date: 1 });
    },
    async getUser(root, args, context) {
      if (context.id) return await user.findById(context.id);
    },
  },
  Mutation: {
    async insertStockData(root, args, context) {
      if (context.admin) {
        const res = await stocks.insertMany(args.input);
        if (res) {
          return "success";
        } else {
          return "fail";
        }
      }
    },
    async addBalance(root, args, context) {
      if (!context.admin && context.id) {
        const userData = await user.findById(context.id);
        userData["balance"] += args.input;
        const updatedData = await userData.save();
        return updatedData["balance"];
      }
    },
    async subscribeIPO(root, args, context) {
      if (!context.admin && context.id) {
        const userData = await user.findById(context.id);
        userData["ipo"] = args.input;
        const updatedData = await userData.save();
        return `IPO Subscription: ${updatedData["ipo"]}`;
      }
    },
    async buyStock(root, args, context) {
      if (!context.admin && context.id) {
        const userData = await user.findById(context.id);
        const stockValue = await stocks
          .find({ stock: args.input.stockName })
          .sort({ date: 1 })
          .limit(1)
          .select("open");
        const requiredAmount = stockValue[0]["open"] * args.input.sharesCount;
        if (requiredAmount <= userData["balance"]) {
          for (stock in userData["portfolio"]) {
            if (
              userData["portfolio"][stock]["stockName"] === args.input.stockName
            ) {
              userData["balance"] -= requiredAmount;
              userData["portfolio"][stock]["sharesCount"] +=
                args.input.sharesCount;
              await userData.save();
              return "Success";
            }
          }
          userData["balance"] -= requiredAmount;
          userData["portfolio"].push(args.input);
          await userData.save();
          return "Success";
        } else {
          return "Not enough balance";
        }
      } else {
        return "";
      }
    },
    async sellStock(root, args, context) {
      if (!context.admin && context.id) {
        const userData = await user.findById(context.id);
        const stockValue = await stocks
          .find({ stock: args.input.stockName })
          .sort({ date: 1 })
          .limit(1)
          .select("open");
        const requiredAmount = stockValue[0]["open"] * args.input.sharesCount;

        for (stock in userData["portfolio"]) {
          if (
            userData["portfolio"][stock]["stockName"] === args.input.stockName
          ) {
            if (
              args.input.sharesCount <=
              userData["portfolio"][stock]["sharesCount"]
            ) {
              userData["balance"] += requiredAmount;
              userData["portfolio"][stock]["sharesCount"] -=
                args.input.sharesCount;
              if (userData["portfolio"][stock]["sharesCount"] === 0)
                userData["portfolio"].splice(stock, 1);
              await userData.save();
              return "Success";
            } else {
              return "Not enough shares available";
            }
          }
        }
        return "Stock not available in your portfolio";
      } else {
        return "";
      }
    },
    async updateLimit(root, args, context) {
      if (!context.admin && context.id) {
        const userData = await user.findById(context.id);
        const stockValue = await stocks
          .find({ stock: args.input.stockName })
          .sort({ date: 1 })
          .limit(1)
          .select("open");
        for (stock in userData["portfolio"]) {
          if (
            userData["portfolio"][stock]["stockName"] === args.input.stockName
          ) {
            userData["portfolio"][stock]["limit"] = args.input.limit;
            await userData.save();
            return "Success";
          }
        }
        return "Stock not available in your portfolio";
      } else {
        return "";
      }
    },
  },
  ISODate: GraphQLDateTime,
};

module.exports = { resolvers };
