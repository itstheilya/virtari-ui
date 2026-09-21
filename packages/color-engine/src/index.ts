export type Rgb = { r: number; g: number; b: number };
export type Oklch = { l: number; c: number; h: number };
export type ThemeName = "light" | "dark";
export type ContrastLevel = "AA" | "AAA";
export type AccentStrategy = "complementary" | "analogous" | "triadic" | "split-complementary";
export type ColorScaleRole = "primary" | "accent";
export type ColorStep = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

export type ColorScale = Record<ColorStep, string>;

export interface NeutralScaleOptions {
  hue?: number;
  chroma?: number;
  oled?: boolean;
}

export interface AccentSuggestion {
  strategy: AccentStrategy;
  label: string;
  color: string;
  hue: number;
}

export interface ForegroundChoice {
  color: "#000000" | "#FFFFFF";
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

export interface VirtariColorTheme {
  schema: "https://virtari.iamilya.com/schemas/color-theme.v1.json";
  name: string;
  generatedAt: string;
  source: { primary: string; accent: string; neutralHue: number; neutralChroma: number };
  themes: Record<ThemeName, {
    neutral: ColorScale;
    primary: ColorScale;
    accent: ColorScale;
    foreground: { primary: ForegroundChoice; accent: ForegroundChoice };
  }>;
}

const LIGHT_LIGHTNESS = [0.985, 0.975, 0.945, 0.92, 0.89, 0.855, 0.81, 0.745, 0.58, 0.53, 0.43, 0.18];
const DARK_LIGHTNESS = [0.178, 0.21, 0.245, 0.275, 0.305, 0.345, 0.395, 0.46, 0.53, 0.58, 0.72, 0.93];
const NEUTRAL_CHROMA = [0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.01, 0.014, 0.014, 0.013, 0.012];
const COLOR_STEPS: ColorStep[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const SCALE_CURVES: Record<ColorScaleRole, Record<ThemeName, { lightness: number[]; chroma: number[] }>> = {
  primary: {
    light: {
      lightness: [0.985, 0.97, 0.94, 0.905, 0.87, 0.825, 0.77, 0.7, 0.55, 0.5, 0.45, 0.26],
      chroma: [0.025, 0.05, 0.1, 0.2, 0.35, 0.55, 0.75, 0.95, 1, 0.975, 0.875, 0.7],
    },
    dark: {
      lightness: [0.19, 0.215, 0.245, 0.275, 0.31, 0.355, 0.42, 0.5, 0.575, 0.665, 0.76, 0.91],
      chroma: [0.1, 0.175, 0.3, 0.425, 0.55, 0.675, 0.8, 0.9, 1, 0.975, 0.9, 0.4],
    },
  },
  accent: {
    light: {
      lightness: [0.985, 0.97, 0.945, 0.915, 0.88, 0.83, 0.775, 0.72, 0.58, 0.53, 0.475, 0.275],
      chroma: [0.0278, 0.0833, 0.1667, 0.3056, 0.4722, 0.6389, 0.7778, 0.8889, 1, 0.9889, 0.7778, 0.5],
    },
    dark: {
      lightness: [0.185, 0.215, 0.245, 0.275, 0.315, 0.36, 0.42, 0.5, 0.58, 0.715, 0.795, 0.92],
      chroma: [0.1111, 0.1944, 0.3333, 0.4722, 0.6111, 0.7222, 0.8333, 0.9167, 1, 0.9722, 0.8611, 0.4444],
    },
  },
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const normalizeHue = (value: number) => ((value % 360) + 360) % 360;
const round = (value: number, digits = 4) => Number(value.toFixed(digits));

function linearToSrgb(value: number) {
  return value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
}

function srgbToLinear(value: number) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function oklchToRgb(color: Oklch): Rgb {
  const angle = normalizeHue(color.h) * Math.PI / 180;
  const a = color.c * Math.cos(angle);
  const b = color.c * Math.sin(angle);
  const l_ = color.l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = color.l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = color.l - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return {
    r: linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  };
}

export function rgbToOklch(color: Rgb): Oklch {
  const r = srgbToLinear(clamp(color.r));
  const g = srgbToLinear(clamp(color.g));
  const b = srgbToLinear(clamp(color.b));
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const c = Math.sqrt(a * a + bb * bb);
  return { l: clamp(L), c, h: c < 0.00001 ? 0 : normalizeHue(Math.atan2(bb, a) * 180 / Math.PI) };
}

export function parseHex(input: string): Rgb {
  const value = input.trim().replace(/^#/, "");
  if (!/^[\da-f]{3}$|^[\da-f]{6}$/i.test(value)) throw new Error(`Invalid hex color: ${input}`);
  const normalized = value.length === 3 ? [...value].map(char => char + char).join("") : value;
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16) / 255,
    g: Number.parseInt(normalized.slice(2, 4), 16) / 255,
    b: Number.parseInt(normalized.slice(4, 6), 16) / 255,
  };
}

export function rgbToHex(color: Rgb) {
  const channel = (value: number) => Math.round(clamp(value) * 255).toString(16).padStart(2, "0").toUpperCase();
  return `#${channel(color.r)}${channel(color.g)}${channel(color.b)}`;
}

export function isInSrgbGamut(color: Rgb) {
  return color.r >= 0 && color.r <= 1 && color.g >= 0 && color.g <= 1 && color.b >= 0 && color.b <= 1;
}

export function gamutMap(color: Oklch): Oklch {
  const normalized = { l: clamp(color.l), c: Math.max(0, color.c), h: normalizeHue(color.h) };
  if (isInSrgbGamut(oklchToRgb(normalized))) return normalized;
  let low = 0;
  let high = normalized.c;
  for (let i = 0; i < 24; i += 1) {
    const candidate = { ...normalized, c: (low + high) / 2 };
    if (isInSrgbGamut(oklchToRgb(candidate))) low = candidate.c;
    else high = candidate.c;
  }
  return { ...normalized, c: low };
}

export function formatOklch(color: Oklch) {
  const l = round(clamp(color.l), 4);
  const h = round(normalizeHue(color.h), 2);
  const mapped = gamutMap({ l, c: color.c, h });
  // Flooring chroma keeps the serialized, rounded value on the in-gamut side
  // of the boundary found by the binary search.
  const c = Math.floor(mapped.c * 10_000) / 10_000;
  return `oklch(${l} ${c} ${h})`;
}

function toScale(values: string[]): ColorScale {
  return Object.fromEntries(values.map((value, index) => [COLOR_STEPS[index], value])) as ColorScale;
}

export function generateNeutralScale(theme: ThemeName = "light", options: NeutralScaleOptions = {}): ColorScale {
  const hue = normalizeHue(options.hue ?? 270);
  const chroma = clamp(options.chroma ?? 0.012, 0, 0.04);
  const lightness = theme === "light" ? LIGHT_LIGHTNESS : DARK_LIGHTNESS;
  const values = lightness.map((l, index) => {
    if (theme === "dark" && options.oled && index === 0) return "oklch(0 0 0)";
    const multiplier = NEUTRAL_CHROMA[index] / 0.012;
    return formatOklch({ l, c: chroma * multiplier, h: hue });
  });
  return toScale(values);
}

export function generateColorScale(seed: string, theme: ThemeName = "light", role: ColorScaleRole = "primary"): ColorScale {
  const source = rgbToOklch(parseHex(seed));
  const { lightness, chroma: chromaCurve } = SCALE_CURVES[role][theme];
  const peak = Math.max(0.045, source.c);
  return toScale(lightness.map((l, index) => formatOklch({ l, c: peak * chromaCurve[index], h: source.h })));
}

export function suggestAccents(primary: string): AccentSuggestion[] {
  const source = rgbToOklch(parseHex(primary));
  const target = { l: clamp(source.l, 0.48, 0.72), c: Math.max(source.c, 0.12), h: source.h };
  const definitions: Array<[AccentStrategy, string, number]> = [
    ["complementary", "Complementary", 180],
    ["analogous", "Analogous", 60],
    ["triadic", "Triadic", 120],
    ["split-complementary", "Split complementary", 150],
  ];
  return definitions.map(([strategy, label, offset]) => {
    const color = gamutMap({ ...target, h: normalizeHue(target.h + offset) });
    return { strategy, label, color: rgbToHex(oklchToRgb(color)), hue: round(color.h, 1) };
  });
}

export function relativeLuminance(color: string | Rgb) {
  const rgb = typeof color === "string" ? parseHex(color) : color;
  const r = srgbToLinear(clamp(rgb.r));
  const g = srgbToLinear(clamp(rgb.g));
  const b = srgbToLinear(clamp(rgb.b));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(foreground: string | Rgb, background: string | Rgb) {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function chooseForeground(background: string): ForegroundChoice {
  const blackRatio = contrastRatio("#000000", background);
  const whiteRatio = contrastRatio("#FFFFFF", background);
  const white = whiteRatio >= blackRatio;
  const ratio = white ? whiteRatio : blackRatio;
  return {
    color: white ? "#FFFFFF" : "#000000",
    ratio: round(ratio, 2),
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

export function meetsContrast(foreground: string, background: string, level: ContrastLevel = "AA", largeText = false) {
  const threshold = level === "AAA" ? (largeText ? 4.5 : 7) : (largeText ? 3 : 4.5);
  return contrastRatio(foreground, background) >= threshold;
}

export interface GenerateThemeOptions {
  name?: string;
  primary: string;
  accent?: string;
  accentStrategy?: AccentStrategy;
  neutral?: NeutralScaleOptions;
  neutralScales?: Partial<Record<ThemeName, ColorScale>>;
}

export function generateVirtariTheme(options: GenerateThemeOptions): VirtariColorTheme {
  const suggested = suggestAccents(options.primary);
  const accent = options.accent ?? suggested.find(item => item.strategy === (options.accentStrategy ?? "complementary"))?.color ?? suggested[0].color;
  const neutralHue = options.neutral?.hue ?? 270;
  const neutralChroma = options.neutral?.chroma ?? 0.012;
  const build = (theme: ThemeName) => {
    const primary = generateColorScale(options.primary, theme);
    const accentScale = generateColorScale(accent, theme, "accent");
    const importedNeutral = options.neutralScales?.[theme];
    return {
      neutral: importedNeutral ? validateColorScale(importedNeutral, `${theme} neutral`) : generateNeutralScale(theme, options.neutral),
      primary,
      accent: accentScale,
      foreground: {
        primary: chooseForeground(rgbToHex(oklchToRgb(parseOklch(primary["9"])))),
        accent: chooseForeground(rgbToHex(oklchToRgb(parseOklch(accentScale["9"])))),
      },
    };
  };
  return {
    schema: "https://virtari.iamilya.com/schemas/color-theme.v1.json",
    name: options.name?.trim() || "Custom Virtari theme",
    generatedAt: new Date().toISOString(),
    source: { primary: options.primary.toUpperCase(), accent: accent.toUpperCase(), neutralHue, neutralChroma },
    themes: { light: build("light"), dark: build("dark") },
  };
}

export function parseOklch(input: string): Oklch {
  const number = "[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)";
  const match = input.trim().match(new RegExp(`^oklch\\(\\s*(${number})\\s+(${number})\\s+(${number})\\s*\\)$`, "i"));
  if (!match) throw new Error(`Invalid OKLCH color: ${input}`);
  const parsed = { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) };
  if (parsed.l < 0 || parsed.l > 1 || parsed.c < 0) throw new Error(`Invalid OKLCH color: ${input}`);
  return parsed;
}

function normalizeColorToken(input: string) {
  if (/^#[\da-f]{3}$|^#[\da-f]{6}$/i.test(input.trim())) return rgbToHex(parseHex(input));
  return formatOklch(parseOklch(input));
}

function validateColorScale(scale: ColorScale, label: string): ColorScale {
  const result = {} as ColorScale;
  for (const step of COLOR_STEPS) {
    if (typeof scale[step] !== "string") throw new Error(`${label} must include color step ${step}.`);
    try {
      result[step] = normalizeColorToken(scale[step]);
    } catch {
      throw new Error(`${label} step ${step} must be a hex or opaque OKLCH color.`);
    }
  }
  return result;
}

export interface ThemeCssOptions {
  brand?: string;
}

export function themeToCss(theme: VirtariColorTheme, options: ThemeCssOptions = {}) {
  const brand = options.brand?.trim() || "custom";
  if (!/^[a-z0-9_-]+$/i.test(brand)) throw new Error("CSS brand names may contain only letters, numbers, underscores, and hyphens.");
  const baseSelector = `[data-brand="${brand}"]`;
  const block = (selector: string, name: ThemeName) => {
    const data = theme.themes[name];
    const lines: string[] = [];
    for (const family of ["neutral", "primary", "accent"] as const) {
      const scale = validateColorScale(data[family], `${name} ${family}`);
      for (const step of COLOR_STEPS) lines.push(`  --vds-color-${family}-${step}: ${scale[step]};`);
    }
    return `${selector} {\n${lines.join("\n")}\n}`;
  };
  const foregroundBlock = (selector: string, name: ThemeName) => {
    const primary = rgbToHex(parseHex(theme.themes[name].foreground.primary.color));
    const accent = rgbToHex(parseHex(theme.themes[name].foreground.accent.color));
    return `${selector} {\n  --vds-color-on-primary: ${primary};\n  --vds-color-on-accent: ${accent};\n  --vds-color-primary-contrast: ${primary};\n  --vds-color-accent-contrast: ${accent};\n}`;
  };
  const darkSelector = `${baseSelector}[data-theme="dark"], [data-theme="dark"] ${baseSelector}, ${baseSelector}[data-theme="dark-oled"], [data-theme="dark-oled"] ${baseSelector}`;
  return `@layer tokens.brand {\n${block(baseSelector, "light")}\n\n${block(darkSelector, "dark")}\n}\n\n@layer tokens {\n${foregroundBlock(baseSelector, "light")}\n\n${foregroundBlock(darkSelector, "dark")}\n}\n`;
}

export function themeToJson(theme: VirtariColorTheme, spacing = 2) {
  return JSON.stringify(theme, null, spacing);
}

export function parseNeutralImport(input: string): Partial<Record<ThemeName, ColorScale>> {
  const parsed = JSON.parse(input) as unknown;
  if (!parsed || typeof parsed !== "object") throw new Error("Neutral palette must be a JSON object.");
  const root = parsed as Record<string, unknown>;
  const candidate = root.themes && typeof root.themes === "object" ? root.themes as Record<string, unknown> : root;
  const result: Partial<Record<ThemeName, ColorScale>> = {};
  for (const theme of ["light", "dark"] as const) {
    const value = candidate[theme];
    if (value === undefined) continue;
    const scale = value && typeof value === "object" && "neutral" in value ? (value as Record<string, unknown>).neutral : value;
    if (!scale || typeof scale !== "object") throw new Error(`${theme} neutral must be a color scale.`);
    const entries = scale as Record<string, unknown>;
    if (!COLOR_STEPS.every(key => typeof entries[key] === "string")) throw new Error(`${theme} neutral must include color steps 1–12.`);
    result[theme] = validateColorScale(entries as ColorScale, `${theme} neutral`);
  }
  if (!result.light && !result.dark) throw new Error("Expected light or dark neutral scales with steps 1–12.");
  return result;
}
