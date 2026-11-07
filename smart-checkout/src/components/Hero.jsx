import React from 'react';
import PaymentForm from './PaymentForm';

/**
 * Hero — full-viewport hero section.
 * Layout: left editorial copy + right product panel (glass card + form).
 * No logic changes.
 */
const Hero = ({ onExploreDemo }) => {
  return (
    <section className="hero-section">
      <div className="hero-inner">

        {/* ── Left: Editorial copy ── */}
        <div className="hero-left">
          <span className="eyebrow">Smart Checkout · Client-Side Demo</span>

          <h1 className="hero-headline">
            Your card.<br />
            <strong>Understood.</strong>
          </h1>

          <p className="hero-supporting">
            A smarter payment-form experience with instant card-network detection,
            checksum validation, and formatting that keeps up as you type.
          </p>

          <button
            className="pill-button pill-button-black"
            onClick={onExploreDemo}
            aria-label="Scroll to payment demo form"
          >
            Explore the demo
            <span className="arrow-icon" aria-hidden="true">→</span>
          </button>

          <p className="hero-detail">No real payment is made · Test data only</p>
        </div>

        {/* ── Right: Product panel ── */}
        <div className="hero-right">
          <div className="product-panel">
            <PaymentForm />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
