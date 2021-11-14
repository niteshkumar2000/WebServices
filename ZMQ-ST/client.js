import zmq from "zeromq";
import { IPOSubscription } from "./client-gql.js";

const sock = zmq.socket("req");
const subSock = zmq.socket("sub");

sock.connect("tcp://127.0.0.1:3000");
subSock.connect("tcp://127.0.0.1:3001");
console.log("Client connected to port 3000 & 3001");

const subscribe = async () => {
  const res = await IPOSubscription(true);
  subSock.subscribe("IPO");
  console.log(res);
};

subscribe();

subSock.on("message", (topic, message) => {
  console.log(`Message received on ${topic}`);
  JSON.parse(message).map((newsData) =>
    console.log(
      `${newsData["company"]} has announced its IPO on ${newsData["date"]} with each share priced at ${newsData["price"]} with lot size ${newsData["quantity"]}`
    )
  );
});

const object = { stockName: "SBIN", sharesCount: 1, type: "buy" };

setInterval(function () {
  console.log("sending order");
  sock.send(JSON.stringify(object));
}, 1000);

sock.on("message", (msg) => {
  console.log(msg.toString());
});
