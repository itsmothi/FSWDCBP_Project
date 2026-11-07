import { validateLuhn } from './luhn';
import { detectCardNetwork, CARD_NETWORKS } from './card-detection';

/**
 * Validates the entire payment form state.
 *
 * @param {Object} formData - The current form data.
 * @returns {Object} - Validation results { isValid: boolean, errors: { field: message } }.
 */
export function validatePaymentForm(formData) {
  const errors = {};
  const { cardholderName, cardNumber, expiryDate, cvv } = formData;

  // Cardholder Name Validation
  if (!cardholderName || cardholderName.trim().length < 2) {
    errors.cardholderName = 'Please enter your full name.';
  }

  // Card Number Validation
  const safeCardNumber = cardNumber || '';
  const digits = safeCardNumber.replace(/\D/g, '');
  const { network, state } = detectCardNetwork(safeCardNumber);

  if (!safeCardNumber.trim() || !digits) {
    errors.cardNumber = 'Card number is required.';
  } else if (state !== 'recognized') {
    errors.cardNumber = 'Invalid card number or unsupported network.';
  } else if (!validateLuhn(digits)) {
    errors.cardNumber = 'Invalid card number (checksum failed).';
  }

  // Expiry Date Validation (Expected format MM/YY)
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const trimmedExpiry = (expiryDate || '').trim();
  if (!trimmedExpiry) {
    errors.expiryDate = 'Expiry date is required.';
  } else if (!expiryRegex.test(trimmedExpiry)) {
    errors.expiryDate = 'Use MM/YY format.';
  } else {
    const [month, year] = trimmedExpiry.split('/').map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.expiryDate = 'Card has expired.';
    }
  }

  // CVV Validation
  const trimmedCvv = (cvv || '').trim();
  if (!trimmedCvv) {
    errors.cvv = 'CVV is required.';
  } else if (/\D/.test(trimmedCvv)) {
    errors.cvv = 'CVV must contain only digits.';
  } else {
    // Validate CVV length based on network
    const networkConfig = Object.values(CARD_NETWORKS).find(net => net.name === network);
    const expectedLength = networkConfig ? networkConfig.cvvLength : 3;
    if (trimmedCvv.length !== expectedLength) {
      errors.cvv = `CVV must be ${expectedLength} digits.`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates a single field.
 *
 * @param {string} field - The field name.
 * @param {string} value - The field value.
 * @param {Object} allFormData - The full form data for context (e.g. for CVV length).
 * @returns {string|null} - Error message or null if valid.
 */
export function validateField(field, value, allFormData = {}) {
  const { errors } = validatePaymentForm({ ...allFormData, [field]: value });
  return errors[field] || null;
}
