const { SOCKET_EVENTS } = require("../constants/socketEvents");

function setupSocketIO(io) {
  io.on(SOCKET_EVENTS.CONNECT, (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle socket disconnection
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    // Drawing event handlers
    socket.on(SOCKET_EVENTS.DRAW_START, (data) => {
      // Broadcast to all other clients
      socket.broadcast.emit(SOCKET_EVENTS.DRAW_RECEIVE_START, data);
    });

    socket.on(SOCKET_EVENTS.DRAW_MOVE, (data) => {
      // Broadcast to all other clients
      socket.broadcast.emit(SOCKET_EVENTS.DRAW_RECEIVE_MOVE, data);
    });

    socket.on(SOCKET_EVENTS.DRAW_END, (data) => {
      // Broadcast to all other clients
      socket.broadcast.emit(SOCKET_EVENTS.DRAW_RECEIVE_END, data);
    });
  });
}

module.exports = { setupSocketIO };
