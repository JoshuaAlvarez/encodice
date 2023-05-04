const io = require("socket.io")(3000);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    console.log(`Message received: ${data}`);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

console.log("Socket server started on port 3000");
