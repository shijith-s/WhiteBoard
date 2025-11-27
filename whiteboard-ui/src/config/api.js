export const apiConfig = {
  // API server base URL - can be overridden via REACT_APP_BASE_URL env variable
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000",

  // Request timeout in milliseconds
  timeout: 10000,

  // Default headers
  headers: {
    "Content-Type": "application/json",
  },
};

export default apiConfig;
