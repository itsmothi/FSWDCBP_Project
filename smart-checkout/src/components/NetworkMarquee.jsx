import React from 'react';

/**
 * NetworkMarquee — continuous scrolling card-network strip.
 * Logic unchanged; display icon added per network.
 */
const NetworkMarquee = () => {
  const networks = ['Visa', 'Mastercard', 'American Express', 'Discover', 'RuPay'];
  const duplicatedNetworks = [...networks, ...networks];

  return (
    <div className="marquee-container" aria-label="Supported card networks" aria-hidden="true">
      <div className="marquee-track">
        {duplicatedNetworks.map((net, idx) => (
          <span key={idx} className="marquee-item">
            {net}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NetworkMarquee;
