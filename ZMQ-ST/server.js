import zmq from "zeromq";
import { buyStock, sellStock, getNewsData } from "./client-gql.js";

const sock = zmq.socket("rep");
const pubSock = zmq.socket("pub");
let newsCount = 0;

sock.bindSync("tcp://127.0.0.1:3000");
pubSock.bindSync("tcp://127.0.0.1:3001");
console.log("Server bound to port 3000 & 3001");

setInterval(async () => {
  const newsData = await getNewsData();
  if (newsCount !== newsData.length) {
    pubSock.send(["IPO", JSON.stringify(newsData)]);
  }
}, 1000);

sock.on("message", async (msg) => {
  let order = JSON.parse(msg.toString());
  let res;
  switch (order["type"]) {
    case "buy":
      sock.send(`${JSON.stringify(order)} has been queued`);
      delete order["type"];
      res = await buyStock(order);
      sock.send(`${JSON.stringify(order)} status: ${JSON.stringify(res)}`);
      break;
    case "sell":
      sock.send(`${JSON.stringify(order)} has been queued`);
      delete order["type"];
      res = await sellStock(order);
      sock.send(`${JSON.stringify(order)} status: ${JSON.stringify(res)}`);
      break;
    default:
      sock.send("Invalid order");
      break;
  }
});
