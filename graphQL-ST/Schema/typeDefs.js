const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar ISODate

  type Stock {
    stock: String!
    open: Float!
    close: Float!
    high: Float!
    low: Float!
    date: ISODate!
  }

  type Portfolio {
    stockName: String!
    sharesCount: Int!
    limit: Float!
  }

  type User {
    name: String
    balance: Float!
    ipo: Boolean!
    portfolio: [Portfolio]
  }

  input StockInput {
    stock: String!
    open: Float!
    close: Float!
    high: Float!
    low: Float!
    date: ISODate!
  }

  input PortfolioInput {
    stockName: String!
    sharesCount: Int!
  }

  input LimitInput {
    stockName: String!
    limit: Float!
  }

  type Query {
    getList: [String]
    getStockData(stock: String!): [Stock]
    getUser: User
  }

  type Mutation {
    insertStockData(input: [StockInput!]!): String
    addBalance(input: Float!): Float
    subscribeIPO(input: Boolean!): String
    updateLimit(input: LimitInput!): String
    buyStock(input: PortfolioInput!): String
    sellStock(input: PortfolioInput!): String
  }
`;

module.exports = { typeDefs };
