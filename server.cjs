const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("join-game", (roomId) => {
    socket.join(roomId);
  });

  socket.on("game-state", (roomId, state) => {
    socket.to(roomId).emit("opponent-state", state);
  });

  socket.on("move-fruit", (roomId, data) => {
    socket.to(roomId).emit("opponent-move-fruit", data);
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("Socket server running on", PORT);
});