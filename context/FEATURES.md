# FEATURES.md

<!--The living feature table and the verification record. Copy in from HW3 and extend.-->

## Features

| Feature | Kano | Status |
|---|---|---|
| *Category-Based Ranking* | *Must-be* | *Not yet built* |
| *Text Reviews* | *Must-be* | *Built (HW3), server-backed (HW4)* |
| *Upload/Sharing* | *Performance* | *Not yet built* |
| *"Traveled with"* | *Attractive* | *Not yet built* |
| *Activity Feed* | *Indifferent* | *Not yet built* |
| *In-App Photo Editing* | *Indifferent* | *Not yet built* |

## Acceptance criteria (EARS)

- THE SYSTEM SHALL return all entries in creation order.
- WHEN a valid entry is submitted, THE SYSTEM SHALL store it and confirm.
- IF the entry text is missing, THEN THE SYSTEM SHALL reject it and say why.
- IF the server cannot be reached, THEN THE SYSTEM SHALL tell the user on the page.
- IF the entry text is empty or contains only whitespace, THEN THE SYSTEM SHALL reject it and say why.

## Verification

<!--Walk every statement against the deployed page. PASS, FAIL, CANNOT TEST YET, or DEFERRED, with a reason.-->

| Statement | HW3 verdict | HW4 verdict | Reason |
|---|---|---|---|
| Return entries in order | PASS | PASS | |
| Store valid entry | PASS | PASS | |
| Reject missing text | PASS | PASS | |
| Survive cleared cache | CANNOT TEST YET | PASS | Loaded the page from a private window with no local data and the review text loaded from D1 via the Worker, not localStorage. |
| Server unreachable | | CANNOT TEST YET | I don't yet have a reliable way to simulate a true network outage from inside Codespaces. |
| Server returns 500 | | PASS | |
| Second client writes to the same table | | DEFERRED | ADR-002 says so |
