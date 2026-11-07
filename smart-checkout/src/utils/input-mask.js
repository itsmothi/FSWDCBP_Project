import { CARD_NETWORKS } from './card-detection';

/**
 * Formats a card number string into groups based on the detected card network.
 *
 * @param {string} cardNumber - The raw card number.
 * @param {string} networkName - The name of the detected card network.
 * @returns {string} - The formatted card number.
 */
export function formatCardNumber(cardNumber, networkName = 'Unknown') {
  if (cardNumber === null || cardNumber === undefined) return '';

  const str = String(cardNumber);
  const digits = str.replace(/\D/g, '');

  if (digits.length === 0) return '';

  // Find the network config by name
  const networkEntry = Object.values(CARD_NETWORKS).find(net => net.name === networkName);

  if (!networkEntry) {
    // Default formatting: 4-4-4-4
    return digits.match(/.{1,4}/g)?.join(' ') || '';
  }

  const { name } = networkEntry;

  if (name === 'American Express') {
    // Amex: 4-6-5
    const parts = [];
    if (digits.length > 0) parts.push(digits.substring(0, 4));
    if (digits.length > 4) parts.push(digits.substring(4, 10));
    if (digits.length > 10) parts.push(digits.substring(10, 15));
    return parts.join(' ');
  }

  // Default: 4-4-4-4 (Visa, Mastercard, Discover, RuPay)
  return digits.match(/.{1,4}/g)?.join(' ') || '';
}

/**
 * Normalizes the card number for internal use (removes formatting).
 *
 * @param {string} cardNumber - The formatted card number.
 * @returns {string} - Only digits.
 */
export function normalizeCardNumber(cardNumber) {
  if (cardNumber === null || cardNumber === undefined) return '';
  return String(cardNumber).replace(/\D/g, '');
}
