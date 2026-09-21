# virtari-color-engine API snapshot

Version: 0.1.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Rgb` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `Oklch` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `ThemeName` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `ContrastLevel` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `AccentStrategy` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `ColorScaleRole` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `ColorStep` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `ColorScale` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `NeutralScaleOptions` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `AccentSuggestion` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `ForegroundChoice` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `VirtariColorTheme` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `oklchToRgb` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `rgbToOklch` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `parseHex` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `rgbToHex` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `isInSrgbGamut` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `gamutMap` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `formatOklch` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `generateNeutralScale` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `generateColorScale` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `suggestAccents` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `relativeLuminance` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `contrastRatio` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `chooseForeground` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `meetsContrast` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `GenerateThemeOptions` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `generateVirtariTheme` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `parseOklch` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `ThemeCssOptions` (type) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `themeToCss` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `themeToJson` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.
- `parseNeutralImport` (export) from `virtari-color-engine`; source: `packages/color-engine/src/index.ts`.

## Source type declarations

Source: `packages/color-engine/src/index.ts`

```tsx
export type Rgb = { r: number; g: number; b: number };
```

Source: `packages/color-engine/src/index.ts`

```tsx
export type Oklch = { l: number; c: number; h: number };
```

Source: `packages/color-engine/src/index.ts`

```tsx
export type ThemeName = "light" | "dark";
```

Source: `packages/color-engine/src/index.ts`

```tsx
export type ContrastLevel = "AA" | "AAA";
```

Source: `packages/color-engine/src/index.ts`

```tsx
export type AccentStrategy = "complementary" | "analogous" | "triadic" | "split-complementary";
```

Source: `packages/color-engine/src/index.ts`

```tsx
export type ColorScaleRole = "primary" | "accent";
```

Source: `packages/color-engine/src/index.ts`

```tsx
export type ColorStep = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
```

Source: `packages/color-engine/src/index.ts`

```tsx
export type ColorScale = Record<ColorStep, string>;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export interface NeutralScaleOptions {
  hue?: number;
  chroma?: number;
  oled?: boolean;
}
```

Source: `packages/color-engine/src/index.ts`

```tsx
export interface AccentSuggestion {
  strategy: AccentStrategy;
  label: string;
  color: string;
  hue: number;
}
```

Source: `packages/color-engine/src/index.ts`

```tsx
export interface ForegroundChoice {
  color: "#000000" | "#FFFFFF";
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}
```

Source: `packages/color-engine/src/index.ts`

```tsx
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
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function oklchToRgb(color: Oklch): Rgb;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function rgbToOklch(color: Rgb): Oklch;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function parseHex(input: string): Rgb;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function rgbToHex(color: Rgb);
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function isInSrgbGamut(color: Rgb);
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function gamutMap(color: Oklch): Oklch;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function formatOklch(color: Oklch);
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function generateNeutralScale(theme: ThemeName = "light", options: NeutralScaleOptions = {}): ColorScale;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function generateColorScale(seed: string, theme: ThemeName = "light", role: ColorScaleRole = "primary"): ColorScale;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function suggestAccents(primary: string): AccentSuggestion[];
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function relativeLuminance(color: string | Rgb);
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function contrastRatio(foreground: string | Rgb, background: string | Rgb);
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function chooseForeground(background: string): ForegroundChoice;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function meetsContrast(foreground: string, background: string, level: ContrastLevel = "AA", largeText = false);
```

Source: `packages/color-engine/src/index.ts`

```tsx
export interface GenerateThemeOptions {
  name?: string;
  primary: string;
  accent?: string;
  accentStrategy?: AccentStrategy;
  neutral?: NeutralScaleOptions;
  neutralScales?: Partial<Record<ThemeName, ColorScale>>;
}
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function generateVirtariTheme(options: GenerateThemeOptions): VirtariColorTheme;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function parseOklch(input: string): Oklch;
```

Source: `packages/color-engine/src/index.ts`

```tsx
export interface ThemeCssOptions {
  brand?: string;
}
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function themeToCss(theme: VirtariColorTheme, options: ThemeCssOptions = {});
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function themeToJson(theme: VirtariColorTheme, spacing = 2);
```

Source: `packages/color-engine/src/index.ts`

```tsx
export function parseNeutralImport(input: string): Partial<Record<ThemeName, ColorScale>>;
```

## Source files

- `packages/color-engine/src/index.ts`
- `packages/color-engine/package.json`
