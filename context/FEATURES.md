# FEATURES.md

<!--The living feature table and the verification record. Copy in from HW3 and extend.-->

## Features

| Feature | Kano | Status |
|---|---|---|
| Category-Based Ranking | Must-be | Built (HW5) |
| Text Reviews | Must-be | Built (HW3), server-backed (HW4) |
| Upload/Sharing | Performance | Not yet built |
| "Traveled with" | Attractive | Not yet built |
| Activity Feed | Indifferent | Not yet built |
| In-App Photo Editing | Indifferent | Not yet built |

## Acceptance criteria (EARS)
- THE SYSTEM SHALL return all entries in creation order.
- WHEN a valid entry is submitted, THE SYSTEM SHALL store it and confirm.
- IF the entry text is missing, THEN THE SYSTEM SHALL reject it and say why.
- IF the server cannot be reached, THEN THE SYSTEM SHALL tell the user on the page.
- IF the entry text is empty or contains only whitespace, THEN THE SYSTEM SHALL reject it and say why.

*HW5 — Category-Based Ranking, delegated to bolt.new*
- WHEN a review is saved, THE SYSTEM SHALL prompt the user to select a category from {Food, Landmark, Views, Activity}.
- THE SYSTEM SHALL store the selected category with its entry and display it on the review card.
- WHEN the user selects a filter, THE SYSTEM SHALL display only entries matching that category.
- IF the category is missing or outside the allowed set, THEN THE SYSTEM SHALL reject it naming the allowed categories.
- WHEN no filter is selected, THE SYSTEM SHALL display entries from all categories.

## Verification

<!--Walk every statement against the deployed page. PASS, FAIL, CANNOT TEST YET, or DEFERRED, with a reason.-->

| Statement | HW3 verdict | HW4 verdict | Reason |
|---|---|---|---|
| Return entries in order | PASS | PASS | PASS | |
| Store valid entry | PASS | PASS | PASS | |
| Reject missing text | PASS | PASS | PASS | |
| Survive cleared cache | CANNOT TEST YET | PASS | PASS | Loaded the page from a private window with no local data and the review text loaded from D1 via the Worker, not localStorage. |
| Server unreachable | CANNOT TEST YET | | | I don't yet have a reliable way to simulate a true network outage from inside Codespaces. |
| Server returns 500 | | PASS | | |
| Second client writes to the same table | | DEFERRED | DEFERRED | ADR-002 says so |
| Category prompt appears before save completes | | | PASS | Verified in live server |
| Category saved and displayed on card | | | PASS | Verified in live server |
| Filter narrows the list correctly | | | PASS | Verified in live server |
| Invalid/missing category rejected with 400 | | | PASS | xx |
