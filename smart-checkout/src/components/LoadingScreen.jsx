import React from 'react';

/**
 * LoadingScreen — sleek dark glassmorphism cybersecurity loader.
 * No Halo Checkout branding.
 */
const LoadingScreen = () => {
  return (
    <div className="loading-screen" role="status" aria-label="Loading">
      <div className="loading-content">
        <div className="loader-logo">
          <div className="logo-shield" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div className="logo-text">
            CARD<span>VALIDATOR</span>
          </div>
        </div>

        <div className="loading-bar-container" aria-hidden="true">
          <div className="loading-bar"></div>
        </div>

        <p className="loading-text">Initializing Secure Environment…</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
