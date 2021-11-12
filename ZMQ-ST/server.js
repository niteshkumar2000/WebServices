var zmq = require("zeromq"),
  sock = zmq.socket("pull");

sock.bindSync("tcp://127.0.0.1:3000");
console.log("Server bound to port 3000");

sock.on("message", function (msg) {
  console.log("work: %s", msg.toString());
});
