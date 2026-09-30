# SKILLS.md

Reusable patterns and delegation guidance, written so an agent (or a
stranger) could apply them next time. Each entry under fifteen lines.
Load-on-demand: an agent reads the heading first and the body only when relevant.

## Pattern: fetch with the failure shown on the page
**When:** any call from app.js to the Worker.

**Do:** check `res.ok`; on failure, read `res.text()` and put it in the
status element with `textContent`; wrap the call in try/catch for network
errors; never throw to the console.

**Because:** localStorage never failed; the network does (ADR-002).

### Delegation guidance: what to paste, what to check first
**Paste, in order:** PROJECT, FEATURES (rows marked), STYLE, STANDARDS, TOOLS, then the current page files. One instruction line naming the files it may touch.

**Check first:** the diff's file list, then innerHTML / concatenated SQL, then whether it used the tokens.

**Reliably wrong (this week):** discarded the existing Worker/D1 backend and rebuilt storage in localStorage when the pasted app.js was empty; renamed and matched style.css and STYLE.md tokens.



## Pattern: category must be selected before submit, not after
**When:** a field needs server-side validation on the same request as the rest of the entry.

**Do:** put the selector in the form itself and block submit if it's empty, rather than a post-save modal.

**Because:** both bolt and AI Studio built a post-save prompt, and it broke the moment category became a required, validated column.

## Delegation guidance: category selection had to move before submit
**Paste, in order:** the feature spec naming exactly which endpoint the new field goes through, so the tool knows it can't add a field without also touching the request that saves it.

**Check first:** whether the delegated field needs server-side validation alongside data already being saved, a tool defaulting to "prompt after save" can't work if so, since there's no endpoint to update a field after the row already exists.

**Reliably wrong (this week):** AI Studio built a modal that prompts for category after the review is saved, not anticipating the Worker would validate it on the same request as the rest of the entry.
