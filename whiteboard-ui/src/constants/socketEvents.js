export const SOCKET_EVENTS = {
  // Connection events
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",

  // Drawing events
  DRAW_START: "draw:start",
  DRAW_MOVE: "draw:move",
  DRAW_END: "draw:end",

  DRAW_RECEIVE_START: "draw:receive:start",
  DRAW_RECEIVE_MOVE: "draw:receive:move",
  DRAW_RECEIVE_END: "draw:receive:end",

  // Room events (for future use)
  JOIN_ROOM: "room:join",
  LEAVE_ROOM: "room:leave",
  ROOM_USERS: "room:users",

  // User events (for future use)
  USER_JOINED: "user:joined",
  USER_LEFT: "user:left",
};
