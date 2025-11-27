import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
