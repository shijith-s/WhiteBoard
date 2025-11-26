const express = require("express");
const router = express.Router();

// Health check route
router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
