const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const routes = require("./routes");
const { setupSocketIO } = require("./socket");

const PORT = process.env.PORT || 3000;

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Setup REST API routes
app.use("/", routes);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Initialize socket.io handlers
setupSocketIO(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
