import React from 'react';

/**
 * SecuritySpecs — Cybersecurity and privacy metrics
 */
const SecuritySpecs = () => {
  const metrics = [
    {
      value: '0 ms',
      label: 'Network Latency',
      desc: '100% evaluated client-side in the browser V8 engine.',
    },
    {
      value: 'Zero',
      label: 'Server Storage',
      desc: 'No telemetry, database logging, or third-party cookies.',
    },
    {
      value: '100%',
      label: 'Mod 10 Precision',
      desc: 'Conforms to ISO/IEC 7812 checksum mathematics.',
    },
    {
      value: '5 Networks',
      label: 'Global Coverage',
      desc: 'Visa, Mastercard, Amex, Discover, and RuPay support.',
    },
  ];

  return (
    <section className="landing-section" id="security">
      <div className="security-banner glass-panel">
        <div className="section-header-center">
          <span className="section-tag">AIR-GAPPED ARCHITECTURE</span>
          <h2 className="section-title">Built for Absolute Privacy</h2>
          <p className="section-subtitle">
            Designed for cybersecurity auditors, fintech engineers, and developers who demand zero leakage of payment data.
          </p>
        </div>

        <div className="security-metrics-grid">
          {metrics.map((m) => (
            <div key={m.label} className="metric-box">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
              <p className="metric-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySpecs;
