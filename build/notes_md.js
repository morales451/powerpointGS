// Writes TRAINER-NOTES.md: the writing rules plus every slide's rewritten copy and speaker notes.
const fs = require("fs");
const S = require("./content.js");
const out = [];
out.push(`# Henry Gold Seal Training — Trainer Notes

Plain-language rewrite of the 251-slide *Henry Roof Restoration and Repair Solutions Master Deck v3 – Gold Seal*.
Slide numbers match the original deck one-to-one. The same notes are in the speaker notes of
\`Henry Gold Seal Training - Plain Language.pptx\`.

## How the slides were rewritten

From **How to Write Clearly**
- Short words, short sentences, one idea per line. "Adhesion" becomes "will it stick?"; "substrate" becomes "roof".
- Active voice: "Clean the roof", not "The roof should be cleaned".
- Every product number and spec from the original is kept exactly. Only the wording changed.

From **Made to Stick**
- **Simple:** each section opens with one *Remember* line (e.g. "Repair first, then restore").
- **Concrete:** job-site comparisons — primer on a car, rebar in concrete, a bedroom-sized square.
- **Unexpected:** "In the pull test, *failure* is the good result."
- **Credible:** real numbers — 90% of leaks start at details; the 25% wet rule.
- **Stories:** open with a roof you saved that the owner thought was dead.
- One core message repeated all day: **Clean. Dry. Sound.**

From **Workshop Survival Guide**
- Every block has a question for the crew. Let them answer before you do.
- Repeated slides (each coating system re-covers inspection, testing, prep and application) are marked
  **Review** — the crew teaches it back; the trainer fills gaps. This keeps a 251-slide deck moving.
- Hands-on moments: pass samples, fill out the authorization form in the room, save the tech rep's number.

## Respecting the room
- These are skilled roofers. Explain *product* words; never explain *roofing* to them.
- Call on the experienced people. Their stories carry more weight than a slide.
- No quizzes with names attached. Ask the room, not a person, until people are warmed up.

## Notes format
Each slide has up to four parts:
- **Key message** — the one thing to land.
- **Say it like this** — a plain-language talk track.
- **Make it stick** — an example or comparison.
- **Ask the crew** — a question to get them talking.

---
`);
let sec = "";
S.forEach((d, i) => {
  if (d.section !== sec) { sec = d.section; out.push(`\n## ${sec}\n`); }
  out.push(`### ${i + 1}. ${d.title}`);
  const body = d.bullets || d.after || (d.items && d.items.map((x) => x.join(" — "))) || (d.rules && d.rules.map((x) => x.join(" — ")))
    || (d.cols && d.cols.map((c) => `${c.head}: ${c.items.join("; ")}`)) || (d.rows && d.rows.map((r) => r.join(" | ").replace(/\n/g, "; ")))
    || (d.recap) || [];
  if (d.remember) out.push(`*Remember:* **${d.remember}**`);
  if (d.caption) out.push(`*On slide:* ${d.caption}`);
  if (d.sub) out.push(`*On slide:* ${d.sub}`);
  if (body.length) out.push("*On slide:*\n" + body.map((b) => `- ${b}`).join("\n"));
  if (d.foot) out.push(`*Footnote:* ${d.foot}`);
  const n = d.notes;
  if (n.key) out.push(`**Key message:** ${n.key}`);
  if (n.say) out.push(`**Say it like this:** ${n.say}`);
  if (n.stick) out.push(`**Make it stick:** ${n.stick}`);
  if (n.ask) out.push(`**Ask the crew:** ${n.ask}`);
  out.push("");
});
fs.writeFileSync(process.argv[2] || "TRAINER-NOTES.md", out.join("\n\n").replace(/\n{3,}/g, "\n\n"));
