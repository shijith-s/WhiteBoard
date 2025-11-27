import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const TextBox = ({
  label,
  value,
  type = "text",
  onChange,
  placeholder,
  className = "",
  name,
  id,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Generate non-standard name/id to prevent browser autofill
  const inputName = name || `wb-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const inputId = id || inputName;
  const inputType = isPassword && showPassword ? "text" : type;
  const autoComplete = isPassword ? "new-password" : "off";

  // Determine border color based on error state
  const borderColor = error
    ? "border-red-400 focus:border-red-500"
    : "border-sunset-secondary/40 focus:border-sunset-primary";
  const inputClass = `w-full p-3 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 transition-all ${borderColor} ${
    isPassword ? "pr-10" : ""
  } ${className}`;

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full mb-4">
      <div className="relative">
        <input
          type={inputType}
          name={inputName}
          id={inputId}
          value={value}
          onChange={onChange}
          title={label}
          placeholder={placeholder || label}
          className={inputClass}
          autoComplete={autoComplete}
          data-form-type="other"
          data-lpignore="true"
        />
        {isPassword && value && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-sunset-primary transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <VisibilityOffIcon sx={{ fontSize: 20 }} />
            ) : (
              <VisibilityIcon sx={{ fontSize: 20 }} />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default TextBox;
