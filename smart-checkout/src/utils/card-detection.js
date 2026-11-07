/**
 * Card network detection rules.
 */
export const CARD_NETWORKS = {
  VISA: {
    name: 'Visa',
    prefixes: [/^4/],
    lengths: [13, 16],
    cvvLength: 3,
  },
  MASTERCARD: {
    name: 'Mastercard',
    prefixes: [/^5[1-5]/, /^2[2-7]/],
    lengths: [16],
    cvvLength: 3,
  },
  AMEX: {
    name: 'American Express',
    prefixes: [/^3[47]/],
    lengths: [15],
    cvvLength: 4,
  },
  RUPAY: {
    name: 'RuPay',
    prefixes: [/^652[1-9]/, /^653[0-1]/, /^60[6-8]/, /^81/, /^82/, /^508/],
    lengths: [16],
    cvvLength: 3,
  },
  DISCOVER: {
    name: 'Discover',
    prefixes: [/^6011/, /^622/, /^64[4-9]/, /^65/],
    lengths: [16, 19],
    cvvLength: 3,
  },
};

/**
 * Detects the card network based on the card number.
 *
 * @param {string} cardNumber - The card number to detect.
 * @returns {{network: string, state: 'incomplete' | 'recognized' | 'unknown'}} - The detection result.
 */
export function detectCardNetwork(cardNumber) {
  if (cardNumber === null || cardNumber === undefined) {
    return { network: 'Unknown', state: 'incomplete' };
  }

  const str = String(cardNumber);
  const digits = str.replace(/\D/g, '');

  if (digits.length === 0) {
    return { network: 'Unknown', state: 'incomplete' };
  }

  let matchedNetwork = null;

  for (const [key, config] of Object.entries(CARD_NETWORKS)) {
    const isPrefixMatch = config.prefixes.some(prefix => prefix.test(digits));
    if (isPrefixMatch) {
      matchedNetwork = config;
      break;
    }
  }

  if (!matchedNetwork) {
    return { network: 'Unknown', state: 'unknown' };
  }

  // Check if the length is within the supported range for the detected network
  const isLengthValid = matchedNetwork.lengths.includes(digits.length);
  const isLengthPossible = matchedNetwork.lengths.some(len => digits.length <= len);

  if (isLengthValid) {
    return { network: matchedNetwork.name, state: 'recognized' };
  } else if (isLengthPossible) {
    return { network: matchedNetwork.name, state: 'incomplete' };
  } else {
    return { network: 'Unknown', state: 'unknown' };
  }
}
