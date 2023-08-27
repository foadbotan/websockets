const express = require('express');
const app = express();
const { Server } = require('socket.io');

app.use(express.static('client'));

const port = 5000;
const server = app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('join room', (room) => {
    socket.leaveAll();
    socket.join(room);
  });

  socket.on('chat message', (msg, room) => {
    if (room) {
      io.to(room).emit('chat message', msg);
    } else {
      io.emit('chat message', msg);
    }
  });

  socket.on('btn', (msg) => {
    io.emit('btn', msg);
  });
});
