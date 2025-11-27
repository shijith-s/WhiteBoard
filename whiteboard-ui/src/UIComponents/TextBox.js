import React from "react";

const TextBox = ({
  label,
  value,
  type,
  onChange,
  placeholder,
  className,
  name,
  id,
  error,
}) => {
  // Generate non-standard name/id to prevent browser autofill recognition
  const inputName = name || `wb-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const inputId = id || inputName;

  // Use "new-password" for password fields to prevent autofill
  const autoCompleteValue = type === "password" ? "new-password" : "off";

  // Determine border color based on error state
  const borderColor = error
    ? "border-red-400 focus:border-red-500"
    : "border-sunset-secondary/40 focus:border-sunset-primary";

  return (
    <div className="w-full mb-4">
      <input
        type={type || "text"}
        name={inputName}
        id={inputId}
        value={value}
        onChange={onChange}
        title={label}
        placeholder={placeholder || label}
        className={`w-full p-3 rounded-lg border-2 ${borderColor} bg-transparent focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-200" : "focus:ring-sunset-primary/20"
        } transition-all ${className}`}
        autoComplete={autoCompleteValue}
        data-form-type="other"
        data-lpignore="true"
      />
      {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default TextBox;
