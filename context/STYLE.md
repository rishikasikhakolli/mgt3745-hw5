---
# Tokens: what a machine reads. Replace every value with one pulled from the
# interface you admire. Guess the hex; precision is HW5's problem.
color-primary: "#DD2A7B"
color-accent: "#00C853"
color-background: "#FFFFFF"
color-text: "#1A1A1A"
font-body: "Roboto"
font-heading: "Georgia"
# font-size-min: 14px
# space-unit: 8px
# radius: 4px
---


# STYLE.md

## Rationale

- **color-primary**: Bright colors draws eyes directly to buttons and unread Story rings so key actions pop against the plain background. Most of Instagram's demographic appreciate pops of color and are enthralled by it.
- **color-accent**: The green is used for different things highlighted (close friends). In addition, the blue of @ mentions pops against the black text more commonly seen.
- **color-background**: A plain white canvas keeps every photo the loudest thing on the page, the way Instagram's feed never competes with its own chrome.
- **color-text**: Near-black instead of pure black is easier to read for long review paragraphs without feeling harsh.
- **font-body**: The body text is very clean and easy to read, no fluff.
- **font-heading**: A serif heading gives the app a slightly more editorial, travel-journal feel than the sans-serif body text, without pulling in an extra font file to load.
- **font-size-min**: Text is legible to most people, it is probably a uniform studied size that is appropriate for the general audience.
- **space-unit**: Margins and grid spacing is all uniform.
- **radius**: Soft corners feel calmer and more casual than sharp edges, matching a travel-diary tone instead of a business one.

## Contrast (checked against WebAIM's contrast checker)

- `color-text` on `color-background`: **17.4:1** — passes for body text everywhere.
- `color-primary` used as text/button color against white: **4.47:1** — just under the 4.5:1 body-text minimum. Restricted to accents only: large bold headings (h1, review card titles) and short button/chip labels, never body paragraphs.
- `color-accent` as text or paired with white: **2.24:1** — fails outright, even for large text. Restricted to background-only use, always under `color-text`, never used as a foreground color.
- `color-text` on `color-accent` background: **7.78:1** — passes; this is the only way `color-accent` is used (success-message background).

## Refusals

1. No small or confusing buttons. ***Breaks:** Fitts's Law because small buttons increase errors and make buttons harder to hit fast.*
2. No cluttered sidebars packed with numerous buttons. ***Breaks:** Hick's Law by overwhelming users with competing choices.*
3. No hidden or confusing layout changes. ***Breaks:** Jakob's Law by ignoring consistent design patterns users expect.*

## Sources

- **Admired:** Instagram
<img width="150" alt="IMG_2598" src="https://github.com/user-attachments/assets/02629a22-4e03-4f90-b7c4-fbd050261620" />

- **Resented:** Reddit
<img width="150" alt="IMG_2599" src="https://github.com/user-attachments/assets/7b8d38e4-1cca-4594-874b-cab3f0cb30a7" />
