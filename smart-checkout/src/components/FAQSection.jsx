import React, { useState } from 'react';

/**
 * FAQSection — Interactive accordion for frequently asked questions
 */
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Does this tool check if a card has money on it or is active?',
      a: 'No. This application performs structural, mathematical, and prefix verification (Luhn Mod 10 & ISO/IEC 7812). Checking account balance or card status requires an acquiring payment gateway and PCI-DSS merchant authorization. No bank accounts are queried here.',
    },
    {
      q: 'Is it safe to test my real card number here?',
      a: 'Yes. The entire code runs 100% client-side in your web browser. Check the Network tab in your browser developer tools: zero HTTP requests are dispatched when validating cards.',
    },
    {
      q: 'How does the Luhn checksum detect errors?',
      a: 'The Luhn algorithm (also known as Modulo 10) was invented by IBM scientist Hans Peter Luhn. By doubling every second digit from the right and reducing sums greater than 9, it generates a check digit. It detects 100% of single-digit input errors and nearly all transposition errors (such as swapping two adjacent numbers).',
    },
    {
      q: 'Why does American Express have 15 digits instead of 16?',
      a: 'Card networks define their own number length rules under ISO/IEC 7812. American Express uses 15 digits grouped into 4-6-5, whereas Visa, Mastercard, Discover, and RuPay use 16 digits grouped into 4-4-4-4.',
    },
  ];

  return (
    <section className="landing-section" id="faq">
      <div className="section-header-center">
        <span className="section-tag">COMMON QUESTIONS</span>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Everything you need to know about client-side checksum verification and security.
        </p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`faq-item glass-panel ${isOpen ? 'faq-open' : ''}`}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
            >
              <div className="faq-question-row">
                <span className="faq-question-text">{faq.q}</span>
                <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
              </div>
              {isOpen && <p className="faq-answer-text">{faq.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
