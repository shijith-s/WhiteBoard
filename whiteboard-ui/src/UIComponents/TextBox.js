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
}) => {
  // Generate non-standard name/id to prevent browser autofill recognition
  const inputName = name || `wb-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const inputId = id || inputName;

  // Use "new-password" for password fields to prevent autofill
  const autoCompleteValue = type === "password" ? "new-password" : "off";

  return (
    <input
      type={type || "text"}
      name={inputName}
      id={inputId}
      value={value}
      onChange={onChange}
      title={label}
      placeholder={placeholder || label}
      className={`w-full p-3 rounded-lg border-2 border-sunset-secondary/40 mb-4 bg-transparent focus:outline-none focus:border-sunset-primary focus:ring-2 focus:ring-sunset-primary/20 transition-all ${className}`}
      autoComplete={autoCompleteValue}
      data-form-type="other"
      data-lpignore="true"
    />
  );
};

export default TextBox;
