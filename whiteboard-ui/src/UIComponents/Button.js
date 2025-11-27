import React from "react";
import { CircularProgress } from "@mui/material";

const Button = ({
  label,
  onClick,
  className = "",
  type = "button",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full p-3 rounded-lg bg-gradient-to-r from-sunset-primary to-sunset-accent text-white font-semibold transition-all duration-200 ${
        disabled || isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-lg hover:scale-[1.02]"
      } ${className}`}
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: "white" }} />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
