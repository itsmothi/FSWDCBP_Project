import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PaymentForm from './components/PaymentForm';
import HowItWorks from './components/HowItWorks';
import SupportedNetworks from './components/SupportedNetworks';
import SecuritySpecs from './components/SecuritySpecs';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import './styles/checkout.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLaunchValidator = () => {
    const validatorEl = document.getElementById('validator');
    if (validatorEl) {
      validatorEl.scrollIntoView({ behavior: 'smooth' });
      const cardInput = document.getElementById('cardNumber');
      if (cardInput) {
        setTimeout(() => cardInput.focus(), 500);
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-container" id="top">
      {/* Background ambient lighting */}
      <div className="ambient-orb ambient-orb-1" aria-hidden="true"></div>
      <div className="ambient-orb ambient-orb-2" aria-hidden="true"></div>
      <div className="ambient-grid-overlay" aria-hidden="true"></div>

      {/* Modern Sticky Glass Navbar */}
      <Navbar onLaunchValidator={handleLaunchValidator} />

      {/* Main Landing Page Wrapper */}
      <div className="dashboard-wrapper">
        {/* ── Hero Section ── */}
        <header className="hero-landing-header">
          <div className="header-badge">
            <span className="badge-pulse-dot"></span>
            NEXT-GEN ISO/IEC 7812 VERIFICATION ENGINE
          </div>

          <h1 className="hero-main-title">
            Card Validation,<br />
            <span className="gradient-highlight">Engineered to Perfection.</span>
          </h1>

          <p className="hero-main-subtitle">
            Instant IIN prefix identification, real-time Luhn Mod 10 checksum mathematics,
            and dynamic 3D card brand morphing. 100% private, client-side, zero data retention.
          </p>

          <div className="hero-action-row">
            <button className="primary-hero-btn" onClick={handleLaunchValidator}>
              <span>Launch Live Validator</span>
              <span className="hero-arrow">↓</span>
            </button>
            <a href="#how-it-works" className="secondary-hero-btn">
              <span>Explore Pipeline</span>
            </a>
          </div>

          {/* Quick Trust Bar */}
          <div className="hero-trust-bar">
            <span className="trust-label">CERTIFIED ALGORITHM COMPATIBILITY:</span>
            <div className="trust-logos">
              <span>VISA</span>
              <span>•</span>
              <span>MASTERCARD</span>
              <span>•</span>
              <span>AMEX</span>
              <span>•</span>
              <span>DISCOVER</span>
              <span>•</span>
              <span>RUPAY</span>
            </div>
          </div>
        </header>

        {/* ── Core Interactive Validator Section ── */}
        <section className="validator-showcase-section" id="validator">
          <div className="section-header-center">
            <span className="section-tag">INTERACTIVE WORKBENCH</span>
            <h2 className="section-title">Live Verification Workbench</h2>
            <p className="section-subtitle">
              Enter any test card or click a preset below to see real-time brand detection and mathematical validation in action.
            </p>
          </div>

          <PaymentForm />
        </section>

        {/* ── 3-Step Verification Pipeline ── */}
        <HowItWorks />

        {/* ── Supported Card Networks ── */}
        <SupportedNetworks />

        {/* ── Security Architecture ── */}
        <SecuritySpecs />

        {/* ── Frequently Asked Questions ── */}
        <FAQSection />
      </div>

      {/* ── Premium Glass Footer ── */}
      <Footer />
    </div>
  );
}

export default App;
