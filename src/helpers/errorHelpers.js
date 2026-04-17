/**
 * Check if a specific field has an error
 * @param {string} fieldName - Field name (e.g: 'email', 'password')
 * @param {Object} errors - Form errors object, e.g: { email: 'Email is required' }
 * @returns {boolean}
 */
export const hasError = (fieldName, errors = {}) => {
  return errors?.[fieldName];
};

/**
 * Get error message for a specific field
 * @param {string} fieldName - Field name
 * @param {Object} errors - Errors object, e.g: { email: 'Email is required' }
 * @returns {string | undefined}
 */
export const getErrorMessage = (fieldName, errors = {}) => {
  return errors?.[fieldName];
};
