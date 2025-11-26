import { io } from "socket.io-client";
import socketConfig from "../config/socket";

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.socketId = null;
    this.listeners = new Set();
  }

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(socketConfig.serverUrl, socketConfig.options);

    this.setupEventListeners();
    return this.socket;
  }

  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      this.isConnected = true;
      this.socketId = this.socket.id;
      console.log("Connected to server:", this.socket.id);
      this.notifyListeners();
    });

    this.socket.on("disconnect", () => {
      this.isConnected = false;
      this.socketId = null;
      console.log("Disconnected from server");
      this.notifyListeners();
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.add(listener);
    // Immediately call with current state
    listener({
      isConnected: this.isConnected,
      socketId: this.socketId,
    });
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify all listeners of state changes
  notifyListeners() {
    const state = {
      isConnected: this.isConnected,
      socketId: this.socketId,
    };
    this.listeners.forEach((listener) => listener(state));
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.socketId = null;
      this.notifyListeners();
    }
  }

  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Socket not connected. Cannot emit:", event);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  getSocket() {
    return this.socket;
  }

  getIsConnected() {
    return this.isConnected;
  }

  getSocketId() {
    return this.socketId;
  }

  getState() {
    return {
      isConnected: this.isConnected,
      socketId: this.socketId,
      socket: this.socket,
    };
  }
}

// Create and export singleton instance
const socketService = new SocketService();
export default socketService;
