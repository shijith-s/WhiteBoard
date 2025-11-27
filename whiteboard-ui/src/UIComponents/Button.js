import React from "react";

const Button = ({ label, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full p-3 rounded-lg bg-gradient-to-r from-sunset-primary to-sunset-accent text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
