import zmq from "zeromq";
const sock = zmq.socket("req");

sock.connect("tcp://127.0.0.1:3000");
console.log("Producer connected to port 3000");

const object = { stockName: "SBIN", sharesCount: 1, type: "buy" };

setInterval(function () {
  console.log("sending order");
  sock.send(JSON.stringify(object));
}, 1000);

sock.on("message", (msg) => {
  console.log(msg.toString());
});
