import React, { createContext, useContext, useEffect, useState } from "react";
import socketService from "../services/socket";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const useSocketState = () => {
  const [state, setState] = useState(() => ({
    isConnected: socketService.getIsConnected(),
    socketId: socketService.getSocketId(),
  }));

  useEffect(() => {
    const unsubscribe = socketService.subscribe((newState) => {
      setState({
        isConnected: newState.isConnected,
        socketId: newState.socketId,
      });
    });

    return unsubscribe;
  }, []);

  return state;
};

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socketService.connect();

    return () => socketService.disconnect();
  }, []);

  const value = {
    emit: socketService.emit.bind(socketService),
    on: socketService.on.bind(socketService),
    off: socketService.off.bind(socketService),
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
