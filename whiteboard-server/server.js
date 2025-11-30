require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const routes = require("./routes");
const { setupSocketIO } = require("./socket");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 8000;

// Initialize server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Create Express app
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Setup REST API routes
    app.use("/api", routes);

    // Create HTTP server
    const server = http.createServer(app);

    // Setup Socket.IO
    const io = new Server(server, {
      cors: {
        origin:process.env.CLIENT_URL,
        methods: ["GET", "POST"],
      },
    });

    // Initialize socket.io handlers
    setupSocketIO(io);

    // Start server only after MongoDB is connected
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
