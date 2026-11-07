import React from 'react';

/**
 * SupportedNetworks — Detailed specs and card network rules
 */
const SupportedNetworks = () => {
  const networks = [
    {
      name: 'Visa',
      prefix: 'Starts with 4',
      length: '16 digits',
      cvv: '3 digits',
      theme: 'theme-visa',
      tagColor: '#60a5fa',
    },
    {
      name: 'Mastercard',
      prefix: 'Starts with 51–55, 2221–2720',
      length: '16 digits',
      cvv: '3 digits',
      theme: 'theme-mastercard',
      tagColor: '#f97316',
    },
    {
      name: 'American Express',
      prefix: 'Starts with 34, 37',
      length: '15 digits',
      cvv: '4 digits',
      theme: 'theme-amex',
      tagColor: '#94a3b8',
    },
    {
      name: 'Discover',
      prefix: 'Starts with 6011, 644–649, 65',
      length: '16 digits',
      cvv: '3 digits',
      theme: 'theme-discover',
      tagColor: '#fb923c',
    },
    {
      name: 'RuPay',
      prefix: 'Starts with 6521–6531, 60, 81, 82, 508',
      length: '16 digits',
      cvv: '3 digits',
      theme: 'theme-rupay',
      tagColor: '#34d399',
    },
  ];

  return (
    <section className="landing-section" id="networks">
      <div className="section-header-center">
        <span className="section-tag">GLOBAL COVERAGE</span>
        <h2 className="section-title">Supported Payment Networks</h2>
        <p className="section-subtitle">
          Engineered to support the world’s leading card brands with strict prefix matching and length enforcement.
        </p>
      </div>

      <div className="networks-grid">
        {networks.map((net) => (
          <div key={net.name} className={`network-spec-card glass-panel ${net.theme}`}>
            <div className="net-card-top">
              <h3 className="net-name">{net.name}</h3>
              <span className="net-status-dot" style={{ background: net.tagColor }}></span>
            </div>
            <div className="net-specs-list">
              <div className="net-spec-row">
                <span className="spec-label">IIN / BIN Range</span>
                <span className="spec-val">{net.prefix}</span>
              </div>
              <div className="net-spec-row">
                <span className="spec-label">Card Length</span>
                <span className="spec-val">{net.length}</span>
              </div>
              <div className="net-spec-row">
                <span className="spec-label">CVV Format</span>
                <span className="spec-val">{net.cvv}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportedNetworks;
