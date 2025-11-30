const mongoose = require("mongoose");

const connectDB = async (retries = 3, delay = 2000) => {
  const mongoURI = process.env.MONGODB_URI;
  
  if (!mongoURI) {
    throw new Error("MONGODB_URI is not set in environment variables");
  }

  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2,
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(mongoURI, options);
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      const isLastAttempt = attempt === retries;
      
      if (isLastAttempt) {
        if (error.name === "MongooseServerSelectionError" || 
            error.message.includes("whitelist") ||
            error.message.includes("ECONNREFUSED")) {
          console.error("MongoDB connection failed: Check IP whitelist in MongoDB Atlas");
        } else if (error.message.includes("authentication failed")) {
          console.error("MongoDB authentication failed: Check credentials");
        } else {
          console.error("MongoDB connection error:", error.message);
        }
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 1.5;
    }
  }
};

module.exports = connectDB;
