import React from 'react';

/**
 * HowItWorks — 3-Step Verification Pipeline
 */
const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'IIN Prefix Identification',
      description:
        'The Issuer Identification Number (first 1–6 digits) is matched against global payment network tables to identify Visa, Mastercard, Amex, Discover, or RuPay in real time.',
      badge: 'Prefix Matching',
    },
    {
      step: '02',
      title: 'Luhn Modulo 10 Checksum',
      description:
        'Digits are doubled from right to left, summed, and verified against a modulo 10 checksum. This mathematical test catches 100% of single-digit transposition errors.',
      badge: 'ISO/IEC 7812',
    },
    {
      step: '03',
      title: 'Air-Gapped Client Privacy',
      description:
        'Verification runs entirely inside your browser sandbox. No card numbers are transmitted across the network, stored in cookies, or sent to third-party APIs.',
      badge: 'Zero Storage',
    },
  ];

  return (
    <section className="landing-section" id="how-it-works">
      <div className="section-header-center">
        <span className="section-tag">VERIFICATION PIPELINE</span>
        <h2 className="section-title">How the Algorithm Works</h2>
        <p className="section-subtitle">
          A three-stage validation architecture combining structural IIN detection with strict mathematical checksum verification.
        </p>
      </div>

      <div className="pipeline-steps-grid">
        {steps.map((s) => (
          <div key={s.step} className="pipeline-card glass-panel">
            <div className="step-top-row">
              <span className="step-number">{s.step}</span>
              <span className="step-badge">{s.badge}</span>
            </div>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-desc">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
