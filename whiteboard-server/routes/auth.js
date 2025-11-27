const express = require("express");
const { signup, login } = require("../services/auth");
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const response = await login(username, password);
    res.status(200).json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    const response = await signup(username, email, password);
    res.status(201).json(response);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Signup failed",
    });
  }
});

module.exports = router;
