# Reading a Delegated Build: the seven questions

Binary answers only. Each No is a row in the EVALS.md error-analysis log.

| # | Question | bolt | AI Studio | Log category |
|---|---|---|---|---|
| 1 | Did it touch only the files you named? | Yes | | scope |
| 2 | Any `innerHTML` with user input? Any concatenated SQL? (Yes is bad) | No | | STANDARDS |
| 3 | Are colors and fonts the STYLE.md tokens, or its own? | Yes | | STYLE |
| 4 | Did it add a dependency? Which? What does that package do? | No | | dependency |
| 5 | Does it call your Worker, or did it invent its own storage? | No | | architecture |
| 6 | Run the feature's EARS rows by hand. How many pass? | /  | /  | EARS |
| 7 | Is there anything you cannot explain? Name the line. | | | cannot verify |
