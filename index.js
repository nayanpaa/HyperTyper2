const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = require('./app');
const handleSocket = require('./socket');

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors())

const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});


handleSocket(io);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});