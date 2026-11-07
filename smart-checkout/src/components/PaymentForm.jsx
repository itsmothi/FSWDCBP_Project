import React, { useState } from 'react';
import FormField from './FormField';
import CardPreview from './CardPreview';
import CheckoutStatus from './CheckoutStatus';
import { detectCardNetwork } from '../utils/card-detection';
import { formatCardNumber } from '../utils/input-mask';
import { validatePaymentForm, validateField } from '../utils/validation';

const SUPPORTED_NETWORKS = [
  'VISA',
  'MASTERCARD',
  'AMERICAN EXPRESS',
  'DISCOVER',
  'RUPAY',
];

const PRESET_TEST_CARDS = [
  { label: 'Visa', number: '4532015112830366', name: 'Jane Doe', exp: '12/28', cvv: '123' },
  { label: 'Mastercard', number: '5100000000000008', name: 'Alex Smith', exp: '08/29', cvv: '456' },
  { label: 'Amex', number: '340000000000009', name: 'Sarah Connor', exp: '11/27', cvv: '1234' },
  { label: 'Discover', number: '6011000000000004', name: 'David Miller', exp: '05/28', cvv: '789' },
  { label: 'RuPay', number: '6521111111111110', name: 'Rohan Sharma', exp: '06/28', cvv: '987' },
  { label: 'Invalid Mod-10', number: '4111111111111112', name: 'Error Case', exp: '12/28', cvv: '123' },
];

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, failure

  const { network } = detectCardNetwork(formData.cardNumber);

  const handleInputChange = (field, value) => {
    let finalValue = value;

    if (field === 'cardNumber') {
      const { network: detectedNet } = detectCardNetwork(value);
      finalValue = formatCardNumber(value, detectedNet);
    }

    if (field === 'expiryDate') {
      // Simple MM/YY auto-masking
      const digits = value.replace(/\D/g, '');
      if (digits.length > 2) {
        finalValue = `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
      } else {
        finalValue = digits;
      }
    }

    setFormData((prev) => ({ ...prev, [field]: finalValue }));

    // Real-time error clearance if valid
    if (touched[field]) {
      const error = validateField(field, finalValue, { ...formData, [field]: finalValue });
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field], formData);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const applyPreset = (preset) => {
    const { network: detectedNet } = detectCardNetwork(preset.number);
    const formattedNum = formatCardNumber(preset.number, detectedNet);
    setFormData({
      cardNumber: formattedNum,
      cardholderName: preset.name,
      expiryDate: preset.exp,
      cvv: preset.cvv,
    });
    setTouched({});
    setErrors({});
    setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {
      cardholderName: true,
      cardNumber: true,
      expiryDate: true,
      cvv: true,
    };
    setTouched(allTouched);

    const { isValid, errors: validationErrors } = validatePaymentForm(formData);
    setErrors(validationErrors);

    if (isValid) {
      setStatus('processing');
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus('success');
    } else {
      // If validation fails on card number checksum or structure
      if (validationErrors.cardNumber && formData.cardNumber.replace(/\D/g, '').length >= 13) {
        setStatus('failure');
      }
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ cardholderName: '', cardNumber: '', expiryDate: '', cvv: '' });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="validator-dashboard-grid" id="validator-tool">
      {/* ── Left Section: Interactive Card ── */}
      <div className="dashboard-card-section glass-panel">
        <div className="card-section-header">
          <span className="live-preview-tag">
            <span className="live-dot"></span> REAL-TIME 3D PREVIEW
          </span>
          <span className="security-standard">ISO/IEC 7812</span>
        </div>

        <div className="card-preview-wrapper">
          <CardPreview formData={formData} focusedField={focusedField} />
        </div>

        {/* Network Badge Bar */}
        <div className="network-badges-container">
          <span className="network-label-small">DETECTED NETWORK STATUS</span>
          <div className="network-badges-row">
            {SUPPORTED_NETWORKS.map((netName) => {
              const isMatch = network && network.toUpperCase() === netName;
              return (
                <span
                  key={netName}
                  className={`network-badge ${isMatch ? 'badge-active' : ''}`}
                >
                  {netName}
                </span>
              );
            })}
          </div>
        </div>

        {/* Quick Security Metrics */}
        <div className="card-security-specs">
          <div className="spec-item">
            <span className="spec-dot">✓</span> Mod 10 Checksum
          </div>
          <div className="spec-item">
            <span className="spec-dot">✓</span> IIN Range Detection
          </div>
          <div className="spec-item">
            <span className="spec-dot">✓</span> Air-Gapped Privacy
          </div>
        </div>
      </div>

      {/* ── Right Section: Validation Panel ── */}
      <div className="dashboard-form-section glass-panel">
        {status === 'success' || status === 'failure' ? (
          <CheckoutStatus
            status={status}
            onReset={handleReset}
            formData={formData}
          />
        ) : (
          <div className="validation-panel-inner">
            <div className="panel-header">
              <div className="panel-header-top">
                <h2 className="panel-title">Card Details</h2>
                {network && network !== 'Unknown' && (
                  <span className="detected-network-pill">
                    {network.toUpperCase()} DETECTED
                  </span>
                )}
              </div>
              <p className="panel-subtitle">
                Enter a card number to verify its structural and checksum validity.
              </p>
            </div>

            {/* Quick-test Presets Bar */}
            <div className="quick-presets-strip">
              <span className="presets-label">QUICK TEST:</span>
              <div className="presets-buttons">
                {PRESET_TEST_CARDS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className="preset-btn"
                    onClick={() => applyPreset(p)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="validation-form">
              {/* Primary Card Number Input */}
              <div className="field-group-main">
                <label htmlFor="cardNumber" className="field-label">
                  CARD NUMBER
                </label>
                <FormField
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  onBlur={() => handleBlur('cardNumber')}
                  error={touched.cardNumber ? errors.cardNumber : null}
                  placeholder="4532 0151 1283 0366"
                  autoComplete="cc-number"
                />
              </div>

              {/* Cardholder Name */}
              <div className="field-group">
                <FormField
                  label="CARDHOLDER NAME"
                  id="cardholderName"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  onBlur={() => handleBlur('cardholderName')}
                  error={touched.cardholderName ? errors.cardholderName : null}
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
              </div>

              {/* Expiry Date & CVV Row */}
              <div className="form-row">
                <FormField
                  label="EXPIRY DATE"
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  onBlur={() => handleBlur('expiryDate')}
                  error={touched.expiryDate ? errors.expiryDate : null}
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                />
                <FormField
                  label="CVV"
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  onFocus={() => setFocusedField('cvv')}
                  onBlur={() => {
                    handleBlur('cvv');
                    setFocusedField(null);
                  }}
                  error={touched.cvv ? errors.cvv : null}
                  placeholder="123"
                  autoComplete="cc-csc"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="validate-btn primary-btn"
                disabled={status === 'processing'}
              >
                {status === 'processing' ? (
                  <span className="btn-loading-flex">
                    <span className="spinner-dots"></span> VERIFYING CHECKSUM…
                  </span>
                ) : (
                  <span>[ VALIDATE CARD ]</span>
                )}
              </button>

              <div className="panel-security-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Encrypted client-side validation · No credentials logged or sent</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
