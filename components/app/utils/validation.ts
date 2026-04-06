export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  custom?: (value: string) => string | null;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateField = (value: string, rules: ValidationRule): string | null => {
  if (rules.required && (!value || value.trim() === '')) {
    return 'This field is required';
  }

  if (!value && !rules.required) {
    return null;
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  if (rules.email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return 'Invalid email address';
    }
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = <T extends Record<string, string>>(
  values: T,
  rules: Record<keyof T, ValidationRule>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((key) => {
    const error = validateField(values[key] || '', rules[key as keyof T]);
    if (error) {
      errors[key] = error;
    }
  });

  return errors;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
};
