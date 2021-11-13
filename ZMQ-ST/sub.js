import zmq from "zeromq";
const sock = zmq.socket("sub");

sock.connect("tcp://127.0.0.1:3000");
sock.subscribe("IPO");
console.log("Subscriber connected to port 3000");

sock.on("message", function (topic, message) {
  console.log(
    "received a message related to:",
    topic.toString(),
    "containing message:",
    message.toString()
  );
});
