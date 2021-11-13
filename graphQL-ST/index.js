const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");
const user = require("./models/user");

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
    return await user
      .find({ key: req.headers.authorization })
      .then((result) => {
        const admin = result[0]["admin"];
        const id = result[0]["_id"];
        return { admin, id };
      })
      .catch((err) => {
        return null;
      });
  },
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`Backend GraphlQL server running at PORT : ${url} :)`);
});
