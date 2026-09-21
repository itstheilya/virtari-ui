import test from "node:test";
import assert from "node:assert/strict";
import {
  chooseForeground,
  contrastRatio,
  generateColorScale,
  generateNeutralScale,
  generateVirtariTheme,
  isInSrgbGamut,
  oklchToRgb,
  parseOklch,
  parseNeutralImport,
  suggestAccents,
  themeToCss,
} from "../dist/index.js";

test("generates complete 12-step neutral scales", () => {
  const scale = generateNeutralScale("light", { hue: 250, chroma: 0.01 });
  assert.equal(Object.keys(scale).length, 12);
  assert.match(scale["1"], /^oklch\(/);
});

test("chooses the higher contrast black or white foreground", () => {
  assert.equal(chooseForeground("#111111").color, "#FFFFFF");
  assert.equal(chooseForeground("#FAFAFA").color, "#000000");
  assert.ok(contrastRatio("#000000", "#FFFFFF") > 20);
  assert.equal(contrastRatio("#777777", "#FFFFFF").toFixed(2), "4.48");
});

test("suggests deterministic accent harmonies", () => {
  const suggestions = suggestAccents("#4F46E5");
  assert.deepEqual(suggestions.map(item => item.strategy), ["complementary", "analogous", "triadic", "split-complementary"]);
  assert.ok(suggestions.every(item => /^#[0-9A-F]{6}$/.test(item.color)));
});

test("exports Virtari-compatible JSON and CSS", () => {
  const theme = generateVirtariTheme({ primary: "#4F46E5", accentStrategy: "triadic" });
  assert.equal(theme.themes.light.foreground.primary.aa, true);
  const css = themeToCss(theme);
  assert.match(css, /--vds-color-primary-9:/);
  assert.match(css, /--vds-color-on-primary: #[0-9A-F]{6};/);
  assert.match(css, /--vds-color-on-accent: #[0-9A-F]{6};/);
  assert.match(css, /data-theme="dark-oled"/);
  assert.match(css, /\[data-theme="dark"\] \[data-brand="custom"\]/);
  assert.equal(parseNeutralImport(JSON.stringify(theme)).light?.["12"], theme.themes.light.neutral["12"]);
});

test("uses the Virtari accent role curve", () => {
  const primary = generateColorScale("#E85D04", "light", "primary");
  const accent = generateColorScale("#E85D04", "light", "accent");
  assert.notEqual(primary["9"], accent["9"]);
  assert.equal(parseOklch(accent["9"]).l, 0.58);
});

test("serializes generated colors inside the sRGB gamut", () => {
  for (const seed of ["#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#00FFFF"]) {
    const scale = generateColorScale(seed);
    for (const value of Object.values(scale)) assert.equal(isInSrgbGamut(oklchToRgb(parseOklch(value))), true, `${seed}: ${value}`);
  }
});

test("rejects unsafe or incomplete imported neutral scales", () => {
  const valid = generateNeutralScale();
  assert.throws(() => parseNeutralImport(JSON.stringify({ light: { ...valid, 4: "red; } body { color: red" } })), /step 4/);
  const { 12: _missing, ...incomplete } = valid;
  assert.throws(() => parseNeutralImport(JSON.stringify({ light: incomplete })), /steps 1–12/);
  assert.throws(() => themeToCss(generateVirtariTheme({ primary: "#4F46E5" }), { brand: 'bad"] body' }), /brand names/);
});
