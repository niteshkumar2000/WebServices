var zmq = require("zeromq"),
  sock = zmq.socket("push");

sock.connect("tcp://127.0.0.1:3000");
console.log("Producer connected to port 3000");

setInterval(function () {
  console.log("sending data");
  sock.send("some data");
}, 500);
