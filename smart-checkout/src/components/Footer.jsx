import React from 'react';

/**
 * Footer — Premium dark glass footer
 */
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="brand-shield-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className="brand-text">
              CARD<strong>VALIDATOR</strong>
            </span>
          </div>

          <div className="footer-links">
            <a href="#validator">Validator</a>
            <a href="#how-it-works">Pipeline</a>
            <a href="#networks">Networks</a>
            <a href="#security">Security</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="copyright-text">
            © {new Date().getFullYear()} Card Validator · Client-Side ISO/IEC 7812 Verification Engine.
          </p>
          <p className="disclaimer-text">
            For educational, testing, and debugging purposes. No real monetary transactions or cardholder storage.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
