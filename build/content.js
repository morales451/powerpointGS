// Rewritten slide copy and speaker notes for the Henry Gold Seal training deck.
// One entry per original slide (1-251), in the same order, so trainers can map old to new.
//
// Writing rules used (from "How to Write Clearly", "Made to Stick", "Workshop Survival Guide"):
//  - One idea per slide. Short words. Short lines. Active verbs. No jargon without a plain meaning.
//  - Every section has one "Remember" line (the core message) that we repeat.
//  - Concrete job-site examples beat abstract claims.
//  - Repeat sections are review: the crew teaches it back, the trainer fills gaps.
//  - Respect the crew: they know roofs. We explain product words, never talk down.
//
// Bullet convention: "Label — detail" renders the label in bold.
// Notes object: { key, say, stick, ask } → rendered as labelled blocks in the speaker notes.

const S = [];
let SECTION = "";
const sec = (name) => { SECTION = name; };
const add = (o) => S.push({ section: SECTION, ...o });

// ---------- builders ----------
const cover = (title, sub, n) => add({ kind: "cover", title, sub, notes: n });
const div = (title, remember, n) => add({ kind: "divider", title, remember, notes: n });
const txt = (title, bullets, n, o = {}) => add({ kind: "text", title, bullets, notes: n, ...o });
const pic = (title, caption, n, o = {}) => add({ kind: "photo", title, caption, notes: n, ...o });
const steps = (title, items, n, o = {}) => add({ kind: "steps", title, items, notes: n, ...o });
const compare = (title, cols, n, o = {}) => add({ kind: "compare", title, cols, notes: n, ...o });
const table = (title, head, rows, n, o = {}) => add({ kind: "table", title, head, rows, notes: n, ...o });

const REVIEW = (topic) => ({
  key: `Review: ${topic}.`,
  say: "We covered this already. Don't re-teach it. Ask the crew to explain it to you, then fill in anything they miss.",
  ask: `"Who can walk us through this one?" Let them talk first.`,
});

// ---------- shared slides (used once per coating system) ----------
const roofTypeNotes = (type, extra = "") => ({
  key: `This system works on ${type}.`,
  say: `Point at the photo. "If you see a roof like this, this coating can restore it — as long as it passes Clean, Dry, Sound."${extra ? " " + extra : ""}`,
  ask: `"Where have you seen a roof like this around here?"`,
});

const restoreSteps = (first) => steps("The Steps for a Warranted Job", [
  ["Walk the roof", "Look it over. (If needed)"],
  ["Adhesion test", "Will the coating stick? (If needed)"],
  ["Moisture survey", "Is it wet inside? (If needed)"],
  ["Fix the roof", "Repair what's broken"],
  ["Restore", "Apply the coating system"],
  ["Final inspection", "Check the work. (If needed)"],
], first ? {
  key: "Six steps, every time. Skip one and the warranty can be at risk.",
  say: "This is the whole job on one slide. Look, test, check for water, fix, coat, inspect. The steps marked \"if needed\" depend on the roof and the warranty you're going for.",
  stick: "Think of it like a doctor visit: check-up, tests, treat the problem, then follow-up. You don't operate before the X-ray.",
  ask: "\"Which step do you think crews skip most often?\" (Usually the adhesion test or the moisture survey.)",
} : REVIEW("the six steps of a warranted job"));

const inspect = (first, gold) => txt("Step 1: Walk the Roof", [
  gold ? "Gold Seal jobs — best done with a Henry rep" : "Best done with a Henry rep",
  "It's free — no charge",
  "We just need a way onto the roof",
], first ? {
  key: "Before anything else, put eyes on the roof — and invite Henry to come with you.",
  say: "Call your Henry rep. They walk the roof with you at no cost. All we need is roof access. Two sets of eyes catch more problems.",
  stick: "A free second opinion now beats a warranty claim later.",
} : REVIEW("the roof walk — free, with a Henry rep"));

const adhesion = (first) => txt("Step 2: Adhesion Test — Will It Stick?", [
  "Checks that the coating will stick to this roof",
  "Required on — single-ply, metal, smooth asphalt, and roofs coated before",
  "Best result — the coating tears before it lets go (called \"cohesive failure\")",
], first ? {
  key: "Test a small patch first. If it doesn't stick, nothing else matters.",
  say: "We put down a test patch and pull it. We want the coating to rip apart before it peels off the roof. That's called cohesive failure — and in this test, \"failure\" is the good result.",
  stick: "Like testing tape on a wall before you hang a picture. You don't hang the whole picture and hope.",
  ask: "\"Ever had a coating peel on you? What was the roof?\"",
} : REVIEW("the adhesion test and what a good result looks like"));

const pullTest = (first) => txt("How to Do the Pull Test", [
  "Cut — slice along both sides of the test strip",
  "Pull — lift it up and back, at 90° to 135°",
  "Measure — it must hold at least 2.0 lbs per inch",
  "Pass — the coating tears apart (cohesive)",
  "Fail — the coating peels off clean (adhesive)",
], first ? {
  key: "Pass = the coating tears. Fail = it peels off clean.",
  say: "Left photos: the coating peeled off the roof clean. That's a fail. Right: the coating ripped inside itself and stayed stuck to the roof. That's a pass. It also has to hold at least 2 pounds per inch.",
  stick: "If the coating comes off clean like a sticker, it will come off in the wind, too.",
  ask: "Hold up a sample or point at the photo: \"Pass or fail?\"",
} : REVIEW("how to run the pull test — cut, pull, measure"));

const moisture = (first) => txt("Step 3: Moisture Survey — Is It Wet Inside?", [
  "Find wet insulation — infrared scans and core cuts",
  "More than 25% wet — not a candidate. Replace the roof.",
  "Less than 25% wet — cut out the wet areas and replace them",
  "Test methods — nuclear, infrared, impedance, or cores",
  "You need — a roof map and NRCA guidelines",
  "Not needed on metal roofs",
], first ? {
  key: "The 25% rule: more than a quarter wet means it's not a restoration job.",
  say: "You can't see wet insulation from the top. The scan finds it. If more than 25% of the roof is wet, we don't restore it. If it's less, we cut out the wet spots, replace them, and keep going.",
  stick: "Coating over wet insulation is like putting a new bandage over an infected cut. It looks fine — until it doesn't.",
  ask: "\"On a 100-square roof, how many squares can be wet and still be a candidate?\" (Up to 25.)",
} : REVIEW("the moisture survey and the 25% rule"));

const drone = (first) => pic("Drone Moisture Scan", "Hot spots on the heat scan can mean trapped water under the roof.", first ? {
  key: "A drone heat scan shows wet areas you can't see from the roof.",
  say: "Wet insulation holds heat longer, so it shows up brighter on the scan. Each bright spot is a place to check with a core cut.",
  ask: "\"Where would you cut a core on this roof?\"",
} : REVIEW("drone heat scans"));

const repairs = (first) => txt("Step 4: Repair First, Then Restore", [
  "Replace wet insulation",
  "Replace damaged deck",
  "Fill damaged spots with matching roof material",
  "The roof must be solid and watertight before you coat it",
], first ? {
  key: "Repair first, then restore. Coating does not fix a broken roof.",
  say: "Coating protects a roof. It doesn't fix one. Get the roof solid and dry first. Then coat it.",
  stick: "You don't paint over rotten wood. Same idea.",
  ask: "\"What's the worst thing you've seen someone coat over?\"",
} : REVIEW("repair first, then restore"));

const cleaning = (first, types) => {
  const all = {
    mod: "Mod-bit and BUR (granulated or smooth) — power broom, dry vac, air lance (195 CFM)",
    sp: "Single-ply — pressure wash at 1,500–2,000 PSI. Water only!",
    metal: "Metal — pressure wash at 3,000+ PSI. Water only! Air lance. Wire brush the rust.",
  };
  return txt("Prep Step 1: Clean the Roof", [...types.map((t) => all[t]), "Rule — all dirt gone and the roof DRY before any coating"],
    first ? {
      key: "Coating sticks to whatever is on the roof. Make sure that's the roof — not dirt.",
      say: "Each roof type gets cleaned a little differently. Granulated and smooth asphalt: sweep, vacuum, blow it out. Single-ply and metal: pressure wash with plain water — no soap. Metal gets more pressure and a wire brush on rust. Then let it dry.",
      stick: "Paint on a dusty wall peels. Coating on a dirty roof peels. Most adhesion problems start right here.",
      ask: "\"Why water only — no soap?\" (Soap leaves film behind, and coating won't stick to film.)",
    } : REVIEW("cleaning by roof type — and the dry-roof rule"));
};

const details90 = (first) => txt("Sweat the Details", [
  "Seams",
  "Penetrations — pipes, vents, drains",
  "Curbs",
  "Edges (terminations)",
  "Transitions — where the roof changes",
  "Parapet walls",
], first ? {
  key: "90% of roof leaks start at these spots. Seal them first.",
  say: "Most of the roof is wide-open field. Leaks almost never start there. They start where something cuts through or changes. Do these first, and do them right.",
  stick: "A boat doesn't sink through the middle of the hull. It leaks at the seams and the holes.",
  ask: "\"Name the last leak you chased. Where was it?\" (It's almost always one of these.)",
} : REVIEW("the six detail areas where 90% of leaks start"), { big: "90%", bigLabel: "of roof leaks start at these spots" });

const gridSlide = (first, rate, product, covers) => txt("Measure the Roof in Squares", [
  "Mark the roof in 10' × 10' boxes — 1 box = 1 square = 100 sq ft",
  `Example — spec says ${rate} gal per square → one 5-gal pail of ${product} covers ${covers} squares (smooth roof)`,
  "Rough roofs (granulated mod-bit) soak up more — use more to hit the right dry thickness",
], first ? {
  key: "Mark the squares. Count the pails. Hit the rate.",
  say: "Chalk out 10 by 10 boxes. Each box is one square. Now you know exactly how many pails each area needs, and nobody runs thin. Rough roofs eat more coating, so plan for extra.",
  stick: "A 10' × 10' square is about the size of a small bedroom. Picture filling that room's floor with the right number of gallons.",
  ask: `"Spec is ${rate} gallons a square. You have 10 squares. How many gallons?" (${+(rate * 10).toFixed(1)}.)`,
} : {
  key: `This system: ${rate} gal per square → one 5-gal pail covers ${covers} squares.`,
  say: "Same grid method as before. Only the rate changes. Have the crew do the math out loud.",
  ask: `"Spec is ${rate} gallons a square. You have 10 squares. How many gallons?" (${+(rate * 10).toFixed(1)}.)`,
});

const method = (name, first, tip) => pic("Ways to Apply: " + name, tip, first ? {
  key: `${name} is one of the ways to put this coating down.`,
  say: `Walk through the photo. ${tip} Pick the method that fits the roof size, the crew, and the weather.`,
  ask: "\"Who here has used this method? Any tips for the new folks?\"",
} : REVIEW(`applying by ${name.toLowerCase()}`));

const warrantyChart = (sys) => pic(`${sys} Warranty Options`, "Pick the warranty length. The chart tells you how much coating and how many coats you need.", {
  key: "Longer warranty = more coating. The chart tells you exactly how much.",
  say: "Don't read this chart out loud. Show how to use it: find the roof type, find the warranty years, read across to the rate. Hand out the printed chart so the crew can follow along.",
  ask: "\"Find the rate for a 10-year warranty on a smooth asphalt roof.\" Let them find it.",
}, { ref: true });

const appGuide = (sys) => pic(`${sys} Application Guide`, "Your step-by-step guide for this system. Keep it on the job.", {
  key: "The application guide is the rulebook. When in doubt, check the guide.",
  say: "This is the reference sheet for the whole system: prep, primers, rates, and cure times. Print it. Keep it in the truck.",
}, { ref: true });

const tpoPrimer = (first) => txt("Prime-Tek TPO Primer", [
  "Helps coating stick to TPO roofs",
  "For TPO only",
  "Use under AcryShield acrylics and Pro-Grade 988 silicone",
  "Dries fast. Low fumes (low VOC).",
  "Red — 5-gal pail",
], first ? {
  key: "TPO is slick. This primer gives the coating something to grab.",
  say: "TPO is smooth and slippery — coatings have a hard time holding on. This red primer fixes that. It's only for TPO.",
  stick: "It's red, so you can see where you've been — no missed spots.",
} : REVIEW("Prime-Tek TPO primer — TPO only"));

const emulsion197 = (first) => txt("Pro-Grade 197 Asphalt Emulsion", [
  "Cold-applied coating for asphalt roofs",
  "Keeps water out and smooths rough spots",
  "Adds life to the old roof",
  "Low odor. Meets VOC rules everywhere.",
  "Must be topcoated — with acrylic or aluminum",
  "Black — 5-gal, 55-gal, 275-gal tote, bulk",
], first ? {
  key: "197 is the black base layer. It always needs a topcoat.",
  say: "This is a cold asphalt coating. No kettle, no torch. It fills and levels the old asphalt. But the sun breaks it down, so it must be covered with acrylic or aluminum.",
  stick: "Think of 197 as primer on a car. It's important — but you'd never leave the car in primer.",
} : REVIEW("197 emulsion — and why it always gets a topcoat"));

const seam295 = (first) => txt("Henry 295 Metal Seam Sealer", [
  "Rubber-based (SEBS) sealant for metal roofs",
  "Strong and stretchy",
  "For seams that move less than 1/8\"",
  "No fabric needed",
  "Can be coated over — water-based, solvent-based, or aluminum coatings",
  "Brush, pump spray, or bulk gun",
  "Off-white — 5-gal pail",
], first ? {
  key: "295 seals metal seams and screws — no fabric needed.",
  say: "Metal roofs move with heat and cold. This sealer moves with them. Use it on seams, fasteners, penetrations, and flashings. Seams must move less than an eighth of an inch.",
  ask: "\"How do you know if a seam moves more than 1/8 inch?\"",
} : REVIEW("295 metal seam sealer"));

const sealant289 = (first) => txt("Henry 289 White Roof Sealant", [
  "Acrylic patching compound",
  "Use on dry or damp roofs — not wet",
  "Ready to use. Skins over fast.",
  "Won't bleed through white coatings",
  "Trowel or brush — up to 1/4\" thick",
  "For pipes, flashings, drains, seams, fasteners, repairs",
  "White — 3.5-gal, 1-gal, 10.1 oz tube",
], first ? {
  key: "289 is the white patch for acrylic jobs. Damp is OK. Wet is not.",
  say: "Use it to patch and seal details before the acrylic goes on. It stays white, so it won't stain your topcoat.",
  ask: "\"What's the difference between damp and wet?\" (Damp: dark but no standing water. Wet: you can see water.)",
} : REVIEW("289 white roof sealant"));

const fabric195 = (first) => txt("Henry 195 / 196 Polyester Fabric", [
  "195 — soft. Bends around odd shapes.",
  "196 — firmer.",
  "Both — strong stitched polyester",
  "For drains, seams, and repairs",
  "195 rolls — 40\" × 324', 12\" × 300', 6\" × 300'",
  "196 rolls — 40\" × 324', 4\" × 300'",
], first ? {
  key: "Fabric adds strength where the roof moves or cracks.",
  say: "Lay fabric into wet coating at seams, drains, and repairs. Use 195 when you need it to wrap around shapes. Use 196 when you want it stiffer.",
  stick: "Fabric in coating works like rebar in concrete: it holds everything together.",
} : REVIEW("195/196 polyester fabric"));

const fabric183 = (first) => txt("Henry 183 Yellow Fiberglass Repair Fabric", [
  "Woven glass fabric with a yellow coating",
  "Stands up to acid and heat. Won't rot.",
  "Works with asphalt, emulsions, and coatings",
  "For penetrations, flashings, seams, repairs",
  "Rolls — 4\" × 150', 6\" × 25', 36\" × 150'",
], first ? {
  key: "183 is the tough repair fabric for asphalt work.",
  say: "Pair it with mastic or flashing cement to reinforce a repair. It won't rot, so the repair lasts.",
} : REVIEW("183 yellow fiberglass fabric"));

const cement167 = (first) => txt("Pro-Grade 167 Extreme Rubberized Flashing Cement", [
  "Our best roof cement — for permanent repairs",
  "Apply in wet or dry weather",
  "Rubber (SEBS) + UV protection for long life",
  "Works from -20°F to 140°F",
  "Sticks 100% underwater (ASTM D3409)",
  "Meets ASTM D4586. Miami-Dade approved.",
  "Black — 1-gal can, 3-gal pail",
], first ? {
  key: "167 works in almost any weather — even underwater.",
  say: "This is the top-of-the-line cement. Rain, cold, heat — it still goes on and still sticks. Good for permanent repairs, not just quick fixes.",
  ask: "\"When would you grab 167 instead of a cheaper cement?\"",
} : REVIEW("167 Extreme flashing cement"));

const alu588 = (first) => txt("Pro-Grade 588 Aluminum Roof Coating", [
  "Water-based, fibered aluminum coating",
  "Low fumes — made for Southern California rules",
  "Aluminum flakes reflect the sun",
  "UL, CRRC, and Energy Star rated",
  "Silver — 5-gal, 50-gal",
], first ? {
  key: "588 is the low-fume aluminum — use it where VOC rules are strict.",
  say: "Same shiny protection, but water-based. If the job is in an area with strict VOC rules, like Southern California, this is your aluminum.",
} : REVIEW("588 water-based aluminum"));

const alu586 = (first) => txt("Pro-Grade 586 Aluminum Roof Coating", [
  "Fire-rated, fibered aluminum coating",
  "For smooth BUR, mod-bit, aged metal, and new emulsion",
  "Solvent-based. One coat.",
  "UL, FM, CRRC, Miami-Dade, and Energy Star rated",
  "Silver — 5-gal, 50-gal",
], first ? {
  key: "586 is the fire-rated, one-coat aluminum.",
  say: "Solvent-based, so it goes on in one coat and carries a fire rating. Strong approvals list, including FM and Miami-Dade.",
} : REVIEW("586 fire-rated aluminum"));

const alu599 = (first) => txt("Pro-Grade 599 Rubberized Aluminum Coating", [
  "Aluminum with SBS rubber — strong and stretchy",
  "Holds up better to ponding water",
  "Solvent-based. One coat.",
  "For BUR, mod-bit, and metal roofs",
  "CRRC, Miami-Dade, Energy Star (low and steep slope)",
  "Silver — 5-gal, 50-gal",
], first ? {
  key: "599 is our best aluminum. The rubber makes it tougher.",
  say: "Rubber in the mix lets it stretch with the roof and handle some ponding water. If the customer wants the best aluminum, this is it.",
} : REVIEW("599 rubberized aluminum"));

const ac505 = (first) => txt("AcryShield 505 Basecoat", [
  "Water-based basecoat. Low fumes.",
  "For BUR, mod-bit, metal, single-ply, and asphalt emulsion",
  "Blocks asphalt stains from bleeding through",
  "Strong ponding water resistance",
  "Sticks well to a clean, prepped roof",
  "Beige — 5-gal, 55-gal",
], first ? {
  key: "505 is the go-to basecoat. It stops asphalt stains.",
  say: "Put 505 down first, then your topcoat. It's beige so you can see it's on, and it keeps the black asphalt from bleeding into the white topcoat.",
} : REVIEW("505 basecoat"));

// ===================================================================
sec("Welcome");
cover("Henry Roof Restoration & Repair", "Gold Seal Training — Save the roof. Don't replace it.", {
  key: "Today you'll learn how to bring an old roof back to life — and how to get Henry's best warranty behind your work.",
  say: "Welcome. Over the next sessions we'll cover how to tell if a roof can be saved, how to do the work right, and how to get it warranted. No test at the end. Just ask questions as we go.",
  stick: "Start with a story: a roof you saved that the owner thought was a goner. People remember stories, not bullet points.",
  ask: "\"Raise your hand if you've ever coated a roof.\" This tells you who your experts are, so you can call on them later.",
});
txt("What We'll Cover", [
  "Who Henry is",
  "How roofs age — and your options",
  "Is this roof worth saving?",
  "The restoration steps",
  "Our four coating systems and repair products",
  "Warranties, inspections, and support",
], {
  key: "Here's the road map. Six stops.",
  say: "Read the list once, fast. Tell them when breaks are. Tell them it's OK to stop you and ask.",
  stick: "The four icons stand for what a good roof does: keeps water out, controls air, saves energy, and lasts.",
  ask: "\"What's one thing you want to walk out of here knowing?\" Write answers on a flip chart and check them off at the end.",
});
txt("Who Is Henry? — For Building Owners", [
  "90+ years helping commercial roofs last longer",
  "Coatings that add years to an old roof",
  "Cooler roofs — lower power bills",
  "Check-up plans that catch problems early",
  "Less old roofing in the landfill",
], {
  key: "For owners, Henry means more years from the roof they already paid for.",
  say: "This is how we talk to building owners. They care about money, time, and fewer headaches. Our coatings give them more life from the roof they already have.",
  stick: "Henry's motto is \"the gift of time.\" Time is what an owner buys when they restore instead of replace.",
});
txt("Who Is Henry? — For You, the Contractor", [
  "One full system — less time on the roof",
  "A brand your customers trust",
  "We send you leads — more time working, less time hunting",
  "Training that makes your crew faster",
], {
  key: "For contractors, Henry means easier jobs, more jobs, and backup when you need it.",
  say: "This one's about you. One system that works together. Leads from us. Training like today. And people to call when you're stuck.",
  ask: "\"What slows your crew down most on a coating job?\" Keep that answer in mind — we'll come back to it.",
});
txt("We Cover the Whole Building", [
  "Walls — air barriers, flashings, sealants",
  "Below ground — waterproofing",
  "Roof — coatings, underlayments, flashings, mod-bit, green roofs",
  "Other — paving care and specialty products",
], {
  key: "Henry protects the whole building, from the foundation to the roof.",
  say: "Each red dot on the drawing is a product area. Today we focus on one: roof restoration coatings.",
});
txt("Our Story in Five Dates", [
  "1933 — Henry starts",
  "1981 — Henry incorporates",
  "2020 — Henry buys National Coatings, known for strong acrylics",
  "2021 — Carlisle buys Henry. One company now covers the building from below ground to the roof.",
  "2023 — Henry, Carlisle coatings, and National Coatings join as one: Henry, a Carlisle Company",
], {
  key: "Over 90 years old, and now part of Carlisle — one of the biggest names in roofing.",
  say: "Keep this short. The point: we've been around a long time, and we keep getting stronger.",
});
pic("One Team: Henry + Carlisle + National Coatings", "Three strong brands. One name: Henry.", {
  key: "Three companies came together. You deal with one name: Henry.",
  say: "If you used Carlisle coatings or National Coatings before, those products now live under Henry.",
});
pic("Henry vs. the Competition", "Henry makes every type of coating on this chart. Most brands don't.", {
  key: "One supplier for every coating type: silicone, acrylic, aluminum, emulsion, foam, and mastics.",
  say: "Look at the top row — all green checks. That means whatever the roof needs, you can get it from one place, with one warranty.",
  ask: "\"Why does one supplier for everything matter to you?\" (One call, one warranty, one rep.)",
});
txt("Five Choices for Any Roof", [
  "New — a brand-new roof on a new building",
  "Repair — fix small problems to keep a roof going",
  "Restore — coat the roof you have (today's focus)",
  "Recover — put a new roof over the old one",
  "Replace — tear it all off and start over",
], {
  key: "Restore sits in the sweet spot: less cost and mess than recover or replace.",
  say: "Every roof goes around this circle. Restoration is the step that buys the most years for the least money — if we catch the roof in time.",
  stick: "Like a car: oil changes (repair), a rebuild (restore), or a new car (replace). Most people wait too long and end up buying new.",
});
txt("Every Roof Wears Out", [
  "Sun and heat break roofs down over the years",
  "Old roofs start to leak — and owners think \"replace it\"",
  "Often only 5–10% needs repair",
  "The rest can be restored",
], {
  key: "A leaking roof is not always a dead roof.",
  say: "When an owner sees a leak, they think the whole roof is shot. Usually it's not. Most of the time a small part needs fixing and the rest just needs a new coat.",
  stick: "One bad tooth doesn't mean you pull them all.",
  ask: "\"How many of you have walked a 'dead' roof that was actually 90% fine?\"",
});
compare("Restore or Replace?", [
  { head: "Replace", items: ["Big up-front cost", "Business gets disrupted", "Tons of waste"] },
  { head: "Restore", items: ["Coat the roof you have", "A fraction of the cost", "Adds years of life", "Works if less than 25% needs replacing"] },
], {
  key: "If less than 25% of the roof needs replacing, restore it.",
  say: "Every owner will face this choice. Replacement costs a lot and shuts things down. Restoration costs a fraction and adds years. But there's a window — wait too long and restoration is off the table.",
  stick: "Remember the number 25. Under 25% bad: restore. Over 25%: replace.",
  ask: "\"What's the magic number?\" (25%.) Ask it again later in the day.",
});
txt("Why Building Owners Like It", [
  "Lowest up-front cost",
  "Little waste to haul away",
  "Possible tax breaks and rebates",
  "Lower energy bills",
  "Fewer repairs",
  "Shields the roof from sun, hail, foot traffic, chemicals, and heat swings",
  "Can be recoated again later",
], {
  key: "Owners save money now and later.",
  say: "These are the selling points for the owner. Pick the two or three that matter most to the customer in front of you — don't read them the whole list.",
  ask: "\"Which one of these would your customers care about most?\"",
});
txt("Why Contractors Like It", [
  "Spray or roll — less labor",
  "Low equipment cost",
  "Safer — no hot tar, no torches",
  "New workers learn it fast",
  "Easy to set up and move",
  "Repeat work — maintenance for the life of the building",
  "Henry helps you sell it",
], {
  key: "Restoration is safer, faster work — and it brings you back to the same roof for years.",
  say: "No kettles, no torches. Easier to train new hires. And once you coat a roof, you can keep that customer for maintenance.",
  ask: "\"What's the hardest part of training a new guy on hot work?\" Compare that to rolling coating.",
});
txt("Make the Old New Again", [
  "Restoring makes a roof watertight again",
  "It also makes the roof save energy again",
  "Same roof — works and looks like new",
], {
  key: "Restoration is a rebuild, not a cover-up.",
  say: "Look at the car. Same car, same frame. Fixed up, it runs and looks great. That's what we do to a roof.",
  stick: "Nobody junks a classic car because the paint faded. Same with a roof that's still solid underneath.",
});
add({
  kind: "rules", title: "Is the Roof a Good Fit? Three Rules", rules: [
    ["Clean", "Dirt, oil, and loose stuff removed"],
    ["Dry", "No water trapped inside"],
    ["Sound", "Solid deck, no big damage"],
  ], notes: {
    key: "Clean. Dry. Sound. If a roof fails one, it's not ready.",
    say: "This is the most important slide today. Every roof we restore has to pass all three. If it's dirty, we clean it. If it's wet, we dry or replace the wet part. If it's not solid, we repair it first — or walk away.",
    stick: "Say it out loud together: \"Clean, dry, sound.\" Repeat it at the end of every section today.",
    ask: "\"Give me an example of a roof that's clean and dry but NOT sound.\"",
  }
});
pic("Good Fit or Not? (1)", "Green check = good candidate. Red X = not ready.", {
  key: "Use Clean, Dry, Sound to judge each photo.",
  say: "Don't tell them the answer. Point at each photo and let the room decide. Then reveal why.",
  ask: "\"Why does the top-right one get an X?\" (Not sound — the deck is damaged.)",
});
pic("Good Fit or Not? (2)", "Practice: which rule does each red X break?", {
  key: "More practice. The crew should be calling these on their own now.",
  say: "Same game. This time, have someone else explain each answer.",
  ask: "\"Which rule — clean, dry, or sound — does each X break?\"",
});

// ===================================================================
sec("Silicone");
div("Pro-Grade 988 Silicone System", "Silicone: the best choice where water sits.", {
  key: "Section 1 of 4: Silicone.",
  say: "We start with silicone because it's our strongest system and it handles the hardest problem on flat roofs: standing water.",
});
txt("Silicone: The Strengths", [
  "Stays flexible from -15°F to 180°F",
  "Stretches without cracking. Sticks very well.",
  "Water can't soak through it",
  "Cures from moisture in the air — standing water won't soften it",
  "Holds up to sun — loses only about 0.1 mil a year",
  "90%+ solids — more of what you spray stays on the roof",
  "Apply at 35°F and rising. Low fumes. Won't chalk.",
], {
  key: "Silicone stays put — through heat, cold, sun, and standing water.",
  say: "High solids means when you put 10 gallons down, about 9 stay on the roof. It cures with moisture, so ponding water can't turn it back to goo.",
  stick: "Fun fact: silicon is the second most common element on Earth — about 27% of the earth's crust. It's basically made from sand.",
  ask: "\"Why do high solids matter to you as the installer?\" (Less material, thicker film, fewer coats.)",
});
txt("Silicone: The Downsides", [
  "Picks up dirt more easily",
  "Only silicone sticks to silicone later",
  "Asphalt can stain through — needs a basecoat",
  "Harder to clean tools and spray rigs",
  "Needs commercial spray equipment",
  "Many crews haven't used it yet — newer tech (about 20 years)",
], {
  key: "Know the downsides so you can plan for them — not so you avoid silicone.",
  say: "Be honest with customers about this. Most of these have a fix: our 988 resists dirt, the 294 basecoat stops asphalt stains, and training fixes unfamiliarity.",
  stick: "Silicone is a one-way street: once a roof is silicone, it stays silicone.",
});
txt("When Silicone Is a Good Fit", [
  "Flat roofs",
  "Low slopes — 3:12 or less",
  "Very hot or very cold places",
  "Max sun protection",
  "Areas where water sits*",
], {
  key: "Flat, low-slope, harsh weather, ponding water: think silicone.",
  say: "Ponding water is where silicone shines. But read the footnote: puddles, not lakes. The roof still has to drain.",
}, { foot: "*Puddles, not lakes. The roof must still drain." });
txt("When Silicone Is NOT a Good Fit", [
  "Deep standing water* — lakes on the roof",
  "Steep roofs — more than 3:12",
  "Barrel (curved) roofs",
  "Heavy foot traffic areas",
], {
  key: "Steep, curved, high-traffic, or swimming-pool roofs: pick something else.",
  say: "Silicone runs on steep slopes and gets slick to walk on. On a roof with heavy foot traffic, use a tougher topcoat or add walk pads.",
  ask: "\"A roof holds 4 inches of water for a week after rain. Silicone?\" (No — fix the drainage first.)",
}, { foot: "*Silicone handles puddles — not swimming pools." });
div("What Roofs Can Silicone Restore?", "Silicone works on almost every roof type.", {
  key: "Next: a quick photo tour of roof types silicone can restore.",
  say: "Keep these fast — about 20 seconds each. The point is: silicone goes on almost anything.",
});
pic("Asphalt Roofs", "Granulated or smooth mod-bit, and BUR (built-up roof).", roofTypeNotes("asphalt roofs — granulated or smooth mod-bit, and built-up (BUR) roofs", "Over asphalt, use the 294 basecoat first to stop stains."));
pic("Single-Ply Roofs", "TPO, PVC, and EPDM.", roofTypeNotes("single-ply roofs — TPO, PVC, and EPDM", "Single-ply always needs an adhesion test."));
pic("Metal Roofs", "Standing seam and screw-down metal.", roofTypeNotes("metal roofs", "Metal always needs an adhesion test. No moisture survey needed."));
pic("Roofs Coated Before", "Old coatings can be restored — after an adhesion test.", roofTypeNotes("roofs that were coated before", "Always test adhesion over an old coating."));
pic("Spray Foam (SPF) Roofs", "Silicone protects foam from the sun.", roofTypeNotes("spray foam (SPF) roofs"));
pic("Tar & Gravel Roofs", "Not ready as-is (red X). The gravel has to be dealt with first.", roofTypeNotes("tar and gravel roofs — once the gravel is handled", "Loose gravel can't be coated over."));
pic("Tar & Gravel + Spray Foam", "Spray foam over the old gravel roof, then coat it.", roofTypeNotes("tar and gravel roofs with spray foam on top", "Foam creates a new, smooth surface. Then silicone protects the foam."));
div("Silicone Restoration Steps", "Repair first, then restore.", {
  key: "Now: how we do a silicone job, start to finish.",
  say: "These steps are the same for every system. Learn them once here; we'll just review them later.",
});
restoreSteps(true);
inspect(true, true);
adhesion(true);
pullTest(true);
moisture(true);
drone(true);
repairs(true);
div("Complete Line of Products", "One system, one brand — saves you time and money.", {
  key: "Next: the silicone products, and what each one is for.",
  say: "Don't memorize numbers. Learn what job each product does.",
});
txt("Silicone Product Lineup", [
  "Coating — Pro-Grade 988 Silicone",
  "Sealers — 957 Fibered, 923 Butter Grade, 928 Pitch Pocket, 920 White",
  "Reinforcement — Seal-Tek Micro Fibers",
  "Basecoat — 294 Basecoat & Sealer",
  "Primers — Prime-Tek TPO, Prime-Tek GP, 941 Adhesion",
], {
  key: "One coating, four sealers, one basecoat, three primers. Everything you need for a silicone job.",
  say: "Group them by job: the coating covers the field, sealers do the details, the basecoat stops stains, primers help it stick.",
  ask: "\"Which product would you grab for a pipe boot?\"",
});
div("The 988 Silicone Difference", "One coat. Rain-safe in 15 minutes.", {
  key: "Why 988 beats other silicones.",
  say: "Three things to remember about 988: one coat, often no primer, and rain-safe in 15 minutes.",
});
txt("Pro-Grade 988: What It Is", [
  "Silicone rubber coating. No solvent.",
  "Goes on asphalt, single-ply, metal, foam, and coated roofs",
  "One coat — up to 50 mils",
  "Usually no primer needed*",
  "Rain-safe in 15 minutes",
  "No fabric needed",
  "Stays whiter longer — new dirt-resistant formula",
  "Passes ASTM D7281 (water test)",
], {
  key: "988 saves you a trip: one coat, often no primer, no fabric.",
  say: "Most silicones need two coats. 988 goes on up to 50 mils in one pass. That's one less day on the roof. And if a storm pops up, it's rain-safe in 15 minutes.",
  stick: "50 mils is about the thickness of a credit card plus a bit. In one coat.",
  ask: "\"What does one coat instead of two save you on a 200-square roof?\"",
}, { foot: "*Do an adhesion test first. Over asphalt, use 294 Basecoat & Sealer to stop stains." });
txt("Pro-Grade 988: More Facts", [
  "No chalk filler — some brands are up to 50% chalk",
  "Safe for rainwater collection (NSF P151)",
  "Low fumes — under 10 g/L VOC",
  "2-year shelf life — unopened, kept cool, dry, and shaded",
  "White, gray, tan — premium and custom colors too",
  "5-gal pail or 55-gal drum",
], {
  key: "No cheap filler. Safe for rainwater. Long shelf life.",
  say: "Chalk is cheap filler. It makes a coating cheaper — and weaker. 988 has none.",
  stick: "Half-chalk silicone is like half-water coffee. Cheaper, but you notice.",
});
pic("988 Stays Cleaner", "Dirt test: Henry 988 vs. a competitor. Ours stays whiter, longer.", {
  key: "A cleaner roof stays cooler and looks better to the owner.",
  say: "Silicone's weak spot is dirt. 988's new formula fights that. Point at the panels: same dirt, less staining on ours.",
});
pic("Rain Can't Wash It Off", "Both dried 15 minutes, then 30 minutes of heavy rain. 988 held. The competitor didn't.", {
  key: "Rain-safe in 15 minutes means a pop-up storm won't ruin your day.",
  say: "Left: 988 after rain — smooth. Right: the competitor — washed out. Ask: what does it cost you to redo a section after rain?",
  ask: "\"Ever lost a day's work to a surprise shower?\"",
});
txt("Why ASTM D7281 Matters", [
  "This test proves the coating is truly waterproof",
  "Seals the leak spots — edges, pipes, and details",
  "One seamless skin over the whole roof",
  "Standing water can't get through",
], {
  key: "D7281 is the proof: the coating keeps water out, even when it sits.",
  say: "You don't need to remember the test number. Remember what it means: water can sit on this coating and not get through.",
  stick: "Like a rain jacket vs. a sweatshirt. Both cover you. Only one keeps you dry.",
});
div("Silicone Sealers & Primers", "Seal the details with the right product.", {
  key: "The products that do the detail work.",
  say: "Remember — 90% of leaks start at the details. These are your detail tools.",
});
txt("Pro-Grade 923 Butter Grade Silicone Sealer", [
  "Ready to use — no mixing",
  "Tough and flexible",
  "Brush, trowel, or spreader — up to 1/4\" thick",
  "Works on walls and flat areas",
  "For pipes, flashings, seams, fasteners, repairs",
  "White — 2-gal pail",
], {
  key: "923 is thick like butter. Use it on details.",
  say: "Spreads like butter, stays where you put it. Good for walls and flat details up to a quarter inch thick.",
});
txt("Pro-Grade 957 Fibered Silicone Sealer", [
  "Ready to use — no mixing",
  "Fibers add strength",
  "Trowel on — up to 1/2\" thick",
  "Works on walls and flat areas",
  "For pipes, flashings, drains, seams, fasteners, repairs",
  "White — 2-gal pail",
], {
  key: "957 has fibers and goes on twice as thick as 923.",
  say: "When the gap is bigger, reach for 957. Fibers let it go on up to half an inch.",
  ask: "\"Gap is 3/8 inch. 923 or 957?\" (957.)",
});
txt("Pro-Grade 928 Pitch Pocket & Self-Leveling Sealer", [
  "Pours in and levels itself",
  "Seals pipes in metal pitch pockets — no shrinking",
  "Seals screws on low and medium-slope metal roofs",
  "One tube seals about 100 fasteners (1/2\")",
  "No tooling needed — saves time",
  "Black — 10.1 oz tube",
], {
  key: "928 pours and levels itself. Great for pitch pockets and screw heads.",
  say: "Fill the pocket, walk away. No tooling. On metal roofs, a dab on each screw — about 100 screws per tube.",
});
txt("Pro-Grade 920 Silicone Roof Sealer", [
  "Silicone caulk that cures from moisture",
  "Seals seams, concrete cracks, flashings, drains, and damage",
  "One tube seals about 100 holes (1/2\")",
  "Won't harden, chalk, crack, or break down",
  "White — 10.1 oz tube",
], {
  key: "920 is the silicone caulk for small holes and cracks.",
  say: "Quick, clean fixes from a tube. About 100 half-inch holes per tube.",
});
txt("Pro-Grade 294 Basecoat & Sealer", [
  "Acrylic basecoat that blocks asphalt stains",
  "Spray, roll, or brush",
  "Always the first step on asphalt roofs!",
  "Gray — 5-gal, 55-gal, 275-gal tote",
], {
  key: "Asphalt roof? 294 goes on first. Every time.",
  say: "Asphalt oils bleed up and stain a white topcoat brown. 294 locks them in.",
  stick: "Like stain-blocking primer over a water spot on a ceiling. Skip it and the stain comes right back through.",
  ask: "\"What happens if you skip 294 on a mod-bit roof?\" (Brown stains in the white silicone.)",
});
tpoPrimer(true);
txt("Pro-Grade 941 Adhesion Primer", [
  "Helps coating stick to single-ply, metal, and coated roofs",
  "Dries fast",
  "Spray (best), roll, or brush",
  "Covers 400–600 sq ft per gallon",
  "Clear / yellow — 1-gal can",
], {
  key: "If the adhesion test says you need help, 941 is the help.",
  say: "Use 941 when the pull test comes back weak. Spray it thin — a gallon goes 400 to 600 square feet.",
});
div("Project Startup", "A clean, dry roof is half the job.", {
  key: "Prep: where good jobs are won or lost.",
  say: "Most coating failures start with bad prep. This section is short, but it matters most.",
});
cleaning(true, ["mod", "sp", "metal"]);
txt("Prep Step 2: Basecoat Asphalt Roofs", [
  "For asphalt roofs, or roofs with an old aluminum coating",
  "Apply Pro-Grade 294 Basecoat & Sealer",
  "Roll, squeegee and back roll, spray and back roll, or tank spreader",
], {
  key: "Asphalt or old aluminum? Basecoat with 294 before the silicone.",
  say: "Any method works. Just make sure it's covered evenly, with no bare spots.",
});
txt("Prep Step 3: Prime If Needed", [
  "For single-ply, metal, and coated roofs",
  "Use Pro-Grade 941 Adhesion Primer — if the pull test says so",
  "Spray it — a Chapin Extreme pump sprayer works best",
], {
  key: "The pull test decides if you prime. Don't guess.",
  say: "No need to prime everything. Test first. If the test is weak, prime.",
});
details90(true);
table("Which Product for Which Detail?", ["Roof", "Detail", "Product → How"], [
  ["Asphalt / single-ply", "Seams", "988 → brush, roll, spray\n923 → brush, trowel\n957 → trowel"],
  ["Asphalt / single-ply", "Pipes and drains", "923 → brush, trowel\n957 → trowel"],
  ["Metal", "Seams, pipes, fasteners", "923 → brush, trowel\n957 → trowel\n928 → caulk gun"],
], {
  key: "Match the product to the detail.",
  say: "Hand out this chart. It's a cheat sheet. Go row by row: roof type, the detail, the product to use.",
  ask: "\"Metal roof, a hundred screw heads. What's fastest?\" (928 from a caulk gun.)",
});
div("Silicone Application", "Measure the squares. Hit the rate.", {
  key: "Putting the coating down.",
  say: "Two things decide a good application: the right amount and even coverage. The grid gets you both.",
});
gridSlide(true, 2, "988", 2.38);
method("Roll", true, "Roll it on in even passes. Good for small roofs and edges.");
method("Squeegee and Back Roll", true, "Pour, spread with a squeegee, then roll to even it out.");
method("Spray and Back Roll", true, "Spray for speed, then roll to push it into the surface.");
method("Tank Spreader", true, "Walk-behind spreader puts down an even coat on big, open areas.");
div("Warranty Information", "Do it right, and Henry stands behind it — up to 20 years.", {
  key: "What the silicone warranty covers.",
  say: "This is what the owner is really buying: years of peace of mind.",
});
txt("Henry Warranty Program", [
  "Up to 20 years — labor, workmanship, and materials",
  "Can be transferred and renewed",
  "Silicone — ponding water is NOT excluded*",
  "Silicone — lifetime limited material warranty",
], {
  key: "Up to 20 years, and ponding water is covered on silicone.",
  say: "Most warranties say \"no coverage where water ponds.\" Ours doesn't — on silicone. That's a big selling point.",
  stick: "Tell the owner: \"Even where water sits, you're covered.\"",
}, { foot: "*Puddles, not lakes. The roof must still drain." });
warrantyChart("Silicone");
warrantyChart("Silicone");
appGuide("Silicone");

// ===================================================================
sec("Acrylic");
div("AcryShield Acrylic System", "Acrylic: great value on roofs that drain well.", {
  key: "Section 2 of 4: Acrylic.",
  say: "Acrylic is the budget-friendly workhorse. Great on sloped roofs and metal. The catch: it hates standing water.",
});
txt("Acrylic: The Strengths", [
  "Flexible and stretchy",
  "Sticks well",
  "Easy to apply — spray, brush, or roll",
  "Breathes — lets moisture vapor escape",
  "Other coatings can go over it later",
  "Good value. Low fumes.",
], {
  key: "Acrylic is easy, affordable, and flexible.",
  say: "Easy to put down, easy to clean up, and you can coat over it later with almost anything.",
});
txt("Acrylic: The Downsides", [
  "Standing water softens it",
  "Needs 2 or more coats",
  "Weather matters — 50°F and rising, no rain for 24+ hours",
  "Can wash off if it rains too soon",
  "Takes longer to cure",
  "Mold and mildew can grow on it",
  "Loses about 1–2 mils a year to sun. Only about 50% solids.",
], {
  key: "Acrylic needs warm, dry weather and a roof that drains.",
  say: "Water-based means rain is its enemy until it cures. Watch the forecast. And half of what's in the bucket evaporates — that's why it takes more coats.",
  stick: "Acrylic is like latex house paint. Great stuff — but you don't paint in the rain.",
  ask: "\"Forecast says rain in 18 hours. Do you spray acrylic today?\" (No — it needs 24.)",
}, { foot: "There are 380+ acrylic brands. Many use cheaper ingredients (styrene, vinyl)." });
txt("When Acrylic Is a Good Fit", [
  "Steep roofs — 3:12 or more",
  "Metal roofs",
  "Flat roofs* — only in dry areas with great drainage",
  "Barrel (curved) roofs",
  "Hot, dry climates",
  "Little disruption. Budget-friendly.",
], {
  key: "Sloped, metal, curved, or dry climates: think acrylic.",
  say: "Notice this is the opposite of silicone. Where silicone runs off, acrylic holds.",
}, { foot: "*Areas with little rain and good drainage — no ponding water." });
txt("When Acrylic Is NOT a Good Fit", [
  "Ponding water",
  "Flat roofs* that don't drain",
  "Heavy foot traffic",
  "Max sun protection needed",
  "Lots of freeze-thaw cycles",
], {
  key: "Standing water and acrylic don't mix.",
  say: "If water sits on the roof after a rain, acrylic will soften and fail. Pick silicone instead.",
  ask: "\"Flat roof in Florida with ponding. Acrylic or silicone?\" (Silicone.)",
}, { foot: "*Little to no drainage." });
div("What Roofs Can Acrylic Restore?", "Same roof types — except old silicone.", {
  key: "Quick photo tour, same as silicone.",
  say: "Have the crew name each roof type before you click.",
});
pic("Asphalt Roofs", "Granulated or smooth mod-bit, and BUR (built-up roof).", REVIEW("asphalt roof types"));
pic("Single-Ply Roofs", "PVC, TPO, and EPDM.", REVIEW("single-ply roof types"));
pic("Metal Roofs", "Standing seam and screw-down metal.", REVIEW("metal roofs"));
pic("Spray Foam (SPF) Roofs", "Acrylic protects foam from the sun.", REVIEW("spray foam roofs"));
pic("Roofs Coated Before", "Yes — except roofs coated with silicone.", {
  key: "Acrylic can't go over silicone.",
  say: "Remember: only silicone sticks to silicone. Acrylic goes over almost any other old coating.",
  ask: "\"Why can't acrylic go over silicone?\"",
});
pic("Tar & Gravel Roofs", "Not ready as-is (red X). The gravel has to be dealt with first.", REVIEW("tar and gravel roofs"));
pic("Tar & Gravel + Spray Foam", "Spray foam over the old gravel roof, then coat it.", REVIEW("tar and gravel with spray foam"));
div("Acrylic Restoration Steps", "Repair first, then restore.", REVIEW("the restoration steps — same as silicone"));
restoreSteps(false);
inspect(false, false);
adhesion(false);
pullTest(false);
moisture(false);
drone(false);
repairs(false);
div("Complete Line of Products", "One system, one brand — saves you time and money.", {
  key: "The acrylic products.",
  say: "Same idea as silicone: group them by job.",
});
txt("AcryShield Product Lineup", [
  "Topcoats — 510, 610 Fast-Set, 550 High Tensile, 400",
  "Basecoats — 505, 605 Fast-Set, 501 SPF",
  "Asphalt base — Pro-Grade 197 Emulsion",
  "Primer — Prime-Tek TPO",
  "Sealants — 289 White, 295 Metal Seam",
  "Reinforcement — Seal-Tek Micro Fibers, 195/196 Fabric",
], {
  key: "Basecoat + topcoat + sealants + fabric = a complete acrylic system.",
  say: "Pro-Grade 280 and 294 are still available for older specs that call for them.",
});
div("AcryShield Topcoats", "Pick the topcoat by the job.", {
  key: "Four topcoats. Each fits a different job.",
  say: "Standard, fast, tough, or multi-purpose. That's the whole decision.",
});
table("Choosing a Topcoat", ["Topcoat", "Best for"], [
  ["510", "The standard, go-to topcoat"],
  ["610 Fast-Set", "Fast-setting — handles heavy dew and light rain"],
  ["550 High Tensile", "Toughest and stretchiest. Highest reflectivity (SRI)."],
  ["400", "Multi-purpose topcoat"],
], {
  key: "Standard → 510. Weather risk → 610. Tough job → 550. All-around → 400.",
  say: "All four meet codes, come in white, sand, light gray, and dark gray, in 5- and 55-gallon sizes.",
  ask: "\"Job near the coast with morning fog. Which topcoat?\" (610 Fast-Set.)",
}, { foot: "All four: meet codes. White, sand, light gray, dark gray. 5-gal and 55-gal drums." });
txt("NEW: AcryShield 250 Elastomeric Coating", [
  "Budget topcoat or basecoat",
  "CRRC rated. Meets Title 24.",
  "White — 5-gal, 55-gal",
  "Material warranty ONLY",
  "No Material Plus or Gold Seal warranties",
], {
  key: "250 is the low-cost option — but it only gets a material warranty.",
  say: "Good for price-driven jobs. Be clear with the owner: no labor coverage with this one.",
  ask: "\"Owner wants a Gold Seal warranty. Can you use 250?\" (No.)",
});
div("AcryShield Basecoats, Accessories & Primers", "The basecoat is the foundation.", {
  key: "What goes under the topcoat.",
  say: "A good basecoat stops stains and helps everything stick.",
});
table("Choosing a Basecoat", ["Basecoat", "Best for"], [
  ["505", "The standard. Blocks stains, sticks great. Buff."],
  ["605 Fast-Set", "Handles heavy dew and light rain. Blocks stains. Buff."],
  ["400", "Blocks stains. White, sand, light and dark gray."],
  ["Pro-Grade 294", "For specs that use Pro-Grade 280. Blocks stains. Medium gray."],
], {
  key: "Standard → 505. Weather risk → 605.",
  say: "Same pattern as the topcoats: there's a standard and a fast-set version.",
}, { foot: "505, 605, 400: 5-gal and 55-gal. 294: 5-gal, 55-gal, 275-gal tote." });
tpoPrimer(false);
emulsion197(true);
seam295(true);
sealant289(true);
fabric195(true);
div("Project Startup", "A clean, dry roof is half the job.", REVIEW("project startup"));
cleaning(false, ["mod", "sp", "metal"]);
txt("Prep Step 2: Basecoat", [
  "Asphalt or old aluminum coating — AcryShield 505 or 605",
  "Apply by — roll, squeegee and back roll, spray and back roll, or spreader",
  "Metal roofs — AcryShield 400 or 605",
  "Apply by — roll, spray and back roll, or tank spreader",
], {
  key: "Asphalt gets 505 or 605. Metal gets 400 or 605.",
  say: "605 works on both, so it's handy when the weather is iffy.",
});
details90(false);
table("Which Product for Which Detail?", ["Roof", "Detail", "Product → How"], [
  ["Asphalt / single-ply", "Seams, pipes, drains", "289 Sealant → brush, trowel\n(Skip if doing a full fabric system)"],
  ["Metal", "Seams, pipes, fasteners", "295 Seam Sealer → brush, bulk gun\n289 Sealant → brush"],
], {
  key: "Acrylic details: 289 on asphalt and single-ply. 295 or 289 on metal.",
  say: "If you're putting fabric over the whole roof, you can skip the 289 on seams.",
});
div("AcryShield Application", "Measure the squares. Hit the rate.", REVIEW("the grid method"));
gridSlide(false, 3, "AcryShield", 1.6);
method("Roll", false, "Roll it on in even passes.");
method("Squeegee and Back Roll", false, "Pour, spread with a squeegee, then roll.");
method("Spray and Back Roll", false, "Spray for speed, then roll it in.");
method("Tank Spreader", false, "Even coat on big, open areas.");
div("Warranty Information", "Do it right, and Henry stands behind it — up to 20 years.", REVIEW("warranties"));
txt("Henry Warranty Program", [
  "Up to 20 years — labor, workmanship, and materials",
  "Can be transferred and renewed",
], {
  key: "Acrylic systems can also earn up to 20 years.",
  say: "Same promise as silicone. The length depends on how much coating goes down — see the charts.",
});
warrantyChart("AcryShield Acrylic");
warrantyChart("AcryShield Acrylic");
warrantyChart("AcryShield Acrylic");
warrantyChart("AcryShield Acrylic");

// ===================================================================
sec("Aluminum");
div("Pro-Grade Aluminum System", "Aluminum: low cost, shiny, great on metal.", {
  key: "Section 3 of 4: Aluminum.",
  say: "Aluminum is the most budget-friendly option and it loves metal roofs — even rusty ones.",
});
txt("Aluminum: The Strengths", [
  "No primer needed",
  "Goes right over tight rust",
  "Reflects the sun",
  "Brush, roll, or spray",
  "Low cost",
  "Apply at 40°F and rising",
  "Easy to recoat later",
], {
  key: "Aluminum is cheap, simple, and handles rusty metal.",
  say: "Tight rust means rust that's stuck on — not flaking. Aluminum goes right over it.",
  ask: "\"How do you tell tight rust from loose rust?\" (Scrape it. If it flakes off, it's loose — remove it.)",
});
txt("Aluminum: The Downsides", [
  "Doesn't love standing water (like acrylic)",
  "Less reflective than a white coating",
  "Hard to mix — the aluminum settles at the bottom",
  "Not for single-ply or foam roofs",
  "Usually solvent-based — more fumes (high VOC)",
], {
  key: "Mix it well, keep it off single-ply and foam, and keep water moving.",
  say: "That \"brick\" at the bottom of the bucket is the aluminum. If you don't mix it in, you're just putting down asphalt.",
  stick: "Unmixed aluminum is like a milkshake with all the ice cream stuck at the bottom.",
});
txt("When Aluminum Is a Good Fit", [
  "Metal roofs",
  "Rusty metal — if the rust is tight",
  "Flat roofs* that drain",
  "Little disruption",
  "The lowest-cost option",
], {
  key: "Metal roofs on a budget: think aluminum.",
  say: "When the owner says \"what's the cheapest way to make it last?\" — this is often the answer.",
}, { foot: "*Areas with good drainage — little ponding water." });
txt("When Aluminum Is NOT a Good Fit", [
  "Ponding water",
  "Flat roofs* that don't drain",
  "Single-ply and spray foam roofs",
  "Max sun protection needed",
  "Heavy foot traffic",
], {
  key: "No single-ply. No foam. No ponding.",
  say: "Same water rule as acrylic. Plus: never on single-ply or foam.",
}, { foot: "*Little to no drainage." });
div("What Roofs Can Aluminum Restore?", "Asphalt, metal, and old coatings.", {
  key: "Fewer roof types than silicone or acrylic.",
  say: "Notice what's missing: no single-ply, no foam.",
});
pic("Asphalt Roofs", "Granulated or smooth mod-bit, and BUR (built-up roof).", REVIEW("asphalt roof types"));
pic("Metal Roofs", "Aluminum's best match.", REVIEW("metal roofs"));
pic("Roofs Coated Before", "Old acrylic or aluminum coatings.", REVIEW("previously coated roofs"));
pic("Tar & Gravel Roofs", "Not ready as-is (red X). The gravel has to be dealt with first.", REVIEW("tar and gravel roofs"));
div("Aluminum Restoration Steps", "Repair first, then restore.", REVIEW("the restoration steps"));
restoreSteps(false);
inspect(false, false);
txt("Adhesion Test for Aluminum: The Tape Test", [
  "Different from the silicone and acrylic pull test",
  "Use for — coating over smooth asphalt, metal, or old coatings",
  "1. Cut an X through the coating",
  "2. Press clear tape firmly over the X",
  "3. Rip the tape back fast, at 180°",
  "Coating on the tape = FAIL",
], {
  key: "Aluminum uses a tape test, not a pull test. Coating on the tape means it fails.",
  say: "This is the ASTM D3359 tape test. Cut an X, tape it, rip it back fast. Clean tape: pass. Coating on the tape: fail.",
  stick: "Like testing nail polish with tape — if it lifts, it wasn't bonded.",
  ask: "Show a photo of a pulled tape: \"Pass or fail?\"",
});
moisture(false);
drone(false);
repairs(false);
div("Complete Line of Products", "One system, one brand — saves you time and money.", {
  key: "The aluminum products.",
  say: "Three aluminum coatings — good, better, best — plus the base and repair products.",
});
txt("Aluminum Product Lineup", [
  "Coatings — 599 Rubberized, 586, 588 Water-Based",
  "Asphalt base — 197 Emulsion",
  "Sealants — 295 Metal Seam, 289 White",
  "Cement — 167 Extreme Rubberized Flashing",
  "Fabrics — 195/196 Polyester, 183 Yellow Fiberglass",
], {
  key: "Three aluminum coatings, plus everything to prep and seal.",
  say: "Group by job again: coatings for the field, the rest for the details.",
});
pic("Good, Better, Best", "Best: 599 Rubberized. Better: 586. Good: 588 Water-Based.", {
  key: "Three aluminums. Pick by budget and job.",
  say: "Walk left to right: best to good. Let the customer choose the level.",
});
alu588(true);
alu586(true);
alu599(true);
txt("Why Pro-Grade Aluminum?", [
  "Soft-pack — less mixing time",
  "No primer needed",
  "Paint-quality aluminum paste",
  "Goes over tight rust",
  "Fills \"alligator\" cracks",
  "Great up north — holds in winter heat",
  "One coat. Stops pinhole leaks.",
], {
  key: "Less mixing, no primer, one coat.",
  say: "Alligatoring is the cracked pattern on old asphalt. Aluminum fills those cracks.",
});
div("Pro-Grade Aluminum Accessories", "The right base and the right repair.", REVIEW("accessory products"));
emulsion197(false);
cement167(true);
seam295(false);
sealant289(false);
fabric195(false);
fabric183(true);
div("Project Startup", "A clean, dry roof is half the job.", REVIEW("project startup"));
cleaning(false, ["mod", "metal"]);
details90(false);
table("Which Product for Which Detail?", ["Roof", "Detail", "Product → How"], [
  ["Asphalt", "Seams, pipes, drains", "197 + 195 fabric → brush, roll, spray\n(Skip if doing a full fabric or emulsion system)\n167 + 183 yellow fabric → brush, trowel"],
  ["Metal", "Seams, pipes, fasteners", "295 Seam Sealer → brush, bulk gun\n289 Sealant* → brush"],
], {
  key: "Asphalt details: emulsion or cement with fabric. Metal: 295.",
  say: "Use 289 on metal only where 295 doesn't meet local VOC rules.",
}, { foot: "*Use 289 where 295 doesn't meet VOC rules." });
div("Pro-Grade Aluminum Application", "Measure the squares. Hit the rate.", REVIEW("the grid method"));
gridSlide(false, 2.5, "Pro-Grade Aluminum", 2);
method("Roll or Brush", false, "Roll or brush it on in even passes. Mix well first!");
method("Spray and Back Roll", false, "Spray for speed, then roll it in.");
method("Tank Spreader", false, "Even coat on big, open areas.");
div("Warranty Information", "Do it right, and Henry stands behind it — up to 12 years.", REVIEW("warranties"));
txt("Henry Warranty Program", [
  "Up to 12 years — labor, workmanship, and materials",
  "Can be transferred and renewed",
], {
  key: "Aluminum systems can earn up to 12 years.",
  say: "Shorter than silicone or acrylic, but it's also the lowest-cost system.",
});
warrantyChart("Pro-Grade Aluminum");
appGuide("Pro-Grade Aluminum");

// ===================================================================
sec("Emulsion");
div("Asphalt Repair Mastics & Emulsion Systems", "Emulsion: the low-cost base for asphalt roofs — always topcoat it.", {
  key: "Section 4 of 4: Emulsion.",
  say: "Emulsion is cold-applied asphalt. It builds up an old asphalt roof, then a reflective topcoat protects it.",
});
txt("Asphalt Emulsion: The Strengths", [
  "Keeps moisture out",
  "Forms one seamless layer with fabric",
  "Spray, brush, or roll",
  "Good value",
  "Zero VOC — no harmful fumes",
], {
  key: "Emulsion builds back a worn asphalt roof — cheaply and with no fumes.",
  say: "With fabric in it, emulsion becomes one solid layer — no seams.",
});
txt("Asphalt Emulsion: The Downsides", [
  "Must be topcoated — sun breaks it down",
  "Needs more than one coat",
  "Takes longer to cure",
  "Weather matters — 50°F and rising, no rain for 6–12+ hours",
  "Not for single-ply or metal",
  "Mold can grow on it. Only about 50% solids.",
], {
  key: "Emulsion needs a topcoat and good weather.",
  say: "It's water-based, so treat it like acrylic: watch the weather.",
  ask: "\"What two topcoats can go over emulsion?\" (Acrylic or aluminum.)",
});
txt("When Emulsion Is a Good Fit", [
  "Flat asphalt roofs* that drain",
  "Alligatored (cracked) asphalt roofs",
  "Roofs with old aluminum or acrylic coating",
], {
  key: "Old, cracked asphalt roofs: think emulsion.",
  say: "Emulsion fills the cracks and builds the roof back up before the topcoat.",
}, { foot: "*Areas with good drainage — no ponding water." });
txt("When Emulsion Is NOT a Good Fit", [
  "Ponding water",
  "Flat roofs* that don't drain",
  "Single-ply and spray foam roofs",
  "Max sun protection needed",
  "Heavy foot traffic",
], {
  key: "No ponding, no single-ply, no foam.",
  say: "Same limits as aluminum.",
}, { foot: "*Little to no drainage." });
div("Pro-Grade Emulsion Restoration", "Emulsion builds it up. The topcoat protects it.", {
  key: "How emulsion restoration works.",
  say: "Two layers, two jobs: emulsion builds, topcoat protects.",
});
div("What Roofs Can Emulsion Restore?", "Asphalt roofs only.", {
  key: "Emulsion is for asphalt roofs.",
  say: "Short list. Asphalt only.",
});
pic("Asphalt Roofs", "Granulated or smooth mod-bit, and BUR (built-up roof).", REVIEW("asphalt roof types"));
pic("Roofs Coated Before", "Asphalt roofs with an old acrylic or aluminum coating.", REVIEW("previously coated roofs"));
pic("Tar & Gravel Roofs*", "*This system is still under review — check with Henry first.", {
  key: "Tar and gravel with emulsion is not approved yet.",
  say: "Call your Henry rep before quoting emulsion on a tar and gravel roof.",
});
div("Emulsion Restoration Steps", "Repair first, then restore.", REVIEW("the restoration steps"));
restoreSteps(false);
moisture(false);
drone(false);
repairs(false);
div("Complete Line of Products", "One system, one brand — saves you time and money.", {
  key: "The emulsion products.",
  say: "Emulsion plus your choice of topcoat.",
});
txt("Emulsion System Lineup", [
  "Base — Pro-Grade 197 Asphalt Emulsion",
  "Acrylic topcoats — AcryShield 510/505, 610/605, 550, 400",
  "Aluminum topcoats — Pro-Grade 599, 586, 588",
  "Fabric — Henry 195/196 Polyester",
], {
  key: "197 down first. Then pick an acrylic or aluminum topcoat.",
  say: "Pro-Grade 280 and 294 are still available for older specs.",
});
emulsion197(false);
div("Emulsion Basecoat & Topcoat Options", "Pick the topcoat that fits the job.", {
  key: "The coatings that go over emulsion.",
  say: "You've seen most of these already. Quick review.",
});
ac505(true);
txt("AcryShield 510 Topcoat", [
  "100% acrylic topcoat",
  "For spray foam, single-ply, metal, and asphalt",
  "The go-to acrylic",
  "Does NOT block stains — use a basecoat over asphalt",
  "Stays flexible in colder climates",
  "Beats ASTM D6083",
  "White, sand, light and dark gray, custom — 5-gal, 55-gal",
], {
  key: "510 is the standard topcoat — but it won't stop asphalt stains on its own.",
  say: "Always put a stain-blocking basecoat under 510 on asphalt.",
});
txt("AcryShield 605 Fast-Set Basecoat", [
  "Sets fast — resists early wash-off",
  "Handles heavy dew and light rain",
  "For BUR, mod-bit, metal, single-ply, and asphalt emulsion",
  "Water-based. Low fumes.",
  "Beige — 5-gal, 55-gal",
], {
  key: "605 is the basecoat for iffy weather.",
  say: "Morning dew or a sprinkle won't wash it off.",
});
txt("AcryShield 610 Fast-Set Topcoat", [
  "Sets fast — resists early wash-off",
  "Handles heavy dew and light rain",
  "100% acrylic",
  "For spray foam, single-ply, metal, and asphalt",
  "White, sand, light and dark gray, custom — 5-gal, 55-gal",
], {
  key: "610 is the topcoat for iffy weather.",
  say: "Pair 605 base with 610 top when the forecast is uncertain.",
});
txt("AcryShield 550 High Tensile Topcoat", [
  "Tough like urethane",
  "Best against foot traffic and abuse",
  "For spray foam, single-ply, metal, and asphalt",
  "Beats ASTM D6083",
  "White, sand, light and dark gray — 5-gal, 55-gal",
], {
  key: "550 is the tough one. Use it where people walk.",
  say: "Around rooftop units and walkways, 550 holds up best.",
});
txt("AcryShield 400 Coating", [
  "Multi-purpose topcoat",
  "Blocks asphalt stains",
  "For asphalt, single-ply, and metal",
  "Beats key ASTM D6083 tests — strength, stretch, wet adhesion, weathering",
  "White, sand, light and dark gray — 5-gal, 55-gal",
], {
  key: "400 does a bit of everything — including blocking stains.",
  say: "Handy when you want one product that works as both base and top.",
});
alu588(false);
alu586(false);
alu599(false);
div("Pro-Grade Emulsion Accessories", "Fabric makes it one solid layer.", REVIEW("accessory products"));
fabric195(false);
div("Project Startup", "A clean, dry roof is half the job.", REVIEW("project startup"));
cleaning(false, ["mod"]);
details90(false);
table("Which Product for Which Detail?", ["Detail", "Product → How"], [
  ["Seams", "197 + 195 fabric → brush, roll, spray\n(Skip if doing a full fabric system)"],
  ["Penetrations", "197 + 195 fabric → brush\n289 Sealant → brush"],
  ["Fasteners", "295 Seam Sealer → brush, bulk gun\n289 Sealant → brush"],
], {
  key: "Emulsion details: emulsion plus fabric.",
  say: "Same fabric approach as the aluminum system.",
});
div("Pro-Grade Emulsion Application", "Measure the squares. Hit the rate.", REVIEW("the grid method"));
gridSlide(false, 5, "Pro-Grade 197", 1);
method("Broom, Squeegee, Roll", false, "Spread the emulsion with a broom, squeegee, or roller.");
method("Spray and Broom In", false, "Spray it on, then broom it into the surface.");
method("Topcoat", false, "Then topcoat: roll, squeegee and back roll, or spray and back roll.");
div("Warranty Information", "Do it right, and Henry stands behind it — up to 15 years.", REVIEW("warranties"));
txt("Henry Warranty Program", [
  "Acrylic-emulsion systems — up to 15 years",
  "Aluminum-emulsion systems — up to 12 years",
  "Covers labor, workmanship, and materials",
  "Can be transferred and renewed",
], {
  key: "Acrylic topcoat: up to 15 years. Aluminum topcoat: up to 12.",
  say: "The topcoat you pick decides the warranty length.",
});
warrantyChart("AcryShield Acrylic-Emulsion");
appGuide("AcryShield Acrylic-Emulsion");
warrantyChart("Pro-Grade Aluminum-Emulsion");
appGuide("Pro-Grade Aluminum-Emulsion");

// ===================================================================
sec("Repair Mastics");
div("What Roofs Can We Repair?", "Stop the leak today with the right mastic.", {
  key: "Repairs: fixing leaks fast.",
  say: "Not every job is a full restoration. Sometimes you just need to stop a leak. That's what these products do.",
});
pic("Asphalt Roofs", "Granulated or smooth mod-bit, and BUR (built-up roof).", REVIEW("asphalt roof types"));
div("Complete Line of Products", "One system, one brand — saves you time and money.", {
  key: "The repair products.",
  say: "Quick tour of our mastics and cements.",
});
div("Pro-Grade Asphalt Mastics", "The right cement for the weather you're in.", {
  key: "Mastics and cements.",
  say: "These are picked by weather and by job: basic, rubberized, all-weather, emergency, or extreme.",
});
pic("Pro-Grade Mastics & Cements", "Our full lineup of roof mastics and cements.", {
  key: "The whole family on one page.",
  say: "Use this page as a reference. We'll go through each one next.",
}, { ref: true });
txt("Pro-Grade 151 Plastic Cement", [
  "Basic roof cement for flat areas",
  "A backup layer in good flashing details",
  "Winter and summer grades — 20°F to 120°F",
  "Meets ASTM D4586. Miami-Dade approved.",
  "Black — 5-gal pail",
], {
  key: "151 is the basic, everyday cement for flat work.",
  say: "Pick the winter grade when it's cold so it stays workable.",
});
txt("Pro-Grade 155 Flashing Cement", [
  "Rubberized cement for walls and flat areas",
  "Won't sag or slide — even at 140°F roof temps",
  "Winter and summer grades — 20°F to 120°F",
  "Meets ASTM D4586. Miami-Dade approved.",
  "Black — 5-gal pail",
], {
  key: "155 stays put on walls, even on a hot roof.",
  say: "Use it on vertical flashings where plain cement would sag.",
});
txt("Pro-Grade 161 All Weather Flashing Cement", [
  "Premium rubberized cement",
  "Apply in wet or dry weather",
  "Sets and repairs SBS mod-bit flashings",
  "Winter and summer grades — 20°F to 120°F",
  "Sticks 100% underwater (ASTM D3409)",
  "Meets ASTM D4586. Miami-Dade approved. Black — 5-gal.",
], {
  key: "161 goes on wet or dry. Great for mod-bit flashings.",
  say: "When it's raining and you still need to set a flashing, this is the one.",
});
txt("Pro-Grade 163 Emergency Leak Repair Sealant", [
  "Stops leaks right now",
  "Apply in wet or dry weather",
  "Sticks even underwater",
  "Works from 0°F to 120°F",
  "Meets ASTM D4586 and D3409. Miami-Dade approved.",
  "Black — 10.1 oz tube, 1-gal, 3-gal",
], {
  key: "163 is the emergency fix. Keep a tube in every truck.",
  say: "Customer calls during a storm? 163 goes on even underwater.",
  ask: "\"Who carries an emergency tube in the truck right now?\"",
});
cement167(false);
fabric183(false);
txt("Why Pro-Grade Mastics?", [
  "Work in extreme heat and cold",
  "Stay easy to spread — even when cold",
  "Fewer products to stock",
  "Fewer buckets to carry",
  "Every wet/dry mastic sticks 100% underwater (ASTM D3409)",
], {
  key: "When you're stopping leaks, you want 100%.",
  say: "Some brands claim the underwater test but barely pass. Ours stick 100%.",
  stick: "\"When you're stopping leaks, you want 100%.\" Say it with them.",
});
pic("The Underwater Test", "Both brands claim ASTM D3409. Competitor (left) barely sticks underwater. Henry (right) sticks 100%.", {
  key: "Same test, different results. Ours really sticks underwater.",
  say: "Play the video if you have it. Then let the crew handle the samples themselves.",
  ask: "Hands-on: pass around a wet trowel sample. \"Try to pull it off.\"",
});
div("Pro-Grade Mastics & Cements Application", "Mastic, fabric, mastic.", {
  key: "How to do a good mastic repair.",
  say: "Three layers: cement, fabric, cement.",
});
pic("Mastic Repair: Step 1", "Spread a layer of mastic. Lay the fabric into it.", {
  key: "First layer: mastic, then fabric.",
  say: "Press the fabric into wet mastic so there are no dry spots.",
});
pic("Mastic Repair: Step 2", "Cover the fabric with more mastic.", {
  key: "Second layer: mastic over the fabric.",
  say: "Cover the fabric completely. No fabric should show.",
});
pic("Mastic Repair: Step 3", "Press it all down — no gaps, no bubbles.", {
  key: "Finish: smooth and sealed.",
  say: "Work out air bubbles. A bubble is a future leak.",
  ask: "Hands-on: have each person build a small sample in a tray.",
});

// ===================================================================
sec("Warranty & Authorization");
div("Warranties & Becoming an Authorized Contractor", "Get authorized before the job starts.", {
  key: "How to get Henry's warranties behind your work.",
  say: "No authorization, no Material Plus or Gold Seal warranty. The training has to be done before the job starts.",
});
table("Warranty Options", ["Warranty", "What it covers", "What you need"], [
  ["Manufacturer", "No defects for 1 year or until the product expires", "Proof of purchase"],
  ["Implied", "Product works as the data sheet says", "Store, handle, and install per Henry guidelines"],
  ["Limited Lifetime\n(988 silicone only)", "Free replacement material for the life of the roof if there's a defect", "Proof of purchase. Use two Pro-Grade silicone products."],
  ["Material Plus", "Material + labor to install it, free, if the product is defective", "Sign the Material Plus agreement. Apply at henry.com/warranty."],
  ["Gold Seal", "Material + labor to fix product defects AND workmanship mistakes", "Sign the Gold Seal agreement. Apply at henry.com/warranty."],
], {
  key: "Gold Seal is the only warranty that covers workmanship.",
  say: "Go from top to bottom. Each step up covers more. Gold Seal is the top: it even covers installation mistakes.",
  stick: "Material Plus = \"the product is good.\" Gold Seal = \"the product AND the install are good.\"",
  ask: "\"Which warranty covers a seam your crew missed?\" (Gold Seal only.)",
}, { foot: "All products must be installed by a Henry Authorized Contractor, per the data sheets and guide spec." });
steps("How to Become a Henry Authorized Contractor", [
  ["Apply", "Fill out the Authorized Contractor Application"],
  ["Send documents", "warranty@henry.com and Ray Leake (rleake@henry.com)"],
  ["Train", "Schedule training with the Henry tech team"],
  ["Get approved", "Henry sends your contractor agreement"],
], {
  key: "Apply, send documents, train, get approved — before the job starts.",
  say: "Have the application ready to fill out today. The person who can sign for the company has to sign it.",
  ask: "\"Who here can sign for your company?\"",
}, {
  after: [
    "Training must be done BEFORE the warranted job starts",
    "Material Plus training — classroom: install rules and correct details",
    "Gold Seal training — full product review, hands-on training, and help on your first job*",
  ],
  foot: "*First-job help can be skipped with proven, verified coating experience in that system.",
});
table("Material Plus vs. Gold Seal Contractor", ["", "Material Plus", "Gold Seal"], [
  ["Systems", "Silicone, acrylic, aluminum, emulsion", "Silicone, acrylic, aluminum, emulsion"],
  ["Paperwork", "Roofing license (if your state requires), liability insurance, workers' comp, business license", "Same"],
  ["Before the job", "Submit warranty application. Prequalify the roof.", "Same, plus a pre-job roof inspection"],
  ["Testing", "Do the adhesion test and moisture survey", "Submit PROOF of adhesion test and moisture survey"],
  ["Install", "Per the guide spec", "Per the guide spec"],
], {
  key: "Gold Seal asks for more proof — and gives more coverage.",
  say: "Most requirements are the same. Gold Seal adds the pre-job inspection and proof of your tests.",
});
table("Material Plus vs. Gold Seal Warranty", ["", "Material Plus", "Gold Seal"], [
  ["Defective Henry products", "Covered", "Covered"],
  ["All Henry products, same length as coating", "Yes", "Yes"],
  ["Workmanship mistakes", "No", "Yes"],
  ["Your liability", "—", "Only 2 years of workmanship (others: about half the term)"],
  ["Fee", "None", "Warranty fee"],
  ["Ponding water (silicone)", "Not excluded", "Not excluded"],
  ["Inspections", "Confirm tests were done", "Pre-job inspection, test proof, final inspection by Henry"],
], {
  key: "With Gold Seal, you're only on the hook for 2 years of workmanship. Henry covers the rest.",
  say: "This is the big one for contractors. Other brands make you cover about half the warranty term. With Gold Seal, it's only 2 years. Both warranties can be transferred.",
  stick: "On a 20-year Gold Seal, you cover 2 years. Henry covers 18.",
  ask: "\"On a 20-year warranty, how many years are you liable for?\" (2.)",
}, { foot: "Lifetime warranty (988 only): 988 + one more Pro-Grade silicone product. All seams stripped with 988. Transferable. No approved applicator needed." });

// ===================================================================
sec("Final Inspection");
div("Final Inspections", "No final inspection, no Gold Seal.", {
  key: "How the final inspection works.",
  say: "Every Gold Seal job gets a final inspection. Know the steps so there are no surprises.",
});
steps("Final Inspection: Step by Step", [
  ["Finish the job", "Submit the warranty application"],
  ["Send documents", "Adhesion test and moisture survey results"],
  ["Henry schedules", "Warranty team books your tech rep"],
  ["Rep inspects", "Sends a report and punch list"],
  ["You fix the list", "Send before/after photos and sign off"],
  ["Warranty issued", "By email. Fee invoiced separately."],
], {
  key: "Required for ALL Gold Seal warranties.",
  say: "The fastest way to get your warranty: send complete documents the first time, and fix the punch list fast.",
  ask: "\"What slows this process down most?\" (Missing documents.)",
});
div("Common Punch List Items", "Catch these yourself before the inspector does.", {
  key: "The most common things inspectors flag.",
  say: "Do your own walk before the inspector comes. Look for exactly these.",
});
pic("Seams: Open Seams", "Seams not fully sealed. Fix: seal and reinforce before topcoat.", {
  key: "Open seams are the #1 punch list item.",
  say: "Red marks show where the inspector found gaps. Check every seam yourself first.",
  ask: "\"How would you have caught this before the inspector?\"",
});
pic("Seams: More Open Seams", "Look closely — small gaps let water in.", {
  key: "Even small seam gaps fail inspection.",
  say: "Some of these are tiny. Get down on your knees and look.",
});
pic("Penetrations Not Sealed", "Pipes and vents need a full seal all the way around.", {
  key: "Seal every penetration all the way around.",
  say: "Remember: 90% of leaks start at details like these.",
});
pic("Open Flashings", "Flashing edges must be sealed tight.", {
  key: "Flashing edges must be tight.",
  say: "Run your hand along every flashing edge. If it lifts, seal it.",
});
pic("Thin Coating in the Field", "Not enough coating. Fix: add coating to hit the spec rate.", {
  key: "Thin coating means the rate wasn't hit.",
  say: "This is why we use the grid. Measure, count pails, hit the rate.",
  ask: "\"How do you check thickness while you work?\" (Wet mil gauge.)",
});
pic("Fasteners", "Every screw head needs to be fully covered.", {
  key: "Cover every fastener.",
  say: "One missed screw is one more leak.",
});
pic("Fasteners, Skylights & Drains", "Check every fastener, skylight edge, and drain.", {
  key: "Final check: fasteners, skylights, and drains.",
  say: "Make this your last walk before you call for inspection.",
});

// ===================================================================
sec("Results & Support");
div("The End Result", "An old roof that works like new.", {
  key: "What it all looks like when it's done right.",
  say: "Let the photos do the talking.",
});
pic("Before & After (1)", "Before → After", {
  key: "Same roof. Years of new life.",
  say: "Pause on each one. Let it sink in.",
});
pic("Before & After (2)", "Before → After", {
  key: "Bright white roof = cooler building, lower bills.",
  say: "Point out how much cooler the white roof will run in summer.",
});
pic("Before & After (3)", "Before → After", {
  key: "Restored, not replaced.",
  say: "No tear-off. No dumpster. Same roof, new life.",
});
pic("Before & After (4)", "Before → After", {
  key: "This is what owners pay for.",
  say: "Use photos like these when you sell. Take your own before and after shots on every job.",
});
pic("Before & After (5)", "Before → After", {
  key: "Your best sales tool is your own before-and-after photos.",
  say: "Ask: \"Who's taking before photos on your next job?\"",
});
div("Technical Support", "You're never on the roof alone.", {
  key: "Who to call.",
  say: "Every region has a Henry tech rep. Save their number in your phone today.",
});
table("Your Henry Tech Reps", ["Rep", "Area", "Phone", "Email"], [
  ["Carlos Benavides", "CA, AZ, NV", "951.617.0783", "cbenavides@henry.com"],
  ["David Ahrlett", "TX, OK, AR, LA, MS, NM, CO, KS, UT, Memphis, western MO", "817.771.4026", "dahrlett@henry.com"],
  ["Jason Morris", "IL, NW IN, eastern MO, IA, MN, ND, SD, NE, WA, OR, ID, MT, WY, AK, HI", "773.412.9022", "jmorris@henry.com"],
  ["Dana Destro", "Northeast, Mid-Atlantic, OH, WV, IN, MI, KY, central and western TN", "215.817.6386", "ddestro@henry.com"],
  ["John Croyle", "Northeast, Mid-Atlantic, OH, WV, IN, MI, KY, central and western TN", "440.547.5344", "jcroyle@henry.com"],
  ["Michael Strachan", "FL, GA, AL, SC, NC, eastern TN", "727.589.6493", "mstrachan@henry.com"],
], {
  key: "Find your area. Save that number now.",
  say: "Have everyone pull out their phone and save their rep's number before moving on.",
}, { foot: "Northeast and Mid-Atlantic: ME, VT, NH, MA, CT, RI, NY, NJ, PA, MD, DE, DC, VA." });
add({
  kind: "closing", title: "Questions?", recap: ["Clean. Dry. Sound.", "Repair first, then restore.", "Sweat the details.", "Get authorized before the job."], notes: {
    key: "Four things to remember.",
    say: "Read the four lines together, out loud. Then open it up for questions.",
    stick: "End where you started: \"Clean, dry, sound.\" If they remember nothing else, they remember that.",
    ask: "Go back to the flip chart from the start. \"Did we answer everything you wanted to know?\"",
  }
});

module.exports = S;
