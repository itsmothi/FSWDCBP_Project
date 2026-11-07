# 💳 Smart Checkout — Intelligent Payment Interface

A professional, responsive payment form demonstration featuring real-time card network detection, Luhn algorithm validation, and dynamic input masking.

![Demo Screenshot](https://via.placeholder.com/800x450?text=Smart+Checkout+UI+Demo)

## 🚀 Live Demo
[Link to your deployed site here]

## ✨ Key Features

### 1. Real-Time Card Detection
The form automatically identifies the card network as the user types by analyzing the **Issuer Identification Number (IIN)**.
- **Supported Networks**: Visa, Mastercard, American Express, Discover, and RuPay.
- **State-Based UI**: Distinguishes between `incomplete`, `recognized`, and `unknown` states to provide immediate feedback.

### 2. Luhn Checksum Validation
Implements the **Luhn Algorithm** (Mod 10) to verify the mathematical validity of the card number.
- **Logic**: 
  1. Double every second digit from the right.
  2. If the result is > 9, subtract 9.
  3. Sum all digits.
  4. If `sum % 10 === 0`, the number is valid.
- **Note**: This verifies the checksum only; it does not check if the card is active or authorized.

### 3. Dynamic Input Masking
Enhances UX by automatically grouping digits based on the detected network:
- **Visa/Mastercard/Discover**: `4-4-4-4` grouping.
- **American Express**: `4-6-5` grouping.
- **Real-time Normalization**: Formatting characters are stripped before any validation logic is applied.

### 4. High-Fidelity UI/UX
- **Glassmorphism Design**: Semi-transparent, blurred containers for a modern FinTech feel.
- **Interactive Card Preview**: A 3D card that reflects input live and flips to show the CVV section when the CVV field is focused.
- **Dynamic Loading**: A sleek splash screen for application initialization.

## 🛠️ Technical Stack

- **Framework**: React 18 + Vite
- **Styling**: Modern CSS (Custom Properties, Glassmorphism, Flexbox/Grid)
- **Testing**: Vitest + JSDOM
- **Architecture**: Modular utility-first approach to decouple business logic from UI components.

## 📂 Project Structure

```text
smart-checkout/
├── src/
│   ├── components/      # UI Components (PaymentForm, CardPreview, etc.)
│   ├── utils/           # Pure Logic (Luhn, Detection, Masking, Validation)
│   ├── styles/          # Global and Component Styles
│   └── App.jsx          # Root Component
├── tests/               # Unit Tests for all utilities
└── README.md            # Documentation
```

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd smart-checkout
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Run automated tests**:
   ```bash
   npm test
   ```

## 🔒 Security & Privacy Note

This project is a **simulated checkout demo**. 
- **No real payment processing** occurs.
- **No sensitive data** is stored, logged, or transmitted to any server.
- **Data Privacy**: All inputs are handled purely in the browser's memory and are cleared upon page refresh.
