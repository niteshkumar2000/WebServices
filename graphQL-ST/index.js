const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");
const auth = require("./models/auth");

mongoose.connect("mongodb://localhost/stocktimes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database successfully!");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return await auth
      .find({ key: req.headers.authorization })
      .then((result) => {
        const userRole = result[0]["name"];
        return { userRole };
      })
      .catch((err) => {
        return "";
      });
  },
});

server.listen().then(({ url }) => {
  console.log(`Backend GraphlQL server running at PORT : ${url} :)`);
});
