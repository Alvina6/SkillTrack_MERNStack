const requirements = [
  { test: (password) => password.length >= 8, message: "At least 8 characters" },
  { test: (password) => password.length <= 72, message: "No more than 72 characters" },
  { test: (password) => /[a-z]/.test(password), message: "One lowercase letter" },
  { test: (password) => /[A-Z]/.test(password), message: "One uppercase letter" },
  { test: (password) => /\d/.test(password), message: "One number" },
  { test: (password) => /[@$!%*?&]/.test(password), message: "One special character from @$!%*?&" },
  { test: (password) => /^[A-Za-z\d@$!%*?&]+$(?![\s\S])/.test(password), message: "Only letters, numbers, and the allowed special characters" },
];

function getUnmetPasswordRequirements(password) {
  if (typeof password !== "string") {
    return requirements.map(({ message }) => message);
  }

  return requirements
    .filter(({ test }) => !test(password))
    .map(({ message }) => message);
}

module.exports = { getUnmetPasswordRequirements };