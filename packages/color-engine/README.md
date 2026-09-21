# virtari-color-engine

Framework-agnostic color generation for Virtari and other token-based interfaces. It creates sRGB-gamut-mapped OKLCH scales, suggests accent harmonies, chooses black or white foregrounds using WCAG 2.2 contrast ratios, and exports a replaceable Virtari token bundle as JSON or CSS.

```bash
pnpm add virtari-color-engine
```

```ts
import { generateVirtariTheme, themeToCss } from "virtari-color-engine";

const theme = generateVirtariTheme({
  name: "Acme",
  primary: "#4F46E5",
  accentStrategy: "complementary",
  neutral: { hue: 265, chroma: 0.012 },
});

document.documentElement.dataset.brand = "custom";
const css = themeToCss(theme);
```

Load the generated CSS after Virtari's token stylesheet. The export overrides both the primitive scales and the canonical `--vds-color-on-primary` / `--vds-color-on-accent` foreground roles for light, dark, and dark OLED themes.

The generator returns twelve-step light and dark neutral, primary, and accent scales. Steps follow Virtari’s role progression: quiet surfaces at 1–5, boundaries at 6–8, solid fills at 9–10, and readable text at 11–12.

## API

- `generateNeutralScale(theme, options)` creates neutral or tinted-gray scales.
- `generateColorScale(seed, theme, role)` creates a primary or accent scale from a hex seed. The optional role defaults to `primary`.
- `suggestAccents(primary)` returns complementary, analogous, triadic, and split-complementary candidates.
- `chooseForeground(background)` returns black or white and AA/AAA results.
- `contrastRatio(foreground, background)` implements the WCAG 2.x relative-luminance ratio.
- `generateVirtariTheme(options)` creates the versioned portable theme document.
- `themeToJson(theme)` and `themeToCss(theme, { brand })` create downloadable outputs. Brand names are restricted to safe CSS identifier characters.
- `parseNeutralImport(json)` validates a Gray Shade Maker or full-theme JSON payload.

## Accessibility scope

The package reports WCAG 2.2 AA and AAA text thresholds from the sRGB relative-luminance formula. The result describes the exact opaque color pair passed to the function; it is not a page-level conformance claim. WCAG 3 and APCA remain developing work and are not presented as conformance claims. Always test final composited colors, interaction states, large-text classification, forced colors, and non-text cues in the consuming product.

## License

[MIT](./LICENSE) © 2026 Virtari.
