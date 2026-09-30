# COMPARISON.md
Same context files (PROJECT.md, FEATURES.md marked, STYLE.md, STANDARDS.md, TOOLS.md, index.html, styles.css, app.js) and the same instruction line were pasted into Google AI Studio's Build tab, run against the same Category-Based-Ranking spec bolt.new received.

**Where they agreed:** Both tools implemented the feature as a post-save modal prompting the user to choose a category, rather than putting the picker in the form itself. Both stayed within vanilla DOM APIs (fetch, FileReader, querySelectorAll), and stayed inside the three named files as instructed. Both used textContent exclusively for user-supplied strings; no innerHTML in either output.

**Where they differed:** bolt discarded the app's existing Worker/D1 persistence entirely and rebuilt storage from scratch in localStorage. AI Studio preserved the existing saveTextToServer/loadServerEntries calls keeping the Worker in the loop. bolt reused STYLE.md's exact variable names while AI Studio renamed every token and didn't match as many.

**Loose prediction resolved:** "bolt will follow STYLE.md tokens better than AI Studio" resolved True.

**What the agreement says about the spec:** Both tools converging on the same interaction pattern from one instruction line suggests the spec communicated what to build clearly, but diverging on architecture and style shows it didn't equally enforce how to build it against the rest of the context.
