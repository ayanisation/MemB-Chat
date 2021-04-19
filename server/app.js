const express = require("express");
const home = require("./Routers/home");
const auth = require("./Routers/auth");
const chat = require("./Routers/chat");
const dotenv = require("dotenv");
require("./db/connect");
const cors = require("cors");

dotenv.config();

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
app.use(cors());
app.use(express.json({ limit: 10000000, extended: true }));
app.use(express.urlencoded({ limit: 10000000, extended: true }));

app.use("/", home);
app.use("/auth", auth);
app.use("/chat", chat);

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("newMessage", ({ sender, reciever }) => {
    io.emit("newMessage", { sender, reciever });
  });
  socket.on("seen", (sender) => {
    io.emit("seen", sender);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
