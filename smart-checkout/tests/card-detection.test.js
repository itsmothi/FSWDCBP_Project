import { describe, it, expect } from 'vitest';
import { detectCardNetwork } from '../src/utils/card-detection';

describe('detectCardNetwork', () => {
  it('should detect Visa cards correctly', () => {
    expect(detectCardNetwork('4111111111111111')).toEqual({ network: 'Visa', state: 'recognized' });
    expect(detectCardNetwork('4')).toEqual({ network: 'Visa', state: 'incomplete' });
  });

  it('should detect Mastercard cards correctly', () => {
    expect(detectCardNetwork('5111111111111111')).toEqual({ network: 'Mastercard', state: 'recognized' });
    expect(detectCardNetwork('2211111111111111')).toEqual({ network: 'Mastercard', state: 'recognized' });
    expect(detectCardNetwork('51')).toEqual({ network: 'Mastercard', state: 'incomplete' });
  });

  it('should detect Amex cards correctly', () => {
    expect(detectCardNetwork('341111111111111')).toEqual({ network: 'American Express', state: 'recognized' });
    expect(detectCardNetwork('371111111111111')).toEqual({ network: 'American Express', state: 'recognized' });
    expect(detectCardNetwork('34')).toEqual({ network: 'American Express', state: 'incomplete' });
  });

  it('should detect Discover cards correctly', () => {
    expect(detectCardNetwork('6011111111111111')).toEqual({ network: 'Discover', state: 'recognized' });
    expect(detectCardNetwork('6511111111111111')).toEqual({ network: 'Discover', state: 'recognized' });
  });

  it('should detect RuPay cards correctly', () => {
    expect(detectCardNetwork('6521111111111111')).toEqual({ network: 'RuPay', state: 'recognized' });
    expect(detectCardNetwork('8211111111111111')).toEqual({ network: 'RuPay', state: 'recognized' });
    expect(detectCardNetwork('6521')).toEqual({ network: 'RuPay', state: 'incomplete' });
  });

  it('should handle null and undefined safely', () => {
    expect(detectCardNetwork(null)).toEqual({ network: 'Unknown', state: 'incomplete' });
    expect(detectCardNetwork(undefined)).toEqual({ network: 'Unknown', state: 'incomplete' });
  });

  it('should return unknown for unsupported prefixes', () => {
    expect(detectCardNetwork('9999999999999999')).toEqual({ network: 'Unknown', state: 'unknown' });
  });

  it('should return incomplete for empty input', () => {
    expect(detectCardNetwork('')).toEqual({ network: 'Unknown', state: 'incomplete' });
  });

  it('should return unknown if the length exceeds supported lengths', () => {
    expect(detectCardNetwork('41111111111111111111')).toEqual({ network: 'Unknown', state: 'unknown' });
  });
});
