# 💳 Card Validator — Modern FinTech & Cybersecurity Interface

A modern, responsive, and client-side credit card validation workbench built with **React 18**, **Vite**, and **pure CSS glassmorphism**. Features real-time IIN prefix network recognition, dynamic 3D card brand morphing, Luhn Modulo 10 mathematical checksum verification, and air-gapped zero-transmission privacy.

---

## ✨ Features

- **Dynamic Brand Morphing**: As card digits are typed, the 3D card surface smoothly morphs into authentic designs for:
  - **Visa** (Deep royal blue gradient + holographic sheen + official Visa italic SVG)
  - **Mastercard** (Matte carbon obsidian finish + dual red/orange translucent circles SVG)
  - **American Express** (Brushed titanium/platinum + dashed guilloche frame + 4-6-5 layout)
  - **Discover** (Deep charcoal + warm radiant orange solar flare)
  - **RuPay** (Midnight teal + dynamic saffron & green speed arrows)
- **Luhn Checksum Algorithm (Modulo 10)**: Strict mathematical verification adhering to ISO/IEC 7812.
- **Interactive 3D Card**: Parallax coordinates tilt on hover, with a 180° flip animation revealing the magnetic strip and CVV panel on CVV field focus.
- **Validation Breakdown Card**: Transparent glass result panel detailing valid length, numeric format, Mod 10 checksum pass/fail, and detected network.
- **1-Click Test Presets**: Test cards for Visa, Mastercard, Amex, Discover, RuPay, and invalid checksums for instant verification.
- **100% Client-Side & Air-Gapped**: Zero server transmission, zero database logging, and zero tracking cookies.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Modern pure CSS, CSS Custom Properties, Backdrop Filter (`blur`), 3D Transforms
- **Testing**: Vitest, JSDOM (45/45 unit tests passing)
- **Compliance**: ISO/IEC 7812 standard identification

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/itsmothi/FSWDCBP_Project.git
cd FSWDCBP_Project/smart-checkout
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Run automated test suite
```bash
npm test
```

### 5. Production build
```bash
npm run build
```

---

## 🔒 Security & Privacy Notice

This application is designed for client-side mathematical verification, academic demonstration, and testing purposes only. No real payment authorization or monetary transactions are performed. No sensitive financial credentials are transmitted across the network or stored.
