# EVALS.md

The verification table from HW3, grown up. Five sections, in this order.
The first two are written and committed BEFORE any tool sees the spec.

## 1. RAT statement
<!-- One sentence. The assumption that, if false, makes this build pointless,
     and what would show it is false. -->
The riskiest assumption is that bolt.new will save the category through my Worker/D1 backend instead of faking it in the browser; I'll know this is false if the category disappears on reload, or if bolt's code stores it somewhere other than the Worker.

## 2. Prediction Stake (before build, 09/29/26 @ 6 PM)
<!-- At least one of each. Never edit the prediction text; add resolutions below it. -->
- **Tight:** At least 3 of 7 EARS rows will pass on the tool's first output.
  - Resolved 2026-09-29: 5 of 7.
- **Loose:** bolt will follow STYLE.md tokens better than AI Studio.
  -   - Resolved 2026-09-29: bolt matched 7 of 8 STYLE.md tokens exactly while AI Studio renamed them and matched only 4.
- **Open:** The tool will introduce a dependency I did not ask for. Resolves when I read package.json.
  - Resolved 2026-09-29: False. No dependency added — bolt's export used only vanilla DOM APIs (fetch, FileReader, querySelectorAll), package.json unchanged.

## 3. Success criteria
| EARS row (feature) | Checked by | Where |
|---|---|---|
| WHEN a review is saved, THE SYSTEM SHALL prompt the user to select a category from {Food, Landmark, Views, Activity}. | human | README, See It Work |
| THE SYSTEM SHALL store the selected category with its entry and display it on the review card. | test | [`evals/worker.test.js#L40`](evals/worker.test.js#L40) |
| WHEN the user selects a filter, THE SYSTEM SHALL display only entries matching that category. | human | README, See It Work |
| IF the category is missing or outside the allowed set, THEN THE SYSTEM SHALL reject it with a 400 naming the allowed categories. | test | [`evals/worker.test.js#L54`](evals/worker.test.js#L54) |
| WHEN no filter is selected, THE SYSTEM SHALL display entries from all categories. | judgment | [`docs/JUDGEMENT.md#L19`](docs/JUDGEMENT.md#L19) |
docs/JUDGMENT.md #10 |

## 4. Error-analysis log
<!-- Every failure observed, a few words each, counted, sorted by count. -->
| Failure (a few words) | Count | Source | Category |
|---|---|---|---|
| Buttons used its own blue, not color-primary | 2 | bolt, AI Studio | STYLE |
| | | | |

## 5. Evals
- **Code:** `npm test` with `API=<worker url>`; _ tests, _ passing. Screenshot in README.
- **Judgment:** docs/JUDGMENT.md, _ questions, two graders, agreement _%.

## Verification table (carried from HW4)
<!-- Paste your HW4 verification table here; it is the ancestor of section 3. -->
