# Color engine pages

## Scope

- `apps/docs/src/pages/ColorGeneratorPage.tsx`
- `apps/docs/src/pages/GrayShadeMakerPage.tsx`
- `packages/color-engine/src/index.ts`

## Findings and corrections

- Neutral choices used a separate outlined row pattern. Both pages now use the same soft, borderless selection-card language as the primary color choices.
- The neutral inventory was too small. The package now owns a reusable named palette catalog with natural, cool, warm, botanical and dark tinted families.
- Brand matching was manual. `recommendNeutralPalette` now derives a bounded low-chroma OKLCH neutral from Primary and optional Accent hues.
- A brand with no Accent had no explicit model. `neutralAccent` keeps Accent token roles available while resolving them to the selected Neutral scale.
- Reset competed with the progress stepper. It now sits in the generator footer and becomes a full-width quiet action on narrow screens.

## Evidence

- Package tests cover preset uniqueness, auto-neutral bounds, No Accent scale mapping, gamut mapping and WCAG 2.x contrast helpers.
- Color Generator was inspected at desktop and 390 × 844 viewports through Primary, Accent, No Accent and Neutral steps.
- Gray Shade Maker was inspected with the expanded preset inventory and shared selection appearance.

## Limits

- Contrast reports describe the generated opaque color pairs. Final product composition and non-text state contrast still require validation in the consumer interface.
