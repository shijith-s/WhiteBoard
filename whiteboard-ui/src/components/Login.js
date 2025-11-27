import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextBox from "../UIComponents/TextBox";
import Button from "../UIComponents/Button";

const styles = {
  input:
    "w-full p-3 rounded-lg border-2 border-sunset-secondary/40 mb-4 bg-transparent focus:outline-none focus:border-sunset-primary focus:ring-2 focus:ring-sunset-primary/20 transition-all",
  button:
    "w-full p-3 rounded-lg bg-gradient-to-r from-sunset-primary to-sunset-accent text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200",
  linkText: "text-sm text-sunset-primary mt-4",
  link: "font-bold",
};

const Login = ({ isSignup = false }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (isSignup) {
      //   signup(username, email, password, confirmPassword);
    } else {
      //   login(username, password);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-sunset-cream via-sunset-peach to-sunset-secondary/20">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-[90%] flex flex-col items-center justify-center border-2 border-sunset-secondary/30">
        <h1 className="text-3xl font-bold mb-6 text-sunset-primary">
          WhiteBoard
        </h1>
        <TextBox
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="wb-username"
          id="wb-username"
        />
        {isSignup && (
          <TextBox
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="wb-email"
            id="wb-email"
          />
        )}
        <TextBox
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="wb-password"
          id="wb-password"
        />
        {isSignup && (
          <TextBox
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="wb-confirm-password"
            id="wb-confirm-password"
          />
        )}
        <Button
          label={isSignup ? "Signup" : "Login"}
          onClick={handleSubmit}
          type="submit"
        />
        {isSignup ? (
          <p className={styles.linkText}>
            Already have an account?&nbsp;
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </p>
        ) : (
          <p className={styles.linkText}>
            Don&apos;t have an account?&nbsp;
            <Link to="/signup" className={styles.link}>
              Signup
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
