const { gql } = require("apollo-server");

const typeDefs = gql`
  type Stock {
    stock: String!
    open: Float!
    close: Float!
    high: Float!
    low: Float!
    date: String!
  }

  type Query {
    getList: [String!]!
    getStockData(stock: String!): [Stock!]!
  }
`;

module.exports = { typeDefs };
