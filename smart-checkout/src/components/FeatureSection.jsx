import React from 'react';

/**
 * FeatureCard — glass card for the feature section.
 * Props unchanged.
 */
const FeatureCard = ({ title, body, span = 1, bgColor = 'white' }) => {
  const bgClass = bgColor === 'plum' ? 'bg-plum' : 'bg-white';
  const spanClass = span === 2 ? 'span-2' : '';

  return (
    <div className={`feature-card ${bgClass} ${spanClass}`}>
      <div className="feature-content">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
};

/**
 * FeatureSection — "Validation, without the guesswork." editorial section.
 */
const FeatureSection = () => {
  return (
    <section className="section-container section-padding" id="overview">
      <div className="feature-header">
        <div className="feature-left">
          <h2>Validation, without the guesswork.</h2>
          <button className="pill-button pill-button-black">
            See how it works <span className="arrow-icon">→</span>
          </button>
        </div>
        <div className="feature-right">
          <p className="feature-description">
            Every field responds with useful feedback, while the logic behind card
            detection, formatting, and validation stays modular and testable.
          </p>
        </div>
      </div>

      <div className="feature-grid">
        <FeatureCard
          span={2}
          title="Recognized as you type"
          body="Identify supported networks from the number prefix and length rules, with a clear state when the input is incomplete or unknown."
        />
        <FeatureCard
          bgColor="plum"
          title="Checks the checksum."
          body="Confirm number structure with the Luhn algorithm — not card ownership, funds, or authorization."
        />
        <FeatureCard
          bgColor="plum"
          title="Formatted in real time."
          body="Group digits for readability while handling typing, deletion, and pasted input."
        />
        <FeatureCard
          title="Test beyond the happy path."
          body="Explore incomplete input, unsupported prefixes, invalid checksums, and expired dates."
        />
      </div>
    </section>
  );
};

export default FeatureSection;
