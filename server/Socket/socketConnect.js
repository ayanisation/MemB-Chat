const socketConnect = (socket) => {
  console.log("connected");
  socket.on("join", (text) => {
    console.log(text);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
};

module.exports = socketConnect;
