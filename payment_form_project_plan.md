# Project Plan: Smart Checkout Payment Form

**Project title:** Client-Side Payment Form with Card Network Detection, Luhn Checksum Validation and Real-Time Input Masking  
**Project type:** Frontend engineering project  
**Suggested stack:** React + Vite, JavaScript, CSS, Vitest  
**Deployment:** Vercel or GitHub Pages  
**Scope:** Simulated checkout only; no real payments or real card data

---

## 1. Project Overview

Build a polished, responsive payment form that detects supported card networks, formats card-number input as the user types, validates card-number checksums with the Luhn algorithm, and provides clear feedback throughout a simulated checkout flow.

The goal is to demonstrate more than visual design: the project should show modular frontend architecture, input handling, validation logic, accessibility, automated testing, and responsible payment-data handling.

## 2. Goals and Success Criteria

- [ ] Responsive layout that works on mobile, tablet, and desktop.
- [ ] Live card preview that updates as the user types.
- [ ] Card-network detection with an explicit unknown/incomplete state.
- [ ] Luhn checksum validation and supported-length checks.
- [ ] Real-time formatting that handles typing, deletion, and pasted input.
- [ ] Expiry-date, cardholder-name, and CVV-format validation.
- [ ] Helpful inline errors and accessible status announcements.
- [ ] Simulated processing, success, and failure states.
- [ ] Automated tests for core algorithms and edge cases.
- [ ] Public demo, useful README, screenshots, and test instructions.

## 3. Feature Scope

### Core features

1. **Payment form**
   - Cardholder name
   - Card number
   - Expiry date
   - CVV/CVC
   - Submit button and clear validation feedback

2. **Live card preview**
   - Reflect cardholder name, formatted number, and expiry date.
   - Show the detected network where confidently recognized.
   - Mask missing digits in the preview.
   - Optionally flip the card preview when the CVV field receives focus.

3. **Card-network detection**
   - Support selected networks such as Visa, Mastercard, American Express, RuPay, and Discover.
   - Use documented prefix/IIN rules and supported lengths.
   - Distinguish `incomplete`, `recognized`, and `unknown` states.
   - Keep detection rules isolated so they can be updated and tested.

4. **Luhn checksum validation**
   - Strip formatting characters before validation.
   - Reject empty, non-digit, and unsupported-length inputs.
   - Run the Luhn checksum on the normalized digits.
   - Explain in the UI that a passing checksum does not prove a card is real or authorized.

5. **Real-time input masking**
   - Format digits into groups based on the detected network.
   - Handle typing, deletion, and pasted values.
   - Preserve a sensible cursor position while formatting.
   - Never treat formatting characters as part of the card number.

6. **Field validation**
   - Required cardholder name.
   - Supported card-number length and Luhn result.
   - Expiry month/year validity and not-expired check.
   - CVV format based on the selected network's expected length.
   - Validate at useful moments (for example, on blur and submit) rather than showing errors for untouched empty fields immediately.

7. **Simulated checkout**
   - Ready-to-submit state.
   - Simulated processing state.
   - Success and failure screens for demonstration.
   - Clearly label the flow as a demo; do not charge or authorize a real payment.

### Stretch features

- Developer/test playground with predefined test cases.
- Keyboard navigation, screen-reader announcements, and reduced-motion support.
- Theme toggle or refined light/dark themes.
- Small validation-status panel.
- Responsive animations and polished empty, loading, error, and success states.
- CI workflow that runs automated tests on each pull request.

## 4. Suggested Technology

- **React + Vite:** component-based interface and fast development.
- **JavaScript:** card detection, normalization, masking, and validation.
- **CSS:** responsive layout, card visuals, transitions, and focus states.
- **Vitest:** unit tests for pure functions.
- **Git and GitHub:** version control, issues, and project documentation.
- **Vercel or GitHub Pages:** deployment, depending on the final setup.

A plain HTML/CSS/JavaScript version is also acceptable. Keep the validation logic modular so it can be reused if the interface is later moved to React.

## 5. Suggested Folder Structure

```text
smart-checkout/
├── index.html
├── src/
│   ├── components/
│   │   ├── CardPreview.jsx
│   │   ├── PaymentForm.jsx
│   │   ├── FormField.jsx
│   │   └── CheckoutStatus.jsx
│   ├── utils/
│   │   ├── card-detection.js
│   │   ├── luhn.js
│   │   ├── input-mask.js
│   │   └── validation.js
│   ├── styles/
│   │   └── checkout.css
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── luhn.test.js
│   ├── card-detection.test.js
│   ├── input-mask.test.js
│   └── validation.test.js
├── README.md
└── package.json
```

## 6. Ten-Day Implementation Roadmap

### Day 1 — UI and project setup
- Create the React + Vite project.
- Build the checkout layout and responsive structure.
- Add the initial card preview and form fields.
- **Deliverable:** static, responsive form.

### Day 2 — Luhn algorithm
- Implement a pure `luhn.js` validation function.
- Normalize input by removing spaces and separators.
- Add tests for valid, invalid, empty, and malformed input.
- **Deliverable:** tested checksum utility.

### Day 3 — Card-network detection
- Implement a separate card-detection utility.
- Add supported prefix and length rules for selected networks.
- Handle partial input and unknown prefixes without overclaiming certainty.
- **Deliverable:** network label updates as digits are entered.

### Day 4 — Input masking
- Add network-aware grouping and digit normalization.
- Handle paste, insertion, deletion, and cursor position.
- Test short, complete, and overlong input.
- **Deliverable:** reliable formatted card-number field.

### Day 5 — Form validation
- Validate name, card number, expiry, and CVV format.
- Add inline messages and touched/submitted field states.
- Keep validation logic separate from presentation.
- **Deliverable:** form provides useful, consistent feedback.

### Day 6 — Live preview and visual polish
- Synchronize the preview with form state.
- Add card-network branding, masked digits, transitions, and focus states.
- Respect reduced-motion preferences.
- **Deliverable:** polished, interactive checkout interface.

### Day 7 — Checkout states
- Implement submit, simulated processing, success, and failure states.
- Prevent duplicate submissions in the demo.
- Make it clear that no real transaction occurs.
- **Deliverable:** end-to-end demo flow.

### Day 8 — Testing and edge cases
- Expand unit tests for detection, masking, expiry, and CVV rules.
- Test keyboard use, paste behavior, and incomplete inputs.
- Fix issues found during manual testing.
- **Deliverable:** repeatable test suite and recorded results.

### Day 9 — Accessibility and security review
- Check labels, focus visibility, keyboard navigation, and screen-reader messages.
- Check contrast and responsive behavior.
- Ensure sensitive-looking fields are never saved or logged.
- **Deliverable:** accessible, privacy-conscious interface.

### Day 10 — Deployment and documentation
- Deploy the demo.
- Add screenshots or a short GIF to the README.
- Document architecture, algorithms, limitations, test commands, and setup.
- **Deliverable:** portfolio-ready repository and live demo.

## 7. Testing Checklist

### Luhn utility
- [ ] Known test number passes.
- [ ] Altered final digit fails.
- [ ] Spaces and separators are normalized.
- [ ] Empty and non-digit input is handled safely.
- [ ] Unsupported lengths are rejected by the overall validation layer.

### Network detection
- [ ] Recognized prefix is identified correctly.
- [ ] Partial prefix remains incomplete when ambiguous.
- [ ] Unsupported prefix becomes unknown.
- [ ] Length constraints are checked separately from prefix detection.

### Input masking
- [ ] Digits are grouped correctly for the selected network.
- [ ] Letters and unsupported characters are discarded or handled consistently.
- [ ] Paste works.
- [ ] Deletion and insertion do not cause unexpected cursor jumps.
- [ ] Input is capped at the supported length.

### Form and checkout
- [ ] Untouched empty fields do not show premature errors.
- [ ] Errors appear on blur or submit as designed.
- [ ] Expired dates fail validation.
- [ ] CVV length follows the selected network's rules.
- [ ] Submit is blocked when required validation fails.
- [ ] Success and failure states are keyboard-accessible.

## 8. Security and Accuracy Notes

- Luhn validation checks a checksum; it does **not** establish that a card exists, is active, has funds, or is authorized.
- Card-network detection is best-effort based on known prefix/IIN ranges and supported lengths. Rules may change and some prefixes may be ambiguous.
- Use clearly identified test numbers only. Do not ask users to enter real payment details into a portfolio demo.
- Never store card numbers or CVVs in `localStorage`, cookies, analytics, console logs, screenshots, or a custom backend.
- Do not claim PCI compliance or real payment processing.
- If real payments are ever added, use a reputable payment provider's hosted checkout or secure payment components and follow its integration and compliance guidance.

## 9. README Checklist

- [ ] Project overview and feature list.
- [ ] Screenshots and live demo link.
- [ ] Technology stack.
- [ ] Setup and run commands.
- [ ] Architecture and module responsibilities.
- [ ] Explanation of the Luhn algorithm.
- [ ] Explanation and limitations of network detection.
- [ ] Test command and test results.
- [ ] Accessibility and data-handling notes.
- [ ] Clear statement that the checkout is simulated.

## 10. Suggested Resume Description

Use this only after implementing the listed features:

**Smart Checkout — Card Validation and Payment UI**
- Built a responsive checkout interface with card-network detection, Luhn checksum validation, and real-time input masking.
- Developed modular validation utilities and interactive checkout states with inline user feedback.
- Added automated tests for checksum validation, card detection, and input-formatting edge cases, with accessibility and privacy-conscious data handling.

---

## Definition of Done

The project is complete when the form is responsive, the preview updates live, detection and validation behave correctly for tested edge cases, masking handles typing and paste reliably, checkout states are simulated, automated tests pass, sensitive card data is not persisted or logged, and the deployed demo is documented in the README.
