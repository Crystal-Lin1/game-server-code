const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('ok')
})

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
    console.log(roomId, state)
    socket.to(roomId).emit("opponent-state", state);
  });
socket.on('player-lost', (roomId, timeSurvived) => {
  socket.to(roomId).emit('opponent-lost', timeSurvived) 
})

  socket.on("move-fruit", (roomId, data) => {
    socket.to(roomId).emit("opponent-move-fruit", data);
  });
});

const PORT = process.env.PORT;

console.log("PORT =", PORT);

server.listen(PORT, "0.0.0.0", () => {
  console.log("Socket server running on", PORT);
});