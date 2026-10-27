# Building the deck

```bash
cd build
npm install
pip install pymupdf numpy pillow
python3 extract_visuals.py "../Henry Roof Restoration and Repair Solutions Master Deck v3 - Gold Seal.pdf" visuals
node build.js visuals "../Henry Gold Seal Training - Plain Language.pptx"
node notes_md.js ../TRAINER-NOTES.md
```

- `content.js` — all rewritten slide text and speaker notes (edit wording here).
- `extract_visuals.py` — pulls the photos out of the original PDF without the old text.
- `build.js` — lays out the slides. `apply_theme.js` writes the colour theme.
