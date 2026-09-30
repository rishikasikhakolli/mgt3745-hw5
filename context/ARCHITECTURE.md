# ARCHITECTURE.md

Decisions, in order. An ADR is never edited after it is accepted; it is superseded.

## The Gate: HW4 rerun

Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|---|
| Cost to start | 5 | 5 | 4 | 5 |
| Cost to maintain | 4 | 5 | 2 | 5 |
| Time to working | 4 | 4 | 4 | 5 |
| Inspectability | 5 | 5 | 1 | 2 |
| Switching cost | 3 | 4 | 2 | 3 |
| Fit to spec | 4 | 5 | 3 | 3 |
| **Weighted total** | | **118** | **70** | **88** |

*Weights kept the same as HW3. Switching cost (Build: 4) is scored from actual experience now, not
speculation. Moving off Cloudflare D1 would mean `wrangler d1 export` plus rewriting one Worker file.*

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Accepted
**Supersedes:** ADR-001

### Context
Data that leaves the browser includes the contents of the review submission, timestamp, and metadata. The vendor is Cloudflare. It would be under Cloudflare's terms for serverless execution and storage. I am responsible for data governance and making sure data is validated and secure.

### Decision
Move the text review entry storage from 'localStorage' to a backend API in Cloudflare.

### Alternatives considered
* **Buy:** Offer fast backend setup, they introduce obscure database internals and create vendor lock-in with complex export workflows.
* **Delegate:** Autonomous AI app generators (e.g., bolt.new) can rapidly provision hosted backends, but conceal architecture routing and security controls, making code verification impossible and leaving the project vulnerable to unvetted third-party service dependencies.

### Consequences
Reviews can no longer be submitted or retrieved if the user loses WiFi and the app now requires UI error states to handle it. In addition, Data governance responsibility shifted to me.

### Revisit trigger
Revisit this if traffic outgrows Cloudflare's free tier, if the data stops fitting the SQL table, or if multiple users each need their own private entries.

---

## ADR-001: Store entries in localStorage

**Status:** Superseded by ADR-002

## ADR-001

Title and date: JavaScript for Text Reviews Feature (September 15, 2026)

Status: Accepted

Door / concrete acquisition and execution choice: Build

Context: Users need to type and save text reviews for without spending money or setting up a complex backend server.

Decision: Build it in basic form and save the review text directly in the browser.

Consequences and revisit trigger: It is free and can work in the Live Server. They can only exist in the browser and cannot be shared. Revisit it to make it shareable or multi-user.

Keep superseded ADRs. The pedagogical browser build can coexist with a different architecture recommendation; explain the distinction.
