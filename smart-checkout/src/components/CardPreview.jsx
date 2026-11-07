import React, { useState } from 'react';
import { detectCardNetwork } from '../utils/card-detection';

const CardPreview = ({ formData, focusedField }) => {
  const { cardNumber, cardholderName, expiryDate } = formData;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { network } = detectCardNetwork(cardNumber || '');
  const digits = (cardNumber || '').replace(/\D/g, '');

  const getThemeClass = () => {
    switch (network) {
      case 'Visa':
        return 'theme-visa';
      case 'Mastercard':
        return 'theme-mastercard';
      case 'American Express':
        return 'theme-amex';
      case 'Discover':
        return 'theme-discover';
      case 'RuPay':
        return 'theme-rupay';
      default:
        return 'theme-default';
    }
  };

  // Format masked number based on network grouping
  const getMaskedNumber = () => {
    if (digits.length === 0) {
      return network === 'American Express' ? '•••• •••••• •••••' : '•••• •••• •••• ••••';
    }
    const isAmex = network === 'American Express';
    const targetLength = isAmex ? 15 : 16;

    // If complete number entered, show first 4 and last 4, bullet rest for privacy
    if (digits.length >= targetLength) {
      if (isAmex) {
        const first4 = digits.substring(0, 4);
        const last5 = digits.substring(10, 15);
        return `${first4} •••••• ${last5}`;
      } else {
        const first4 = digits.substring(0, 4);
        const last4 = digits.substring(digits.length - 4);
        return `${first4} •••• •••• ${last4}`;
      }
    }

    // While typing, fill remaining with dots
    const padded = digits.padEnd(targetLength, '•');
    if (isAmex) {
      return `${padded.substring(0, 4)} ${padded.substring(4, 10)} ${padded.substring(10, 15)}`.trim();
    }
    return padded.match(/.{1,4}/g)?.join(' ') || padded;
  };

  // Render authentic brand logo based on detected network
  const renderBrandLogo = () => {
    switch (network) {
      case 'Visa':
        return (
          <div className="brand-logo-container visa-brand" aria-label="Visa logo">
            <svg viewBox="0 0 100 32" className="visa-svg" fill="none">
              <path
                d="M38.5 2.5L25.3 30H17.4L10.6 8.5C10.2 6.8 9.8 6.2 8.5 5.5C6.4 4.3 3 3.3 0 2.7L0.3 1.3H12.9C14.6 1.3 16 2.4 16.4 4.3L19.4 19.8L27.2 2.5H38.5ZM72.6 20.9C72.6 13.5 62.3 13.1 62.4 9.4C62.4 8.2 63.6 7 66 6.7C67.2 6.5 70.5 6.4 74.2 8.1L75.6 1.7C73.7 1 70.9 0.4 67.4 0.4C59.2 0.4 53.5 4.8 53.4 11C53.3 15.6 57.5 18.2 60.6 19.8C63.8 21.3 64.9 22.3 64.9 23.7C64.8 25.8 62.3 26.8 60 26.8C55.8 26.9 53.3 25.6 51.4 24.7L49.9 31.4C51.8 32.3 55.4 33.1 59.2 33.1C67.8 33.1 72.6 28.8 72.6 20.9ZM93.4 30H100L94.2 2.5H88.1C86.7 2.5 85.6 3.3 85.1 4.5L72.7 30H81.3L83 25.3H93.5L93.4 30ZM85.3 19.1L88.9 9.3L91 19.1H85.3ZM48.6 2.5L42 30H33.9L40.5 2.5H48.6Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        );

      case 'Mastercard':
        return (
          <div className="brand-logo-container mastercard-brand" aria-label="Mastercard logo">
            <svg viewBox="0 0 54 34" className="mastercard-svg">
              <circle cx="17" cy="17" r="16" fill="#EB001B" />
              <circle cx="37" cy="17" r="16" fill="#F79E1B" fillOpacity="0.88" />
            </svg>
          </div>
        );

      case 'American Express':
        return (
          <div className="brand-logo-container amex-brand" aria-label="American Express logo">
            <div className="amex-box">
              <span>AMERICAN</span>
              <span>EXPRESS</span>
            </div>
          </div>
        );

      case 'Discover':
        return (
          <div className="brand-logo-container discover-brand" aria-label="Discover logo">
            <span className="discover-text">DISC</span>
            <span className="discover-sun-dot"></span>
            <span className="discover-text">VER</span>
          </div>
        );

      case 'RuPay':
        return (
          <div className="brand-logo-container rupay-brand" aria-label="RuPay logo">
            <span className="rupay-title">RuPay</span>
            <span className="rupay-arrow-1">❯</span>
            <span className="rupay-arrow-2">❯</span>
          </div>
        );

      default:
        return (
          <div className="brand-logo-container default-brand">
            <span className="default-pill">CARD</span>
          </div>
        );
    }
  };

  const isFlipped = focusedField === 'cvv';

  // Subtle interactive 3D parallax on mouse move
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 10,
      y: (x / rect.width) * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className={`card-container ${isFlipped ? 'flipped' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card-inner"
        style={{
          transform: isFlipped
            ? 'rotateY(180deg)'
            : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* ── Card Front (Dynamically Themed) ── */}
        <div className={`card-front ${getThemeClass()}`}>
          {/* Decorative Amex Guilloche Border Frame */}
          {network === 'American Express' && <div className="amex-inner-frame"></div>}

          {/* Top Row: Chip, Contactless, Brand Logo */}
          <div className="card-top-row">
            <div className="card-top-left-flex">
              {/* Realistic EMV Chip */}
              <div className="card-chip" aria-label="EMV chip">
                <span className="chip-line line-h"></span>
                <span className="chip-line line-v"></span>
              </div>

              {/* Contactless waves */}
              <svg
                className="contactless-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-label="Contactless payment"
              >
                <path d="M7 6a7.5 7.5 0 0 1 10 0" />
                <path d="M9 9a4.5 4.5 0 0 1 6 0" />
                <path d="M11 12a1.5 1.5 0 0 1 2 0" />
              </svg>
            </div>

            {/* Dynamic Brand Logo */}
            <div className="card-top-right">{renderBrandLogo()}</div>
          </div>

          {/* Card Number */}
          <div className="card-number-display" aria-label="Card Number Preview">
            {getMaskedNumber()}
          </div>

          {/* Cardholder & Expiry Row */}
          <div className="card-bottom">
            <div className="card-holder">
              <span className="label">CARD HOLDER</span>
              <span className="value">
                {cardholderName ? cardholderName.toUpperCase() : 'CARD HOLDER'}
              </span>
            </div>
            <div className="card-expiry">
              <span className="label">VALID THRU</span>
              <span className="value">{expiryDate || '12/28'}</span>
            </div>
          </div>
        </div>

        {/* ── Card Back ── */}
        <div className={`card-back ${getThemeClass()}`}>
          <div className="card-magnetic-strip"></div>
          <div className="card-cvv-section">
            <span className="cvv-label">SECURITY CODE (CVV)</span>
            <div className="cvv-box">{formData.cvv ? '•••' : '•••'}</div>
          </div>
          <div className="card-back-disclaimer">
            This card is rendered for mathematical verification demo purposes only.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
