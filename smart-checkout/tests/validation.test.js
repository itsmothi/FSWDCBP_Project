import { describe, it, expect } from 'vitest';
import { validatePaymentForm, validateField } from '../src/utils/validation';

describe('validatePaymentForm', () => {
  const validVisaData = {
    cardholderName: 'Jane Doe',
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '12/30',
    cvv: '123',
  };

  it('should return isValid: true for valid Visa data (Happy Path)', () => {
    const result = validatePaymentForm(validVisaData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return isValid: true for valid Amex data (Happy Path)', () => {
    // Both documented demo number and check-digit variant
    const demoAmex = {
      cardholderName: 'John Smith',
      cardNumber: '3400 000000 00000',
      expiryDate: '05/28',
      cvv: '1234',
    };
    const checkDigitAmex = {
      cardholderName: 'John Smith',
      cardNumber: '3400 000000 00009',
      expiryDate: '05/28',
      cvv: '1234',
    };
    expect(validatePaymentForm(demoAmex).isValid).toBe(true);
    expect(validatePaymentForm(checkDigitAmex).isValid).toBe(true);
  });

  it('should return isValid: true for valid Mastercard data (Happy Path)', () => {
    // Both documented demo number and check-digit variant
    const demoMastercard = {
      cardholderName: 'Alice Wonder',
      cardNumber: '5100 0000 0000 0000',
      expiryDate: '08/27',
      cvv: '456',
    };
    const checkDigitMastercard = {
      cardholderName: 'Alice Wonder',
      cardNumber: '5100 0000 0000 0008',
      expiryDate: '08/27',
      cvv: '456',
    };
    expect(validatePaymentForm(demoMastercard).isValid).toBe(true);
    expect(validatePaymentForm(checkDigitMastercard).isValid).toBe(true);
  });

  it('should return isValid: true for valid RuPay data (Happy Path)', () => {
    const rupeeData = {
      cardholderName: 'Rajesh Kumar',
      cardNumber: '6521 1111 1111 1110',
      expiryDate: '09/29',
      cvv: '789',
    };
    const result = validatePaymentForm(rupeeData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return error for missing or empty name', () => {
    const data = { ...validVisaData, cardholderName: ' ' };
    const result = validatePaymentForm(data);
    expect(result.errors.cardholderName).toBe('Please enter your full name.');
  });

  it('should return error for empty card number', () => {
    const data = { ...validVisaData, cardNumber: ' ' };
    const result = validatePaymentForm(data);
    expect(result.errors.cardNumber).toBe('Card number is required.');
  });

  it('should return error for checksum failure', () => {
    const data = { ...validVisaData, cardNumber: '4111 1111 1111 1112' };
    const result = validatePaymentForm(data);
    expect(result.errors.cardNumber).toBe('Invalid card number (checksum failed).');
  });

  it('should return error for unsupported network', () => {
    const data = { ...validVisaData, cardNumber: '9999 9999 9999 9999' };
    const result = validatePaymentForm(data);
    expect(result.errors.cardNumber).toBe('Invalid card number or unsupported network.');
  });

  it('should return error for incomplete card number input', () => {
    const data = { ...validVisaData, cardNumber: '4111' };
    const result = validatePaymentForm(data);
    expect(result.errors.cardNumber).toBe('Invalid card number or unsupported network.');
  });

  it('should return error for empty expiry date', () => {
    const data = { ...validVisaData, expiryDate: ' ' };
    const result = validatePaymentForm(data);
    expect(result.errors.expiryDate).toBe('Expiry date is required.');
  });

  it('should return error for invalid expiry date format', () => {
    const data1 = { ...validVisaData, expiryDate: '12-2025' };
    expect(validatePaymentForm(data1).errors.expiryDate).toBe('Use MM/YY format.');

    const data2 = { ...validVisaData, expiryDate: '13/25' };
    expect(validatePaymentForm(data2).errors.expiryDate).toBe('Use MM/YY format.');
  });

  it('should return error for expired date', () => {
    const data = { ...validVisaData, expiryDate: '01/20' };
    const result = validatePaymentForm(data);
    expect(result.errors.expiryDate).toBe('Card has expired.');
  });

  it('should return error for empty CVV', () => {
    const data = { ...validVisaData, cvv: ' ' };
    const result = validatePaymentForm(data);
    expect(result.errors.cvv).toBe('CVV is required.');
  });

  it('should return error for non-digit CVV', () => {
    const data1 = { ...validVisaData, cvv: '12A' };
    expect(validatePaymentForm(data1).errors.cvv).toBe('CVV must contain only digits.');

    const data2 = { ...validVisaData, cvv: 'ABC' };
    expect(validatePaymentForm(data2).errors.cvv).toBe('CVV must contain only digits.');
  });

  it('should return error for wrong CVV length on Visa (expected 3 digits)', () => {
    const data = { ...validVisaData, cvv: '1234' };
    const result = validatePaymentForm(data);
    expect(result.errors.cvv).toBe('CVV must be 3 digits.');
  });

  it('should return error for wrong CVV length on Amex (expected 4 digits)', () => {
    const data = {
      cardholderName: 'John Smith',
      cardNumber: '3400 000000 00000',
      expiryDate: '05/28',
      cvv: '123',
    };
    const result = validatePaymentForm(data);
    expect(result.errors.cvv).toBe('CVV must be 4 digits.');
  });
});

describe('validateField', () => {
  it('should return error for invalid field', () => {
    const error = validateField('cardholderName', '', {});
    expect(error).toBe('Please enter your full name.');
  });

  it('should return null for valid field', () => {
    const error = validateField('cardholderName', 'John Doe', {});
    expect(error).toBeNull();
  });
});
