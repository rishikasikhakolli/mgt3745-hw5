# Judgment Eval: <Category Filter>

<!--The seven checklist questions, extended to at least ten, specific to this
feature and this STYLE.md. Two grader columns. If the second grader is a
model, paste the prompt you gave it at the bottom and mark every disagreement.
Agreement under 80 percent is a finding about the rubric, logged in EVALS.md.-->

| # | Question (yes/no) | You | Grader 2 | Agree? |
|---|---|---|---|---|
| 1 | Only index.html, styles.css, app.js changed? | Yes | No | |
| 2 | No innerHTML with user input anywhere in the diff? | Yes | Yes | + |
| 3 | No string-concatenated SQL in worker.js? | Yes | Yes | + |
| 4 | Every text color is a STYLE.md token? | No | No | + |
| 5 | Every font is a STYLE.md token? | No | No | + |
| 6 | No new dependency in package.json? | Yes | Yes | + |
| 7 | Data goes through the Worker, not local state alone? | Yes | Yes | + |
| 8 | When the Worker returns 400, the reason is shown on the page? | Yes | Yes | + |
| 9 | Does the form block submission entirely when no category is selected? | Yes | Yes | + |
| 10 | Does selecting a filter show only entries matching that category, not all entries? | Yes | Yes | + |

**Agreement:** 9 of 10 (90%)

## Grader 2 prompt (if a model)
```
You are reviewing a diff for a web app, Travlr. I'm attaching worker.js,
index.html, app.js, styles.css, my STYLE.md, and STANDARDS.md.

Can you answer these 10 questions with just yes or no based on what the code
actually does, not what I meant for it to do? I don't want the benefit of the
doubt here, just the honest answer:
```
