const User = require("../models/User");

const login = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  // Find user by username or email
  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return {
    success: true,
    message: "Login successful",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};

const signup = async (payload) => {
  const { username, email, password } = payload;
  
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // Basic password validation
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    if (existingUser.username === username) {
      throw new Error("Username already exists");
    }
    if (existingUser.email === email) {
      throw new Error("Email already registered");
    }
  }

  // Create new user
  const user = new User({
    username,
    email,
    password,
  });

  await user.save();

  return {
    success: true,
    message: "Signup successful",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};

module.exports = { login, signup };
