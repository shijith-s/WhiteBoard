// Validation constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

// Individual validation functions (pure functions)
const validators = {
  username: (value) => {
    if (!value?.trim()) return "Username is required";
    return null;
  },
  email: (value) => {
    if (!value?.trim()) return "Email is required";
    if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address";
    return null;
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }
    return null;
  },
  confirmPassword: (value, password) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return null;
  },
};

// Pure validation function - no side effects
function validateForm(data, isSignup = false) {
  const errors = {};

  // Username validation (always required)
  const usernameError = validators.username(data.username);
  if (usernameError) errors.username = usernameError;

  // Password validation (always required)
  const passwordError = validators.password(data.password);
  if (passwordError) errors.password = passwordError;

  // Confirm password validation (only for signup)
  if (isSignup) {
    const emailError = validators.email(data.email);
    if (emailError) errors.email = emailError;
    const confirmPasswordError = validators.confirmPassword(
      data.confirmPassword,
      data.password
    );
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  }

  return errors;
}

// Export as named export for better webpack compatibility
export { validateForm };
