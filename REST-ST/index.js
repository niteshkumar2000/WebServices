const express = require("express");
const mongoose = require("mongoose");
const stocksRoutes = require("./routes/stocks");
const cors = require("cors");
const morgan = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const helmet = require("helmet");

const port = 4000;
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cors());
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

mongoose.connect("mongodb://localhost/stocktimes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database successfully!");
});

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for StockTimes",
    version: "1.1.0",
    description:
      "REST API Implementation of stock times back-end to fetch latest news and stock data from NSE. Contact administrator for API key!",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "StockTimes Support",
      url: "mailto:nitesh156200@gmail.com",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:4000/api",
      description: "Development server",
    },
    {
      url: "https://stocktimes.me/api",
      description: "Production server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/stocks", stocksRoutes);

app.get("/api", (req, res) => {
  res
    .status(200)
    .send("Hello! Welcome to StockTimes API! Hit /api-docs for documentation");
});

app.listen(port, () => {
  console.log(`Node app listening at http://localhost:${port}`);
});
