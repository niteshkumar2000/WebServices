import zmq from "zeromq";
const sock = zmq.socket("push");

sock.connect("tcp://127.0.0.1:3000");
console.log("Producer connected to port 3000");

const object = { stockName: "SBIN", shareCount: 5, limit: 550 };

setInterval(function () {
  console.log("sending data");
  sock.send(JSON.stringify(object));
}, 5000);
