const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io").listen(server);
const port = 8080;

const connections = [null, null];

io.on("connection", (socket) => {
  // Find player
  let playerIndex = -1;
  for (let i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
    }
  }
  socket.emit("player-number", playerIndex);

  // Ignore additional players
  if (playerIndex === -1) return;
  connections[playerIndex] = socket;

  socket.broadcast.emit("player-connected", playerIndex);

  socket.on("actuate", (data) => {
    const { board, metadata } = data;

    const move = {
      playerIndex,
      board,
      metadata,
    };

    // Send move to everyone
    socket.broadcast.emit("player-move", move);

    // Handle disconnect - clear socket of that player
    socket.on("disconnect", () => {
      console.log(`Player ${playerIndex} disconnected`);
      connections[playerIndex] = null;
    });
  });

  // Returns the move made
  //socket.on("response", (response) => {
  //console.log(response);
  //io.emit("response", response);
  //});
});
server.listen(port, () => console.log("server running on port:", port));
