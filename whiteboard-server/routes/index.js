const express = require("express");
const authRouter = require("./auth");
const router = express.Router();

// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

router.use("/auth", authRouter);

module.exports = router;
