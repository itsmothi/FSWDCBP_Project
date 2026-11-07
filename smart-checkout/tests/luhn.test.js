import { describe, it, expect } from 'vitest';
import { validateLuhn } from '../src/utils/luhn';

describe('validateLuhn', () => {
  it('should return true for a valid Luhn number', () => {
    // A known valid test number (simulated)
    expect(validateLuhn('79927398713')).toBe(true);
  });

  it('should return false for an invalid Luhn number', () => {
    expect(validateLuhn('79927398710')).toBe(false);
  });

  it('should normalize input by removing spaces and dashes', () => {
    expect(validateLuhn('7992 7398 713')).toBe(true);
    expect(validateLuhn('7992-7398-713')).toBe(true);
  });

  it('should return false for empty input', () => {
    expect(validateLuhn('')).toBe(false);
  });

  it('should return false for input with no digits', () => {
    expect(validateLuhn('abc')).toBe(false);
  });

  it('should handle single digit numbers', () => {
    expect(validateLuhn('0')).toBe(true); // 0 % 10 === 0
    expect(validateLuhn('1')).toBe(false);
  });

  it('should handle null, undefined, and non-string types safely', () => {
    expect(validateLuhn(null)).toBe(false);
    expect(validateLuhn(undefined)).toBe(false);
    expect(validateLuhn(79927398713)).toBe(true);
  });

  it('should validate standard card numbers and documented demo cards', () => {
    // Visa
    expect(validateLuhn('4111 1111 1111 1111')).toBe(true);
    // RuPay
    expect(validateLuhn('6521 1111 1111 1110')).toBe(true);
    // Documented demo cards from TEST_CASES.md
    expect(validateLuhn('3400 000000 00000')).toBe(true);
    expect(validateLuhn('5100 0000 0000 0000')).toBe(true);
    // Standard check-digit variants
    expect(validateLuhn('3400 000000 00009')).toBe(true);
    expect(validateLuhn('5100 0000 0000 0008')).toBe(true);
    // Altered check digit should fail
    expect(validateLuhn('4111 1111 1111 1112')).toBe(false);
  });
});
