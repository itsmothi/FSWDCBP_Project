import React from 'react';

/**
 * Navbar — Modern dark glassmorphism navigation.
 * No Halo Checkout branding; features glowing shield icon and smooth scroll links.
 */
const Navbar = ({ onLaunchValidator }) => {
  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#top" className="navbar-brand">
          <div className="brand-shield-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span className="brand-text">
            CARD<strong>VALIDATOR</strong>
          </span>
        </a>

        {/* Navigation Links */}
        <div className="navbar-nav-links">
          <a href="#validator">Validator</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#networks">Networks</a>
          <a href="#security">Security</a>
          <a href="#faq">FAQ</a>
        </div>

        {/* Right CTA */}
        <div className="navbar-cta-group">
          <button className="nav-action-btn" onClick={onLaunchValidator}>
            <span>Test A Card</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
