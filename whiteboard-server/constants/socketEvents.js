const SOCKET_EVENTS = {
  // Connection events
  CONNECT: "connection",
  DISCONNECT: "disconnect",

  // Drawing events (incoming from clients)
  DRAW_START: "draw:start",
  DRAW_MOVE: "draw:move",
  DRAW_END: "draw:end",

  // Drawing events (broadcast to other clients)
  DRAW_RECEIVE_START: "draw:receive:start",
  DRAW_RECEIVE_MOVE: "draw:receive:move",
  DRAW_RECEIVE_END: "draw:receive:end",
};

module.exports = { SOCKET_EVENTS };
