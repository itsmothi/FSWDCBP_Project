import { describe, it, expect } from 'vitest';
import { formatCardNumber, normalizeCardNumber } from '../src/utils/input-mask';

describe('formatCardNumber', () => {
  it('should format as 4-4-4-4 for Visa', () => {
    expect(formatCardNumber('4111222233334444', 'Visa')).toBe('4111 2222 3333 4444');
  });

  it('should format as 4-6-5 for American Express', () => {
    expect(formatCardNumber('341122223334444', 'American Express')).toBe('3411 222233 34444');
  });

  it('should handle partial input for Visa', () => {
    expect(formatCardNumber('41112', 'Visa')).toBe('4111 2');
  });

  it('should handle partial input for Amex', () => {
    expect(formatCardNumber('34112222333', 'American Express')).toBe('3411 222233 3');
  });

  it('should use default 4-4-4-4 formatting for Unknown network', () => {
    expect(formatCardNumber('1234567812345678', 'Unknown')).toBe('1234 5678 1234 5678');
  });

  it('should return empty string for empty input', () => {
    expect(formatCardNumber('', 'Visa')).toBe('');
  });

  it('should strip non-digit characters before formatting', () => {
    expect(formatCardNumber('4111-2222-3333-4444', 'Visa')).toBe('4111 2222 3333 4444');
  });
});

describe('normalizeCardNumber', () => {
  it('should remove all non-digit characters', () => {
    expect(normalizeCardNumber('4111 2222 3333 4444')).toBe('4111222233334444');
    expect(normalizeCardNumber('3411-222233-34444')).toBe('341122223334444');
  });

  it('should return empty string for empty input', () => {
    expect(normalizeCardNumber('')).toBe('');
  });

  it('should handle null and undefined safely', () => {
    expect(normalizeCardNumber(null)).toBe('');
    expect(normalizeCardNumber(undefined)).toBe('');
    expect(formatCardNumber(null)).toBe('');
    expect(formatCardNumber(undefined)).toBe('');
  });
});
