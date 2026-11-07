import React from 'react';
import { detectCardNetwork } from '../utils/card-detection';
import { validateLuhn } from '../utils/luhn';

/**
 * CheckoutStatus — Glassmorphism validation result card.
 * Displays structural breakdown for both valid and invalid states.
 */
const CheckoutStatus = ({ status, onReset, formData = {} }) => {
  const isSuccess = status === 'success';
  const { cardNumber = '', expiryDate = '', cvv = '' } = formData;
  const digits = cardNumber.replace(/\D/g, '');
  const { network, state } = detectCardNetwork(cardNumber);
  const luhnPassed = validateLuhn(digits);

  return (
    <div className={`validation-result-panel ${isSuccess ? 'result-success' : 'result-failure'}`}>
      {/* Status Header */}
      <div className="result-header">
        <div className={`result-badge-icon ${isSuccess ? 'badge-valid' : 'badge-invalid'}`}>
          {isSuccess ? '✓' : '✕'}
        </div>
        <div className="result-title-group">
          <h2 className="result-main-title">
            {isSuccess ? 'CARD VALID' : 'CARD INVALID'}
          </h2>
          <p className="result-sub-title">
            {isSuccess
              ? 'Checksum verification successful'
              : 'Checksum verification failed'}
          </p>
        </div>
      </div>

      {/* Validation Breakdown */}
      <div className="validation-breakdown">
        <div className="breakdown-item">
          <span className={`check-icon ${digits.length >= 13 && digits.length <= 19 ? 'passed' : 'failed'}`}>
            {digits.length >= 13 && digits.length <= 19 ? '✓' : '✕'}
          </span>
          <span className="check-label">Valid length ({digits.length} digits)</span>
        </div>

        <div className="breakdown-item">
          <span className={`check-icon ${/^\d+$/.test(digits) && digits.length > 0 ? 'passed' : 'failed'}`}>
            {/^\d+$/.test(digits) && digits.length > 0 ? '✓' : '✕'}
          </span>
          <span className="check-label">Valid numeric format</span>
        </div>

        <div className="breakdown-item">
          <span className={`check-icon ${luhnPassed ? 'passed' : 'failed'}`}>
            {luhnPassed ? '✓' : '✕'}
          </span>
          <span className="check-label">
            {luhnPassed ? 'Luhn checksum passed (Modulo 10)' : 'Luhn checksum failed'}
          </span>
        </div>

        <div className="breakdown-item">
          <span className={`check-icon ${state === 'recognized' ? 'passed' : 'failed'}`}>
            {state === 'recognized' ? '✓' : '✕'}
          </span>
          <span className="check-label">
            Card network detected: <strong>{network !== 'Unknown' ? network : 'Unrecognized'}</strong>
          </span>
        </div>
      </div>

      {/* Action CTA */}
      <button onClick={onReset} className="validate-btn secondary-reset-btn">
        {isSuccess ? 'Verify Another Card' : 'Try Again'}
      </button>

      <p className="result-disclaimer">
        Mathematical integrity verified client-side · No transaction authorized
      </p>
    </div>
  );
};

export default CheckoutStatus;
