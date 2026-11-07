# Design Specification — Halo Checkout

> **Project:** Client-Side Payment Form with Card Network Detection, Luhn Checksum Validation and Real-Time Input Masking  
> **Design direction:** Premium fintech, calm editorial typography, tactile cards, subtle motion, and highly legible validation feedback.  
> **Reference inspiration:** The Halo / USD Halo landing-page brief supplied for this project. This adapts its visual language to a payment-form experience rather than copying its stablecoin content.

---

## 1. Product Vision

Create a portfolio-quality payment UI that feels like a refined fintech product instead of a standard checkout form. The page should combine a strong editorial hero, a live card preview, a collection of card-network and feature cards, and a practical validation playground.

The visual style should feel:

- **Premium and minimal:** off-white canvas, confident black typography, generous whitespace.
- **Tactile:** rounded panels, crisp card edges, tasteful depth, restrained animations.
- **Technical but approachable:** visible network detection and validation states without overwhelming the user.
- **Trustworthy:** clear field labels, calm error messages, accessible contrast, and an explicit demo-only payment flow.

This project simulates a checkout experience. It must never suggest that a real payment was authorized or processed.

## 2. Technology and Global Design Tokens

### Stack

- React + TypeScript + Vite
- Tailwind CSS
- `lucide-react` for icons
- No additional UI component libraries
- CSS keyframes and transitions for animation

### Colors

| Token | Value | Intended use |
|---|---|---|
| Canvas | `#F5F5F5` | Global page background |
| Ink | `#101010` | Headlines, primary text, primary buttons |
| Muted ink | `#696969` | Supporting copy, descriptions |
| Border | `#DEDEDE` | Card outlines, dividers, field borders |
| White | `#FFFFFF` | Form panels, input backgrounds, icon circles |
| Plum | `#2B2644` | Dark feature cards and selected states |
| Mint | `#CFF5DE` | Valid/ready status accents |
| Amber | `#F5DDA8` | Incomplete or attention-needed states |
| Rose | `#F5D6D6` | Validation errors |
| Focus | `#3267E8` | Visible keyboard focus ring |

Use colors intentionally. Avoid turning every card into a different bright color. The main palette is off-white, black, white, and plum; mint, amber, and rose are reserved for semantic status feedback.

### Typography

Use **TT Norms Pro** when the font files are available:

```css
@font-face {
  font-family: "TT Norms Pro";
  src: url("/fonts/tt-norms-pro-regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "TT Norms Pro";
  src: url("/fonts/tt-norms-pro-semibold.woff2") format("woff2");
  font-weight: 600;
  font-display: swap;
}

html,
body {
  font-family: "TT Norms Pro", Inter, ui-sans-serif, system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}
```

Use a fallback stack if the font files are not included. Do not commit font files unless you have the rights to distribute them.

Typography rules:

- Large headings: medium or semibold, tight letter spacing (`-0.03em` to `-0.05em`).
- Body copy: regular weight, relaxed line-height.
- Labels and field hints: compact, high contrast, and easy to scan.
- Avoid using extra-heavy font weights throughout the page.

### Layout

- Page background: `#F5F5F5`.
- Shared section container: `max-w-[88rem] mx-auto`.
- Main horizontal page padding: `px-6`, increasing slightly on very wide layouts.
- Section spacing: generally `py-20` to `py-28` on desktop and `py-14` to `py-16` on mobile.
- Card corners: `rounded-2xl` for standard cards, `rounded-3xl` for large feature panels, and `rounded-full` for pill buttons.
- Use consistent `gap-4` for card grids and `gap-8` or `gap-12` for editorial layouts.

---

## 3. Page Composition

Render the following sections in order:

1. Navbar + Hero Checkout
2. Card-Network Marquee
3. “A smarter way to validate” feature cards
4. Card Network Explorer
5. Validation Playground
6. Checkout States Showcase
7. Security and Limitations
8. Footer

The first viewport should immediately communicate the product and show the card form. The rest of the page reveals the logic and polish behind the experience.

---

## 4. Navbar

**Position:** absolute over the hero, `top-0 left-0 right-0 z-20`.  
**Padding:** `px-6 py-5`.  
**Layout:** `flex items-center justify-between`.

### Left side

- Custom simple mark made from two interlocking rounded-square outlines, or a minimal abstract card/halo symbol.
- Wordmark: **Halo Checkout**.
- Icon dimensions around `w-7 h-7`; wordmark around `text-xl` or `text-2xl`.
- Use black on the light hero area.

### Center links

Visible from `md` upwards:

- Overview
- Card Networks
- Validation Lab
- Security

Use `gap-7` or `gap-8`, medium text, muted gray, and a subtle hover transition to black.

### Right side

A black pill button labelled **Try the demo** with white text. It scrolls to or focuses the checkout form. Do not label a client-side demo button “Pay now” unless it is within the clearly simulated submit flow.

---

## 5. Hero Section — “Your card. Understood.”

### Outer layout

- First section: `min-h-screen` or `h-screen` on desktop, `flex flex-col overflow-hidden`.
- Hero content: `flex-1 px-6 pt-24 pb-6 flex items-end`.
- Inner hero surface: `relative w-full min-h-[680px] overflow-hidden rounded-2xl` on desktop. Use a sensible minimum height on shorter screens rather than forcing the content to crop.
- Background: a softly animated abstract gradient, blurred metallic shapes, or a supplied licensed motion background. Keep it subdued so the form remains the focus.
- Add a light overlay if needed to retain readable black text.

### Two-column hero content

Use a responsive layout:

- Left: headline, explanatory copy, primary action, short trust/support line.
- Right: live payment-card preview and checkout form panel.
- On mobile, stack content with the live preview first or immediately above the form. Avoid horizontal overflow.

### Left content

Eyebrow label: `SMART CHECKOUT / CLIENT-SIDE DEMO` in small uppercase text with tracking.

Headline:

> Your card.  
> **Understood.**

Style: `text-5xl md:text-7xl`, medium/semi-bold, `leading-[0.98]`, `tracking-[-0.045em]`, max width around `620px`.

Supporting paragraph:

> A smarter payment-form experience with instant card-network detection, checksum validation, and formatting that keeps up as you type.

Style: `text-base md:text-lg`, muted black, max width around `460px`, generous line height.

Primary button: **Explore the demo** with a circular white arrow icon at the end. Black pill, white text, subtle hover transition. Clicking it scrolls to the payment form or focuses the card-number field.

Secondary detail line: `No real payment is made · Test data only` in subdued, readable text.

### Right content — live card and form

Create one large white translucent or solid-white panel with a subtle border and gentle shadow. It should feel like a product UI, not a dashboard full of tiny controls.

Inside the panel:

1. **Live card preview** at the top.
2. Card network label and a small status pill.
3. Cardholder name, card number, expiry, and CVV fields.
4. Inline validation feedback and a simulated submit button.

Desktop panel can be about `min(100%, 560px)` wide. Use enough spacing so the card preview does not feel cramped.

### Card preview styling

- Aspect ratio close to `1.586 / 1` (standard bank-card proportions).
- Use a visual card surface with `rounded-2xl`, consistent padding, and restrained shadow.
- Choose a neutral base design with a soft gradient or subtle abstract geometry. Do not rely on network logos alone to communicate the network.
- Display a chip illustration using CSS/SVG if desired.
- Show only entered digits in the preview; use bullets for the remaining digits.
- Update the preview live with holder name, formatted number, and expiry.
- When the CVV field is focused, optionally flip the card to a generic back view. Keep motion short and respect `prefers-reduced-motion`.
- Never show or preserve a real CVV in any persistent state, log, or screenshot.

---

## 6. Card-Network Marquee

Place a slim marquee beneath or just after the hero content to add the editorial brand-row feeling from the inspiration.

### Content

Use text labels or local vector assets for supported networks, for example:

- Visa
- Mastercard
- American Express
- Discover
- RuPay

Only show network names that the implementation actually supports. Do not use external brands in a way that implies partnership or endorsement.

### Visual behavior

- Container: `mt-12 w-full overflow-hidden`.
- Track: `flex w-max` and duplicate the list exactly once for seamless looping.
- Animation duration: around `24s`, linear, infinite.
- Each item: `mx-7 shrink-0 whitespace-nowrap text-black/55`.
- Pause the animation on hover if useful; ensure this does not interrupt keyboard access.
- Hide overflow horizontally and avoid rendering a visible scrollbar.
- Respect `prefers-reduced-motion` by disabling the marquee or presenting a static row.

---

## 7. Intro Section — “Validation, without the guesswork.”

**Background:** `#F5F5F5`.  
**Spacing:** `px-6 py-24`.

### Top row

Two-column grid on desktop and one-column stack on mobile.

Left:

- Heading: `Validation, without the guesswork.`
- Black pill button: **See how it works** with a white circular arrow.

Right:

> Every field responds with useful feedback, while the logic behind card detection, formatting, and validation stays modular and testable.

Use large, calm typography around `text-xl md:text-2xl` for the paragraph.

### Feature card grid

Use a 4-column layout at large breakpoints with cards of varying span to create a curated, editorial composition. Recommended layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`.

#### Card 1 — Real-time card recognition

- Span two columns on large screens.
- Use a warm abstract image/texture or a neutral gradient as the card background.
- Title: **Recognized as you type**
- Body: `Identify supported networks from the number prefix and length rules, with a clear state when the input is incomplete or unknown.`
- Add a small network label row, but do not duplicate real card numbers in the card.

#### Card 2 — Luhn checksum

- Background: plum `#2B2644`.
- Heading in white: **Checks the checksum.**
- Body in white/70: `Confirm number structure with the Luhn algorithm—not card ownership, funds, or authorization.`
- Optional decorative checksum digits, using fake/example values only.

#### Card 3 — Adaptive masking

- Background: plum `#2B2644` or white with a fine border.
- Heading: **Formatted in real time.**
- Body: `Group digits for readability while handling typing, deletion, and pasted input.`
- Include a before/after sample with clearly fake placeholders, not actual personal payment data.

#### Card 4 — Built for edge cases

- White surface, subtle border.
- Heading: **Test beyond the happy path.**
- Body: `Explore incomplete input, unsupported prefixes, invalid checksums, and expired dates.`

Each card uses `rounded-2xl`, `p-7`, and a consistent minimum height. Use `flex flex-col justify-between` to align headings and descriptions naturally.

---

## 8. Card Network Explorer

This is a more interactive, card-heavy showcase. Use it to turn card detection into something visible and understandable.

### Section header

Eyebrow: `NETWORK EXPLORER`  
Heading: **One form. Multiple card patterns.**  
Description: `See how prefixes, supported lengths, and formatting rules affect the form state.`

### Network card gallery

Use a responsive card grid: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4`.

Create one tile for each supported network. Each tile should contain:

- Network name and a simple mark or typographic treatment.
- A generic, masked example pattern such as `•••• •••• •••• 1234`.
- The expected grouping style.
- A small status such as `Supported`, `Partial match`, or `Not selected`.
- A **Try this pattern** action using predefined test input—not real card data.

Keep network details in a configuration object in the app. Avoid copying prefix logic into individual cards. Make it visually obvious that the gallery is a demo of detection rules, not a guarantee of card authenticity.

### Interaction

When a user selects a card-network tile:

1. Load a predefined test value into the form.
2. Update the live preview and detected network label.
3. Show the expected grouping and validation state.
4. Allow the user to edit the value freely afterward.

All test values must be labeled as test data and must not be saved between sessions.

---

## 9. Validation Playground

Create a dedicated interactive area with a large dark/light split panel, inspired by the large editorial feature panel in the reference.

### Layout

Desktop: two columns.  
Mobile: stacked blocks.

Left column:

- Eyebrow: `VALIDATION LAB`
- Heading: **Know what passed—and why.**
- Paragraph: `Inspect the individual checks without hiding the limits of client-side validation.`
- Small note: `Demo only · No gateway connection`

Right column:

A large rounded panel containing a checklist of validation checks:

- Network pattern detected
- Supported card length
- Luhn checksum
- Expiry date
- CVV format
- Required fields complete

Each check has a neutral icon and one of these statuses:

- `Not checked` — gray
- `Needs input` — amber
- `Passed` — mint
- `Failed` — rose

Each status must include text or an icon label; color alone must not convey its meaning.

### Explanation drawer

When the user clicks a check row, reveal a one- or two-sentence explanation. Examples:

- **Luhn:** `The checksum is consistent with the Luhn algorithm. This does not verify that the card exists or can be charged.`
- **Network:** `The entered prefix matches a supported pattern. Network detection can be ambiguous until more digits are entered.`
- **Expiry:** `The month and year form a valid, non-expired date.`

### Test case selector

Include predefined cases such as:

- Incomplete number
- Invalid checksum
- Unknown network
- Expired date
- Complete form format

Do not use labels such as “real card” or “approved transaction” for local test cases.

---

## 10. Checkout States Showcase

Display the application's major UI states as a row or grid of preview cards, so the portfolio page feels substantial and communicates careful interaction design.

Use 2 columns on medium screens and 3 columns on wide screens, with `gap-4`.

### State cards

1. **Empty** — neutral fields, no errors shown before interaction.
2. **Typing** — live preview updates and digits group as expected.
3. **Needs attention** — a concise inline message explains the issue.
4. **Ready for demo** — all client-side checks pass; state explicitly that validation is not authorization.
5. **Processing demo** — short loading state, button disabled to prevent repeat submission.
6. **Demo complete** — success or failure simulation with a clear “No payment was made” note.

Cards should use white backgrounds with borders, subtle shadows, and consistent padding. Highlight only the active state; do not show all states as if they are simultaneously happening in the live form.

---

## 11. Security and Limitations Section

Create a straightforward trust section with a large headline and three compact cards.

Headline: **A clear demo. Honest boundaries.**

Cards:

### Client-side by design

`The interface demonstrates UI behavior and validation utilities only. It is not connected to a payment processor.`

### Checksum is not authorization

`A passing Luhn check cannot establish that a card is active, belongs to the user, has funds, or can be charged.`

### Test data only

`Do not enter real payment credentials. The demo must never store card numbers or CVVs in localStorage, cookies, analytics, or console logs.`

Use a minimal icon above each heading. Keep the language accurate and avoid claiming PCI compliance.

---

## 12. Footer

Use a final understated footer on the off-white background, separated by a thin border.

Left:

- Logo mark + `Halo Checkout`
- Caption: `A client-side payment UI study.`

Right:

- `Back to top`
- `View source`
- `Demo only`

Add a small note: `No real payments are processed by this project.`

---

## 13. Motion and Interaction Rules

Use motion to clarify interaction, not distract from the form.

- Buttons: `transition-colors duration-200`, black to charcoal on hover.
- Nav links: transition muted gray to black.
- Card preview: update content immediately; animate only subtle background or flip effects.
- Validation: use a short fade/slide for messages, around `150–220ms`.
- Marquees: `22–26s linear infinite` with duplicated tracks for a seamless loop.
- Focus: clear outline or ring; never remove keyboard focus styles.
- Loading: small spinner or short progress animation during the simulated processing step.
- Reduced motion: disable or simplify non-essential animation under `prefers-reduced-motion: reduce`.
- Avoid parallax, excessive glassmorphism, flashing status changes, or animations that delay form use.

---

## 14. Responsive Behavior

### Desktop (`lg` and above)

- Full editorial hero with two columns.
- Live card and form side-by-side with the headline.
- Four-column feature grid and three-column network gallery.
- Generous outer margins and large typography.

### Tablet (`md`)

- Keep two-column hero where there is sufficient room; otherwise stack.
- Feature cards become two columns.
- Navigation links may reduce in spacing or collapse behind a simple menu.

### Mobile (below `md`)

- Navbar shows logo and one primary action; links use a small accessible menu if needed.
- Hero content and form stack vertically.
- Headline scales to avoid clipping.
- All fields and buttons use comfortable tap targets (around 44px minimum height).
- Card gallery and state cards use one column or two narrow columns only if content remains readable.
- Disable marquee motion if it causes distraction or poor performance.
- No sideways scrolling at a viewport width of 320px.

---

## 15. Accessibility Requirements

- Use semantic headings and landmarks (`nav`, `main`, `section`, `footer`).
- Associate each input with a persistent visible label.
- Provide `aria-describedby` for hints and validation messages.
- Announce meaningful validation changes with a restrained `aria-live` region.
- Support keyboard navigation for every interactive item.
- Provide visible focus styles and maintain adequate contrast.
- Do not rely on color alone for pass/fail states.
- Respect reduced-motion preferences.
- Do not make the marquees the only way to access brand/network names.

---

## 16. Component Map

Suggested React components:

```text
App
├── Navbar
├── HeroSection
│   ├── HeroCopy
│   ├── LiveCardPreview
│   └── PaymentForm
│       ├── FormField
│       ├── CardNumberField
│       └── ValidationSummary
├── NetworkMarquee
├── FeatureSection
│   └── FeatureCard
├── CardNetworkExplorer
│   └── NetworkCard
├── ValidationPlayground
│   ├── ValidationCheckRow
│   └── TestCaseSelector
├── CheckoutStatesSection
│   └── CheckoutStateCard
├── SecuritySection
└── Footer
```

Keep business logic in standalone utility modules, not in presentational cards:

```text
src/
├── components/
├── sections/
├── utils/
│   ├── card-detection.ts
│   ├── luhn.ts
│   ├── input-mask.ts
│   └── validation.ts
├── data/
│   ├── card-networks.ts
│   └── test-cases.ts
├── styles/
│   └── index.css
├── App.tsx
└── main.tsx
```

Suggested utility responsibilities:

- `card-detection.ts`: supported network metadata and prefix/length matching.
- `luhn.ts`: pure Luhn checksum validation.
- `input-mask.ts`: digit normalization, grouping, and display formatting.
- `validation.ts`: expiry, field requirements, and combined readiness result.
- `card-networks.ts`: UI metadata for supported networks.
- `test-cases.ts`: safe, predefined demonstration values and expected states.

---

## 17. Definition of Done

- [ ] The hero communicates the product within the first viewport.
- [ ] The live preview responds to form input.
- [ ] Network detection includes incomplete and unknown states.
- [ ] Luhn and format validation are separate, testable functions.
- [ ] Input masking behaves correctly while typing, deleting, and pasting.
- [ ] The page has a substantial card gallery without feeling crowded.
- [ ] Validation Playground explains why checks pass or fail.
- [ ] The checkout completion is explicitly simulated.
- [ ] Mobile layout works without horizontal overflow.
- [ ] Keyboard navigation, visible focus, and accessible error messages work.
- [ ] Automated tests cover core logic and important edge cases.
- [ ] No real card credentials are persisted or logged.
- [ ] The README explains setup, architecture, limitations, and test commands.

## 18. Design North Star

**Make the UI feel premium, while making the validation logic feel transparent.** Use the inspiration's calm off-white canvas, bold editorial headline, rounded card compositions, marquee rows, and restrained plum accents—but make the actual payment form the hero. Every supporting card should explain a real project capability or make an interaction easier to understand.
