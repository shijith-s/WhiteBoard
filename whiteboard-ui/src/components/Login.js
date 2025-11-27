import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextBox from "../UIComponents/TextBox";
import Button from "../UIComponents/Button";
import { validateForm } from "../utils/loginValidator";

const styles = {
  input:
    "w-full p-3 rounded-lg border-2 border-sunset-secondary/40 mb-4 bg-transparent focus:outline-none focus:border-sunset-primary focus:ring-2 focus:ring-sunset-primary/20 transition-all",
  button:
    "w-full p-3 rounded-lg bg-gradient-to-r from-sunset-primary to-sunset-accent text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200",
  linkText: "text-sm text-sunset-primary mt-4",
  link: "font-bold",
};

const Login = ({ isSignup = false }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input change with error clearing
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e?.preventDefault();
    const newErrors = validateForm(formData, isSignup);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with submission
      if (isSignup) {
        // signup(formData.username, formData.email, formData.password, formData.confirmPassword);
      } else {
        // login(formData.username, formData.password);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-sunset-cream via-sunset-peach to-sunset-secondary/20">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-[90%] flex flex-col items-center justify-center border-2 border-sunset-secondary/30">
        <h1 className="text-3xl font-bold mb-6 text-sunset-primary">
          WhiteBoard
        </h1>
        <form autoComplete="off" className="w-full" onSubmit={handleSubmit}>
          <TextBox
            label="Username"
            value={formData.username}
            onChange={handleChange("username")}
            name="wb-username"
            id="wb-username"
            error={errors.username}
          />
          {isSignup && (
            <TextBox
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange("email")}
              name="wb-email"
              id="wb-email"
              error={errors.email}
            />
          )}
          <TextBox
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange("password")}
            name="wb-password"
            id="wb-password"
            error={errors.password}
          />
          {isSignup && (
            <TextBox
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              name="wb-confirm-password"
              id="wb-confirm-password"
              error={errors.confirmPassword}
            />
          )}
          <Button
            label={isSignup ? "Signup" : "Login"}
            onClick={handleSubmit}
            type="submit"
          />
        </form>
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
