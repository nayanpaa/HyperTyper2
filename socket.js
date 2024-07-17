const rooms = new Map()

function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('createRoom', (roomId, playerName) => {
      console.log(`Attempting to create room with ID: ${roomId} for player: ${playerName}`);
      const newRoom = { players: new Map(), gameStarted: false };
      newRoom.players.set(socket.id, {name: playerName, progress: 0 }); 
      rooms.set(roomId, newRoom);
      socket.join(roomId);
      io.to(roomId).emit('roomCreated', roomId);
      console.log(`Room created: ${roomId}, current rooms:`, Array.from(rooms.keys()));
    });

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      io.to(roomId).emit('playerJoined', { playerId: socket.id, roomId });
      console.log(`Player ${socket.id} joined room: ${roomId}`);
    });

    socket.on('startGame', (roomId) => {
      console.log('Received startGame event for room:', roomId);
      const room = rooms.get(roomId);
      console.log('Room:', room);
      // for testing may need to get rid of tracking room size
      //if (room && room.players.size > 1) {
      if (room) {
        room.gameStarted = true;
        io.to(roomId).emit('gameStarted');
      }
    });

    socket.on('updateMyProgress', (roomId, progress) => {
      const room = rooms.get(roomId);
      if (room && room.players.has(socket.id)) {
        room.players.get(socket.id).progress = progress;
        io.to(roomId).emit('progressUpdate', {
          playerId: socket.id,
          progress: progress
        });
      }
    });

    //add end game listener

    socket.on('disconnect', () => {
      rooms.forEach((room, roomId) => {
        if (room.players.has(socket.id)) {
          room.players.delete(socket.id);
          io.to(roomId).emit('playerLeft', socket.id);
          if (room.players.size === 0) {
            rooms.delete(roomId);
          }
        }
      });
      console.log('Client disconnected:', socket.id);
    });
  });
}

module.exports = handleSocket;