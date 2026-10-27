// Builds the plain-language Gold Seal training deck from content.js and the
// pictures pulled out of the original PDF by extract_visuals.py.
// The frame (blue title bar, grey footer with logo, grey divider band, blue
// "Building Confidence" slides) matches the original Henry master deck.
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
const LOGO_BLUE = path.join(__dirname, "brand", "logo_blue.png");
const LOGO_WHITE = path.join(__dirname, "brand", "logo_white.png");

// Colours sampled from the original deck.
const THEME = {
  name: "Henry Gold Seal",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "1E1E1E", lt1: "FFFFFF", dk2: "003B78", lt2: "EFEFF0",
    accent1: "0053A6", accent2: "3877B7", accent3: "2E8B57", accent4: "C0392B",
    accent5: "5F6368", accent6: "BFC0BF", hlink: "0053A6", folHlink: "5F6368",
  },
};
// Original slides that use the solid-blue "Building Confidence" title look.
const OPENERS = new Set([1, 18, 72, 122, 166, 228, 233, 243, 249, 251]);

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.title = "Henry Roof Restoration & Repair — Gold Seal Training";
pres.author = "Henry Gold Seal Training";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

const W = 13.333, M = 0.6, CW = W - 2 * M;
const BAR = 0.97, FOOT_Y = 6.8;      // title bar height, footer band top
const TOP = 1.3, BOT = 6.5;          // content area on content slides
const LOGO = { x: 11.71, y: 6.92, w: 1.22, h: 0.53 };

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { rect: { x: 0, y: 0, w: W, h: BAR, fill: { color: C.accent1 }, line: { type: "none" } } },
    { rect: { x: 0, y: FOOT_Y, w: W, h: 7.5 - FOOT_Y, fill: { color: C.background2 }, line: { type: "none" } } },
    { line: { x: 0.86, y: 6.94, w: 0, h: 0.45, line: { color: C.accent2, width: 1.25 } } },
    { image: { path: LOGO_BLUE, ...LOGO, altText: "Henry logo" } },
    { placeholder: { options: { name: "footer", type: "body", x: 1.05, y: 6.98, w: 6, h: 0.35, fontSize: 10, color: C.accent5, margin: 0, valign: "middle" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 0, w: CW, h: BAR, fontSize: 26, bold: true, color: C.background1, fontFace: THEME.headFontFace, margin: 0, valign: "middle", align: "left" }, text: "" } },
  ],
  slideNumber: { x: 0.25, y: 6.98, w: 0.5, h: 0.35, fontSize: 10.5, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0 },
});
// Section divider: grey band across the middle, blue footer.
pres.defineSlideMaster({
  title: "BAND",
  background: { color: C.background1 },
  objects: [
    { rect: { x: 0, y: 2.85, w: W, h: 1.35, fill: { color: C.accent6 }, line: { type: "none" } } },
    { rect: { x: 0, y: FOOT_Y, w: W, h: 7.5 - FOOT_Y, fill: { color: C.accent1 }, line: { type: "none" } } },
    { text: { text: "Building Confidence™", options: { x: 0.68, y: 6.98, w: 4, h: 0.35, fontSize: 11, bold: true, color: C.background1, margin: 0, valign: "middle" } } },
    { image: { path: LOGO_WHITE, ...LOGO, altText: "Henry logo" } },
    { placeholder: { options: { name: "title", type: "title", x: M, y: 2.85, w: CW, h: 1.35, fontSize: 32, bold: true, color: C.text1, fontFace: THEME.headFontFace, margin: 0, valign: "middle", align: "center" }, text: "" } },
  ],
});
// Opener: solid blue, white footer strip with tagline, copyright and logo.
pres.defineSlideMaster({
  title: "OPENER",
  background: { color: C.background1 },
  objects: [
    { rect: { x: 0, y: 0, w: W, h: FOOT_Y, fill: { color: C.accent1 }, line: { type: "none" } } },
    { text: { text: "Building Confidence™", options: { x: 0.68, y: 6.95, w: 4, h: 0.25, fontSize: 11, bold: true, color: C.accent1, margin: 0 } } },
    { text: { text: "© 2022 Henry Company. All rights reserved.", options: { x: 0.68, y: 7.2, w: 4, h: 0.2, fontSize: 8, color: C.text1, margin: 0 } } },
    { image: { path: LOGO_BLUE, ...LOGO, altText: "Henry logo" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.69, y: 1.2, w: 11.5, h: 2.6, fontSize: 42, bold: true, color: C.background1, fontFace: THEME.headFontFace, margin: 0, valign: "bottom", align: "left" }, text: "" } },
  ],
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
function runs(t, size) {
  const i = t.indexOf(" — ");
  if (i > 0 && i < 40) {
    return [
      { text: t.slice(0, i), options: { bold: true, color: C.text1, fontSize: size } },
      { text: " — " + t.slice(i + 3), options: { color: C.text1, fontSize: size } },
    ];
  }
  return [{ text: t, options: { color: C.text1, fontSize: size } }];
}

// Rough text height (Arial) so we can pick the biggest font that fits.
function textHeight(items, size, w) {
  const cpl = Math.floor((w - 0.35) / (size * 0.5 / 72));
  const lines = items.reduce((a, t) => a + Math.max(1, Math.ceil(t.length / cpl)), 0);
  return lines * size * 1.2 / 72 + items.length * size * 0.55 / 72;
}
function pickSize(items, w, h, sizes = [24, 22, 20, 18, 17, 16, 15, 14]) {
  return sizes.find((s) => textHeight(items, s, w) <= h) || sizes[sizes.length - 1];
}

function bullets(slide, items, x, y, w, h, fixed) {
  const size = fixed || pickSize(items, w, h);
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

// Text slides with no picture: one readable column, or two when the list is long.
function columns(slide, items, top, bottom) {
  if (items.length <= 5) return bullets(slide, items, M, top, 8.6, bottom - top);
  const half = Math.ceil(items.length / 2), gw = 0.6, cw = (CW - gw) / 2;
  const size = Math.min(pickSize(items.slice(0, half), cw, bottom - top), pickSize(items.slice(half), cw, bottom - top));
  bullets(slide, items.slice(0, half), M, top, cw, bottom - top, size);
  bullets(slide, items.slice(half), M + cw + gw, top, cw, bottom - top, size);
}

function foot(slide, text) {
  slide.addText(text, { x: M, y: 6.2, w: CW, h: 0.4, fontSize: 12, italic: true, color: C.accent5, margin: 0, isTextBox: true, valign: "bottom", objectName: "Footnote" });
}
const bottomFor = (d) => (d.foot ? 6.05 : BOT);

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

// Second line under an opener title (the section's "remember" line).
function openerLine(s, text) {
  s.addText(text, { x: 0.69, y: 4.05, w: 11.5, h: 1.6, fontSize: 26, color: C.background1, margin: 0, valign: "top", isTextBox: true, objectName: "Key line" });
}

// ---------- slide kinds ----------
const K = {
  cover(s, d) {
    s.addText("Henry Commercial Roof Restoration & Repair — Gold Seal Training", { placeholder: "title" });
    openerLine(s, d.sub.replace("Gold Seal Training — ", ""));
  },
  divider(s, d, n) {
    s.addText(d.title, { placeholder: "title" });
    if (OPENERS.has(n)) return openerLine(s, d.remember);
    s.addText(d.remember, { x: M, y: 4.5, w: CW, h: 0.9, fontSize: 24, bold: true, color: C.accent1, align: "center", margin: 0, valign: "top", isTextBox: true, objectName: "Key line" });
  },
  closing(s, d) {
    s.addText(d.title, { placeholder: "title" });
    s.addText(d.recap.map((t, i) => ({ text: t, options: { breakLine: i < d.recap.length - 1, paraSpaceAfter: 8 } })),
      { x: 0.69, y: 4.05, w: 11.5, h: 2.5, fontSize: 26, bold: true, color: C.background1, margin: 0, valign: "top", isTextBox: true, objectName: "Recap" });
  },
  text(s, d, n) {
    const bottom = bottomFor(d);
    if (SIZES[n]) {
      bullets(s, d.bullets, M, TOP, 5.8, bottom - TOP);
      fitImage(s, n, 6.8, TOP, W - M - 6.8, bottom - TOP, "Photo");
    } else {
      columns(s, d.bullets, TOP, bottom);
    }
    if (d.foot) foot(s, d.foot);
  },
  photo(s, d, n) {
    if (SIZES[n]) fitImage(s, n, M, TOP, CW, 4.6, "Photo");
    s.addText(d.caption, { x: M, y: 6.05, w: CW, h: 0.5, fontSize: d.caption.length > 95 ? 17 : 20, bold: true, color: C.text1, margin: 0, valign: "top", isTextBox: true, fit: "shrink", objectName: "Caption" });
  },
  // The numbers stay: the order of the steps is the point.
  steps(s, d) {
    const cols = d.items.length === 4 ? 4 : 3, gw = 0.45, cw = (CW - gw * (cols - 1)) / cols, rh = 2.3;
    d.items.forEach(([head, sub], i) => {
      const x = M + (i % cols) * (cw + gw), y = 1.5 + Math.floor(i / cols) * rh;
      s.addShape(pres.shapes.OVAL, { x, y, w: 0.7, h: 0.7, fill: { color: C.accent1 }, line: { type: "none" }, objectName: `Step ${i + 1} number` });
      s.addText(String(i + 1), { x, y, w: 0.7, h: 0.7, fontSize: 24, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addText(head, { x, y: y + 0.85, w: cw, h: 0.45, fontSize: 21, bold: true, color: C.text1, margin: 0, isTextBox: true });
      s.addText(sub, { x, y: y + 1.3, w: cw, h: 0.65, fontSize: 16, color: C.text1, margin: 0, valign: "top", isTextBox: true, fit: "shrink" });
    });
    if (d.after) bullets(s, d.after, M, 4.1, CW * 0.8, bottomFor(d) - 4.1);
    if (d.foot) foot(s, d.foot);
  },
  compare(s, d) {
    const gw = 0.8, cw = (CW - gw) / 2;
    d.cols.forEach((c, i) => {
      const x = M + i * (cw + gw), win = i === 1;
      s.addText(c.head, { x, y: 1.5, w: cw, h: 0.7, fontSize: 32, bold: true, color: win ? C.accent1 : C.accent5, margin: 0, isTextBox: true });
      bullets(s, c.items, x, 2.45, cw, 3.9);
    });
    s.addShape(pres.shapes.LINE, { x: M + cw + gw / 2, y: 1.6, w: 0, h: 4.6, line: { color: C.accent6, width: 1 }, objectName: "Column divider" });
  },
  async rules(s, d) {
    const icons = [FaBroom, FaTint, FaHardHat];
    const gw = 0.5, cw = (CW - 2 * gw) / 3;
    for (let i = 0; i < 3; i++) {
      const [word, sub] = d.rules[i];
      const x = M + i * (cw + gw);
      s.addImage({ data: await icon(icons[i], THEME.colors.accent1), x, y: 1.9, w: 0.9, h: 0.9, altText: word });
      s.addText(word + ".", { x, y: 3.0, w: cw, h: 1.2, fontSize: 60, bold: true, color: C.accent1, margin: 0, isTextBox: true });
      s.addText(sub, { x, y: 4.35, w: cw, h: 1.2, fontSize: 22, color: C.text1, valign: "top", margin: 0, isTextBox: true });
    }
  },
  table(s, d) {
    // Biggest font where the table fits the slide, with every column wide enough
    // that its longest word (a phone number, an email) never breaks.
    const avail = bottomFor(d) - TOP - 0.1;
    const cells = [d.head, ...d.rows];
    const plan = (size) => {
      const cw = (t) => t.length * size * 0.52 / 72 + 0.3;
      const minW = d.head.map((_, c) => Math.max(...cells.map((r) => Math.max(...r[c].split(/\s+/).map((t) => cw(t) * 1.12)))));
      const want = d.head.map((_, c) => Math.max(...cells.map((r) => Math.max(...r[c].split("\n").map(cw)))));
      const extra = Math.max(0, CW - minW.reduce((a, b) => a + b, 0));
      const grow = want.map((w, c) => Math.max(0, w - minW[c])), growSum = grow.reduce((a, b) => a + b, 0) || 1;
      const colW = minW.map((w, c) => w + extra * grow[c] / growSum);
      const height = cells.reduce((h, r) => h + Math.max(...r.map((t, c) =>
        t.split("\n").reduce((n, l) => n + Math.max(1, Math.ceil(cw(l) / colW[c] - 0.05)), 0))) * size * 1.18 / 72 + 0.17, 0);
      return { colW, fits: minW.reduce((a, b) => a + b, 0) <= CW && height <= avail };
    };
    const size = [20, 19, 18, 17, 16, 15, 14, 13, 12].find((z) => plan(z).fits) || 12;
    const { colW } = plan(size);
    const total = colW.reduce((a, b) => a + b, 0);
    const cell = (t, o = {}) => ({ text: t, options: { fontSize: size, color: C.text1, valign: "middle", margin: [6, 10, 6, 10], ...o } });
    const rows = [
      d.head.map((h) => cell(h, { bold: true, color: C.background1, fill: { color: C.accent1 } })),
      ...d.rows.map((r, i) => r.map((t, c) => cell(t, { bold: c === 0, fill: { color: i % 2 ? C.background1 : C.background2 } }))),
    ];
    s.addTable(rows, { x: M, y: TOP + 0.05, w: CW, colW: colW.map((w) => w * CW / total), border: { type: "solid", pt: 0.75, color: THEME.colors.accent6 }, fontFace: THEME.bodyFontFace, objectName: "Table" });
    if (d.foot) foot(s, d.foot);
  },
};

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
    const master = OPENERS.has(n) ? "OPENER" : d.kind === "divider" ? "BAND" : "CONTENT";
    const s = pres.addSlide({ masterName: master, sectionTitle: d.section });
    if (master === "CONTENT") {
      s.addText(d.title, { placeholder: "title" });
      s.addText(d.section, { placeholder: "footer" });
    }
    await K[d.kind](s, d, n);
    s.addNotes(notesText(d.notes, n));
  }
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  await dropMidParagraphProps(OUT);
  console.log(`Wrote ${OUT} (${SLIDES.length} slides)`);
})();
