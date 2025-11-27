export const socketConfig = {
  // Socket server URL - can be overridden via REACT_APP_SOCKET_URL env variable
  serverUrl: process.env.REACT_APP_BASE_URL,

  // Socket.IO connection options
  options: {
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  },
};

export default socketConfig;
