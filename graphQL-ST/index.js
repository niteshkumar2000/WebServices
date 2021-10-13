const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");

mongoose.connect("mongodb://localhost/stocktimes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database successfully!");
});

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Backend GraphlQL server running at PORT : ${url} :)`);
});
