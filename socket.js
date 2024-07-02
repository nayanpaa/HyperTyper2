function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('createRoom', (roomId) => {
      socket.join(roomId);
      io.to(roomId).emit('roomCreated', roomId);
      console.log(`Room created: ${roomId}`);
    });

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      io.to(roomId).emit('playerJoined', { playerId: socket.id, roomId });
      console.log(`Player ${socket.id} joined room: ${roomId}`);
    });

    socket.on('gameUpdate', (data) => {
      io.to(data.roomId).emit('gameUpdate', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

module.exports = handleSocket;