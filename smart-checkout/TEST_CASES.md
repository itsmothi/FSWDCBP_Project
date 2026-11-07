# 🧪 Test Suite: Smart Checkout Payment Form

This document outlines the comprehensive test cases for the Smart Checkout application to ensure validation accuracy, UI responsiveness, and a professional user experience.

---

## 1. Happy Path (Successful Flows)
These cases verify that valid data for different networks is accepted and leads to the success screen.

| Scenario | Cardholder Name | Card Number | Expiry Date | CVV | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Visa Valid** | Jane Doe | `4111 1111 1111 1111` | `12/30` | `123` | ✅ Valid $\rightarrow$ Success |
| **Amex Valid** | John Smith | `3400 000000 00000` *(or `3400 000000 00009`)* | `05/28` | `1234` | ✅ Valid $\rightarrow$ Success |
| **Mastercard Valid** | Alice Wonder | `5100 0000 0000 0000` *(or `5100 0000 0000 0008`)* | `08/27` | `456` | ✅ Valid $\rightarrow$ Success |
| **RuPay Valid** | Rajesh Kumar | `6521 1111 1111 1110` | `09/29` | `789` | ✅ Valid $\rightarrow$ Success |

---

## 2. Negative Cases (Validation Failures)
These cases verify that the form correctly identifies and reports errors.

### A. Card Number Validation
| Test Case | Input Value | Expected Error Message |
| :--- | :--- | :--- |
| **Checksum Failure** | `4111 1111 1111 1112` | "Invalid card number (checksum failed)." |
| **Unsupported Network** | `9999 9999 9999 9999` | "Invalid card number or unsupported network." |
| **Incomplete Input** | `4111` | "Invalid card number or unsupported network." |
| **Empty Field** | ` ` | "Card number is required." |

### B. Expiry Date Validation
| Test Case | Input Value | Expected Error Message |
| :--- | :--- | :--- |
| **Expired Card** | `01/20` | "Card has expired." |
| **Invalid Format** | `12-2025` | "Use MM/YY format." |
| **Invalid Month** | `13/25` | "Use MM/YY format." |
| **Empty Field** | ` ` | "Expiry date is required." |

### C. CVV Validation
| Test Case | Network | Input Value | Expected Error Message |
| :--- | :--- | :--- | :--- |
| **Wrong Length (Visa)** | Visa | `1234` | "CVV must be 3 digits." |
| **Wrong Length (Amex)** | Amex | `123` | "CVV must be 4 digits." |
| **Non-Digits** | Any | `12A` | "CVV must contain only digits." |
| **Empty Field** | Any | ` ` | "CVV is required." |

---

## 3. Edge Cases & UX Behavioral Testing
These cases verify the "intelligence" of the UI and the quality of the user experience.

| Scenario | Action | Expected Behavior |
| :--- | :--- | :--- |
| **Amex Masking** | Type `34` $\rightarrow$ digits | Formatting automatically switches to `4-6-5` pattern. |
| **Visa Masking** | Type `4` $\rightarrow$ digits | Formatting remains in `4-4-4-4` pattern. |
| **The Flip** | Focus the **CVV** field | Card preview smoothly rotates 180° to show the back. |
| **The Un-Flip** | Focus **Card Number** | Card preview rotates back to the front. |
| **Paste Handling** | Paste `4111222233334444` | Form automatically masks to `4111 2222 3333 4444`. |
| **Bulk Validation** | Click "Pay Now" (empty) | All required fields trigger error messages simultaneously. |
| **Responsiveness** | Resize to < 480px | Layout switches to a single-column mobile stack. |
| **Loading Screen** | Refresh Page | Loader appears for 2s before the main form fades in. |

---

## 4. Testing Checklist
- [ ] All Happy Path cases result in success.
- [ ] All Negative cases show correct inline errors.
- [ ] Card flip animation triggers on CVV focus.
- [ ] Amex vs Visa masking is distinct.
- [ ] Expiry date correctly identifies past dates.
- [ ] Layout is responsive on mobile view.
