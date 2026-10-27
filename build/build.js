// Builds the plain-language Gold Seal training deck from content.js and the
// pictures pulled out of the original PDF by extract_visuals.py.
//
// usage: node build.js <visuals_dir> <out.pptx>
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const { FaBroom, FaTint, FaHardHat } = require("react-icons/fa");
const { applyTheme } = require("./apply_theme.js");
const SLIDES = require("./content.js");

const VIS = process.argv[2] || "visuals";
const OUT = process.argv[3] || "Henry Gold Seal Training - Plain Language.pptx";
const SIZES = JSON.parse(fs.readFileSync(path.join(VIS, "sizes.json"), "utf8"));

const THEME = {
  name: "Henry Gold Seal",
  headFontFace: "Arial",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B1F24", lt1: "FFFFFF", dk2: "0B2545", lt2: "EEF3F8",
    accent1: "0057A8", accent2: "F5B700", accent3: "2E8B57", accent4: "C0392B",
    accent5: "5B6B7C", accent6: "9CC3EC", hlink: "0057A8", folHlink: "5B6B7C",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.title = "Henry Roof Restoration & Repair — Gold Seal Training";
pres.author = "Henry Gold Seal Training";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

const W = 13.333, M = 0.6, CW = W - 2 * M;

// ---------- layouts ----------
const footer = [
  { text: { text: "Henry Gold Seal Training", options: { x: M, y: 7.0, w: 6, h: 0.3, fontSize: 10, color: C.accent5, margin: 0 } } },
];
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    ...footer,
    { placeholder: { options: { name: "tag", type: "body", x: M, y: 0.32, w: CW, h: 0.3, fontSize: 12, bold: true, color: C.accent1, margin: 0, charSpacing: 1 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0.62, w: CW, h: 0.8, fontSize: 30, bold: true, color: C.text2, fontFace: THEME.headFontFace, margin: 0, valign: "top", align: "left" }, text: "" } },
  ],
  slideNumber: { x: W - M - 0.6, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: C.accent5, align: "right" },
});
pres.defineSlideMaster({
  title: "DARK",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "tag", type: "body", x: 0.8, y: 1.2, w: 11.7, h: 0.4, fontSize: 14, bold: true, color: C.accent2, margin: 0, charSpacing: 2 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 1.7, w: 11.7, h: 1.9, fontSize: 40, bold: true, color: C.background1, fontFace: THEME.headFontFace, margin: 0, valign: "top", align: "left" }, text: "" } },
  ],
  slideNumber: { x: W - M - 0.6, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
});

// ---------- helpers ----------
const visPath = (n) => (SIZES[n] ? path.join(VIS, `v${String(n).padStart(3, "0")}.jpg`) : null);

function fitImage(slide, n, x, y, w, h, name) {
  const [iw, ih] = SIZES[n];
  const r = iw / ih;
  let dw = w, dh = w / r;
  if (dh > h) { dh = h; dw = h * r; }
  slide.addImage({ path: visPath(n), x: x + (w - dw) / 2, y: y + (h - dh) / 2, w: dw, h: dh, objectName: name, altText: name });
}

// Split "Label — detail" into a bold label run and a plain run.
function runs(t, size, extra = {}) {
  const i = t.indexOf(" — ");
  if (i > 0 && i < 40) {
    return [
      { text: t.slice(0, i), options: { bold: true, color: C.text2, fontSize: size, ...extra } },
      { text: " — " + t.slice(i + 3), options: { color: C.text1, fontSize: size, ...extra } },
    ];
  }
  return [{ text: t, options: { color: C.text1, fontSize: size, ...extra } }];
}

// Rough text height so we can pick the biggest font that fits.
function textHeight(items, size, w) {
  const cpl = Math.floor((w - 0.35) / (size * 0.47 / 72));
  const lines = items.reduce((a, t) => a + Math.max(1, Math.ceil(t.length / cpl)), 0);
  return lines * size * 1.22 / 72 + items.length * size * 0.55 / 72;
}
function pickSize(items, w, h, sizes = [24, 22, 20, 18, 17, 16, 15, 14]) {
  return sizes.find((s) => textHeight(items, s, w) <= h) || sizes[sizes.length - 1];
}

function bullets(slide, items, x, y, w, h) {
  const size = pickSize(items, w, h);
  const paras = [];
  items.forEach((t, i) => {
    runs(t, size).forEach((r, j, arr) => {
      const o = { ...r.options };
      if (j === 0) Object.assign(o, { bullet: { indent: 18 }, paraSpaceAfter: size * 0.55 });
      if (j === arr.length - 1 && i < items.length - 1) o.breakLine = true;
      paras.push({ text: r.text, options: o });
    });
  });
  slide.addText(paras, { x, y, w, h, valign: "top", margin: 0, isTextBox: true, fontFace: THEME.bodyFontFace, objectName: "Body text" });
}

function foot(slide, text) {
  slide.addText(text, { x: M, y: 6.48, w: CW, h: 0.4, fontSize: 12, italic: true, color: C.accent5, margin: 0, isTextBox: true, valign: "bottom", objectName: "Footnote" });
}

function notesText(n, i) {
  const parts = [];
  if (n.key) parts.push("KEY MESSAGE\n" + n.key);
  if (n.say) parts.push("SAY IT LIKE THIS\n" + n.say);
  if (n.stick) parts.push("MAKE IT STICK\n" + n.stick);
  if (n.ask) parts.push("ASK THE CREW\n" + n.ask);
  parts.push(`(Original deck: slide ${i})`);
  return parts.join("\n\n");
}

async function icon(Comp, color) {
  const svg = renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: 256 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- slide kinds ----------
const K = {
  cover(s, d, n) {
    s.addText("GOLD SEAL TRAINING", { placeholder: "tag" });
    s.addText(d.title, { placeholder: "title" });
    s.addText(d.sub.replace("Gold Seal Training — ", ""), { x: 0.8, y: 3.7, w: 6.2, h: 1.2, fontSize: 24, color: C.accent6, margin: 0, isTextBox: true, valign: "top", objectName: "Subtitle" });
    if (SIZES[10]) fitImage(s, 10, 7.3, 3.2, 5.4, 3.6, "Before and after roof photo");
  },
  divider(s, d) {
    s.addText(d.section.toUpperCase(), { placeholder: "tag" });
    s.addText(d.title, { placeholder: "title" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 4.1, w: 11.7, h: 1.9, fill: { color: C.accent1 }, rectRadius: 0.12, line: { type: "none" }, objectName: "Remember card" });
    s.addText("REMEMBER", { x: 1.2, y: 4.35, w: 10.9, h: 0.4, fontSize: 14, bold: true, color: C.accent2, margin: 0, charSpacing: 2, isTextBox: true });
    s.addText(d.remember, { x: 1.2, y: 4.8, w: 10.9, h: 1.0, fontSize: 28, bold: true, color: C.background1, margin: 0, valign: "top", isTextBox: true, objectName: "Remember line" });
  },
  text(s, d, n) {
    const bottom = d.foot ? 6.35 : 6.75;
    const hasVis = !!SIZES[n];
    let y = 1.65;
    const tw = hasVis ? 5.8 : CW;
    if (d.big) {
      s.addText(d.big, { x: M, y: 1.5, w: tw, h: 1.05, fontSize: 66, bold: true, color: C.accent1, margin: 0, isTextBox: true, fontFace: THEME.headFontFace, objectName: "Big number" });
      s.addText(d.bigLabel, { x: M, y: 2.55, w: tw, h: 0.45, fontSize: 20, bold: true, color: C.text2, margin: 0, isTextBox: true, objectName: "Big number label" });
      y = 3.25;
    }
    if (hasVis) {
      bullets(s, d.bullets, M, y, tw, bottom - y);
      fitImage(s, n, 6.8, 1.6, W - M - 6.8, bottom - 1.6, "Photo");
    } else {
      cards(s, d.bullets, y, bottom);
    }
    if (d.foot) foot(s, d.foot);
  },
  photo(s, d, n) {
    if (SIZES[n]) fitImage(s, n, M, 1.55, CW, 4.6, "Photo");
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: 6.28, w: CW, h: 0.62, fill: { color: C.background2 }, rectRadius: 0.08, line: { type: "none" }, objectName: "Caption card" });
    s.addText(d.caption, { x: M + 0.25, y: 6.28, w: CW - 0.5, h: 0.62, fontSize: d.caption.length > 95 ? 16 : 19, bold: true, color: C.text2, margin: 0, valign: "middle", isTextBox: true, fit: "shrink", objectName: "Caption" });
  },
  steps(s, d) {
    const cols = d.items.length === 4 ? 4 : 3, gw = 0.3, cw = (CW - gw * (cols - 1)) / cols, ch = 2.25;
    d.items.forEach(([head, sub], i) => {
      const x = M + (i % cols) * (cw + gw), y = 1.7 + Math.floor(i / cols) * (ch + 0.3);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, fill: { color: C.background2 }, rectRadius: 0.1, line: { type: "none" }, objectName: `Step ${i + 1} card` });
      s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: y + 0.3, w: 0.75, h: 0.75, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Step ${i + 1} number` });
      s.addText(String(i + 1), { x: x + 0.3, y: y + 0.3, w: 0.75, h: 0.75, fontSize: 26, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addText(head, { x: x + 0.3, y: y + 1.2, w: cw - 0.6, h: 0.45, fontSize: 21, bold: true, color: C.text2, margin: 0, isTextBox: true });
      s.addText(sub, { x: x + 0.3, y: y + 1.65, w: cw - 0.6, h: 0.55, fontSize: 16, color: C.text1, margin: 0, valign: "top", isTextBox: true, fit: "shrink" });
    });
    if (d.after) bullets(s, d.after, M, 4.3, CW, (d.foot ? 6.35 : 6.75) - 4.3);
    if (d.foot) foot(s, d.foot);
  },
  compare(s, d) {
    const gw = 0.4, cw = (CW - gw) / 2;
    d.cols.forEach((c, i) => {
      const x = M + i * (cw + gw), win = i === 1;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.7, w: cw, h: 4.9, fill: { color: win ? C.background2 : C.background1 }, line: { color: win ? C.accent1 : C.accent5, width: 1.5 }, rectRadius: 0.1, objectName: `${c.head} card` });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.35, y: 2.0, w: 2.6, h: 0.7, fill: { color: win ? C.accent1 : C.accent5 }, rectRadius: 0.35, line: { type: "none" } });
      s.addText(c.head, { x: x + 0.35, y: 2.0, w: 2.6, h: 0.7, fontSize: 24, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
      bullets(s, c.items, x + 0.4, 3.05, cw - 0.8, 3.3);
    });
  },
  async rules(s, d) {
    const icons = [FaBroom, FaTint, FaHardHat];
    const gw = 0.4, cw = (CW - 2 * gw) / 3;
    for (let i = 0; i < 3; i++) {
      const [word, sub] = d.rules[i];
      const x = M + i * (cw + gw);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.75, w: cw, h: 4.8, fill: { color: C.background2 }, rectRadius: 0.12, line: { type: "none" }, objectName: `${word} card` });
      s.addShape(pres.shapes.OVAL, { x: x + cw / 2 - 0.75, y: 2.15, w: 1.5, h: 1.5, fill: { color: C.accent1 }, line: { type: "none" } });
      s.addImage({ data: await icon(icons[i], THEME.colors.lt1), x: x + cw / 2 - 0.42, y: 2.48, w: 0.84, h: 0.84, altText: word });
      s.addText(`${i + 1}. ${word}`, { x, y: 4.0, w: cw, h: 0.9, fontSize: 44, bold: true, color: C.text2, align: "center", margin: 0, isTextBox: true, fontFace: THEME.headFontFace });
      s.addText(sub, { x: x + 0.3, y: 5.0, w: cw - 0.6, h: 1.1, fontSize: 20, color: C.text1, align: "center", valign: "top", margin: 0, isTextBox: true });
    }
  },
  table(s, d, n) {
    const ncol = d.head.length;
    const longest = d.head.map((h, c) => Math.max(h.length, ...d.rows.map((r) => Math.max(...r[c].split("\n").map((l) => l.length)))));
    const weights = longest.map((l) => Math.min(Math.max(l, 14), 60));
    const total = weights.reduce((a, b) => a + b, 0);
    const colW = weights.map((w) => (w / total) * CW);
    const bodyChars = d.rows.reduce((a, r) => a + r.join(" ").length, 0);
    const size = bodyChars > 900 ? 13 : bodyChars > 600 ? 14 : bodyChars > 350 ? 16 : 20;
    const cell = (t, o = {}) => ({ text: t, options: { fontSize: size, color: C.text1, valign: "middle", margin: [6, 10, 6, 10], ...o } });
    const rows = [
      d.head.map((h) => cell(h, { bold: true, color: C.background1, fill: { color: C.text2 } })),
      ...d.rows.map((r, i) => r.map((t, c) => cell(t, { bold: c === 0, color: c === 0 ? C.text2 : C.text1, fill: { color: i % 2 ? C.background1 : C.background2 } }))),
    ];
    s.addTable(rows, { x: M, y: 1.6, w: CW, colW, border: { type: "solid", pt: 0.75, color: "D5DEE8" }, fontFace: THEME.bodyFontFace, objectName: "Table" });
    if (d.foot) foot(s, d.foot);
  },
  closing(s, d) {
    s.addText("WRAP-UP", { placeholder: "tag" });
    s.addText(d.title, { placeholder: "title" });
    const gw = 0.3, cw = (11.7 - gw) / 2;
    d.recap.forEach((t, i) => {
      const x = 0.8 + (i % 2) * (cw + gw), y = 3.3 + Math.floor(i / 2) * 1.35;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: 1.1, fill: { color: C.accent1 }, rectRadius: 0.1, line: { type: "none" }, objectName: `Recap ${i + 1}` });
      s.addText([
        { text: `${i + 1}  `, options: { color: C.accent2, bold: true } },
        { text: t, options: { color: C.background1, bold: true } },
      ], { x: x + 0.35, y, w: cw - 0.7, h: 1.1, fontSize: 24, valign: "middle", margin: 0, isTextBox: true });
    });
  },
};

// Text slides with no picture: show the points as a grid of cards instead of plain bullets.
function cards(slide, items, top, bottom) {
  const n = items.length;
  const cols = n <= 4 ? 2 : 3, rows = Math.ceil(n / cols);
  const gw = 0.3, cw = (CW - gw * (cols - 1)) / cols, ch = (bottom - top - gw * (rows - 1)) / rows;
  const size = Math.min(...items.map((t) => pickSize([t], cw - 0.5, ch - 0.3, [22, 20, 18, 16, 15, 14])));
  items.forEach((t, i) => {
    const x = M + (i % cols) * (cw + gw), y = top + Math.floor(i / cols) * (ch + gw);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, fill: { color: C.background2 }, rectRadius: 0.1, line: { type: "none" }, objectName: `Card ${i + 1}` });
    slide.addText(runs(t, size), { x: x + 0.25, y, w: cw - 0.5, h: ch, valign: "middle", margin: 0, isTextBox: true });
  });
}

// pptxgenjs writes an extra <a:pPr> before every run after the first in a paragraph. That is
// invalid OOXML and it switches the bullet off, so mixed bold/plain bullet lines lose their bullet.
async function dropMidParagraphProps(file) {
  const JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))) {
    const xml = await zip.file(name).async("string");
    const fixed = xml.replace(/(<\/a:r>)<a:pPr\b[^>]*?(?:\/>|>.*?<\/a:pPr>)/g, "$1");
    if (fixed !== xml) zip.file(name, fixed);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

(async () => {
  let lastSection = null;
  for (let i = 0; i < SLIDES.length; i++) {
    const d = SLIDES[i], n = i + 1;
    if (d.section !== lastSection) { pres.addSection({ title: d.section }); lastSection = d.section; }
    const dark = ["cover", "divider", "closing"].includes(d.kind);
    const s = pres.addSlide({ masterName: dark ? "DARK" : "CONTENT", sectionTitle: d.section });
    if (!dark) {
      s.addText(d.section.toUpperCase(), { placeholder: "tag" });
      s.addText(d.title, { placeholder: "title" });
    }
    await K[d.kind](s, d, n);
    s.addNotes(notesText(d.notes, n));
  }
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  await dropMidParagraphProps(OUT);
  console.log(`Wrote ${OUT} (${SLIDES.length} slides)`);
})();
