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

  input StockInput {
    stock: String!
    open: Float!
    close: Float!
    high: Float!
    low: Float!
    date: ISODate!
  }

  type Query {
    getList: [String]
    getStockData(stock: String!): [Stock]
  }

  type Mutation {
    insertStockData(input: [StockInput!]!): String
  }
`;

module.exports = { typeDefs };
