"""Pull the photos and diagrams out of the original PDF deck, without the slide text,
so the rebuilt deck can show them next to the rewritten copy.

usage: python3 build/extract_visuals.py <source.pdf> <out_dir>
writes v###.jpg per slide plus sizes.json
"""
import sys, json, os, warnings
warnings.filterwarnings("ignore")
import pymupdf as fitz
import numpy as np
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

KEEP_TEXT = {8}        # competitor chart: its text is part of the graphic
TOP, BOT = 60, 496     # points: below the title bar, above the footer
# slides that become dividers or are rebuilt as native tables: no picture needed
SKIP = {1, 11, 15, 18, 32, 72, 122, 166, 177, 228, 229, 230, 231, 232, 233, 243, 249, 251}
# leftover layout pieces (tinted boxes, table backgrounds) to trim, as fractions l, t, r, b
CROP = {3: (0, .22, 1, 1), 4: (0, .22, 1, 1), 5: (.18, 0, 1, 1), 40: (.40, 0, 1, 1), 94: (.42, 0, 1, 1),
        140: (.42, 0, 1, 1), 182: (.45, 0, 1, 1), 240: (0, .1, 1, 1), 36: (.3, 0, 1, 1), 90: (.3, 0, 1, 1),
        1240: (0, .1, 1, 1), 36: (.3, 0, 1, 1), 178: (.3, 0, 1, 1), 97: (0, 0, 1, .82)}


def trim(im):
    a = np.asarray(im).astype(int)
    ys, xs = np.where(np.abs(a - 255).sum(axis=2) > 40)
    if len(xs) < 2000 or xs.max() - xs.min() < 80 or ys.max() - ys.min() < 80:
        return None
    return im.crop((max(0, xs.min() - 4), max(0, ys.min() - 4), min(im.width, xs.max() + 5), min(im.height, ys.max() + 5)))


doc = fitz.open(src)
sizes = {}
for i, page in enumerate(doc, 1):
    if i in SKIP:
        continue
    area = fitz.Rect(0, TOP, page.rect.width, BOT)
    rects = [fitz.Rect(r["bbox"]) & area for r in page.get_image_info()]
    rects = [r for r in rects if r.width > 30 and r.height > 30]
    if i not in KEEP_TEXT:
        for b in page.get_text("dict")["blocks"]:
            if b["type"] == 0:
                page.add_redact_annot(fitz.Rect(b["bbox"]))
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED)

    # drop flat colour bars and tinted boxes: they are layout, not pictures
    def busy(r):
        p = page.get_pixmap(dpi=30, clip=r)
        a = np.frombuffer(p.samples, np.uint8).reshape(p.height, p.width, p.n)[..., :3].astype(int)
        return a.std() > 18
    rects = [r for r in rects if busy(r)]
    clip = area
    if rects and i not in KEEP_TEXT:
        clip = fitz.Rect(rects[0])
        for r in rects[1:]:
            clip |= r
    pix = page.get_pixmap(dpi=150, clip=clip)
    im = trim(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))
    if im is None:
        continue
    if i in CROP:
        l, t, r, b = CROP[i]
        im = trim(im.crop((int(l * im.width), int(t * im.height), int(r * im.width), int(b * im.height))))
    im.thumbnail((1500, 1100))
    im.save(f"{out}/v{i:03d}.jpg", quality=80)
    sizes[i] = im.size
json.dump(sizes, open(f"{out}/sizes.json", "w"))
print(f"{len(sizes)} visuals written to {out}")
