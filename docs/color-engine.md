# Color Engine

Color Engine turns brand inputs into the primitive color layer already consumed by Virtari's semantic tokens. It does not introduce a parallel token vocabulary.

## Pipeline

1. Gray Shade Maker generates light and dark twelve-step neutral scales from a bounded hue and chroma.
2. Color Generator accepts a primary seed, a suggested or custom accent, and generated or imported neutral scales.
3. The engine gamut-maps each OKLCH color to sRGB by reducing chroma while preserving lightness and hue.
4. Solid step 9 receives the higher-contrast black or white foreground. Results report WCAG 2.2 AA and AAA thresholds.
5. JSON output follows the versioned schema at `/schemas/color-theme.v1.json`; CSS output replaces Virtari primitive variables inside the `tokens.brand` layer.

The live preview writes only generated primitive variables to the document root and sets `data-brand="custom"`. It stores the user's draft in local storage and can remove every override through Reset.

## Scale roles

- Steps 1–2: canvas and quiet backgrounds.
- Steps 3–5: interactive and nested surfaces.
- Steps 6–8: borders and stronger boundaries.
- Steps 9–10: solid fills and interaction states.
- Steps 11–12: readable text and high-emphasis content.

Neutral chroma is intentionally limited to `0–0.04`. A neutral may carry a subtle brand tint; it must remain quieter than the intent scales.

## Accessibility boundary

WCAG 2.2 remains the conformance target. WCAG 3 is an incomplete draft and its future contrast model must not be represented as a current compliance claim. The engine's automatic foreground choice covers opaque black or white on a solid generated background. Consumers must still test composited alpha colors, gradients, images, disabled states, focus indicators, non-text controls, forced colors, and real text sizes.

## Distribution

Install the headless API with `pnpm add virtari-color-engine`, or add editable source with `pnpm dlx virtari@latest add virtari-color-engine`. The documentation panels are examples of the package operating with Virtari components; React is not required by the engine.
