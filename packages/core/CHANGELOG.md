# @virtari-packages/core

## 0.4.0

### Minor Changes

- f2badbc: Add static package code rendering, accessible clipboard feedback and shared rendered-field metadata. Improve semantic text contrast, control composition, native form reset, keyboard behavior, nested surfaces and containment in reviewed packages.

  Center control text with shared browser font metrics and separate icon/text slots; preserve ordinary line-box fallback where text-box trimming is unsupported.

### Patch Changes

- aeb16a1: Unify field and container appearance through bordered, tonal and elevated surface roles. Preserve semantic focus and invalid cues and stable control geometry. Add smart ScrollArea visibility and viewport access, quiet native desktop scrollbars, mode-aware nested card radii and tones, and flex-gap Stack spacing.
- 9b5353a: Establish the Virtari design language with tonal surface roles, purpose-based shape and spacing tokens, and consistent control typography. Remove global optical nudges, allow enlarged text to fit, and standardize logical icon slots across form controls. Existing component APIs and theme modes remain available; defaults intentionally change visually. InputIcon gains an optional logical side.
- Updated dependencies [aeb16a1]
- Updated dependencies [f2badbc]
- Updated dependencies [0c1908a]
- Updated dependencies [800f0f5]
- Updated dependencies [9b5353a]
  - @virtari-packages/tokens@0.7.0

## 0.3.5

### Patch Changes

- Updated dependencies [cec42d2]
  - @virtari-packages/tokens@0.6.0

## 0.3.4

### Patch Changes

- 374334c: Fix the token foundations: undefined names, dark-mode contrast, and the missing interior-spacing and radius-composition tiers.

  **Contrast (behavioural — colours change)**
  - `--vds-color-on-warning` was `neutral-12`, which is dark ink in light mode and near-white in dark. Every warning solid rendered white-on-amber at 2.19:1 as soon as the theme flipped. It now points at `--vds-color-black`, which is mode-independent like amber itself: 7.78:1 in both modes.
  - Dark-mode `{primary,success,info,danger,accent}-9` carried white text at 3.27–4.01:1. Lightness lowered to the highest value on the scale's grid that still clears 4.5:1, with hue and chroma held exactly: primary `0.610→0.575`, success `0.610→0.545`, danger `0.620→0.585`, info `0.620→0.555`, accent `0.665→0.580`. `warning-9` is unchanged — it carries black ink.
  - `--vds-color-text-placeholder` moves from `neutral-9` (4.11:1 light / 3.57:1 dark) to `neutral-11` (7.77:1 / 7.60:1).
  - The dark intent ramp now also applies under `[data-theme="dark-oled"]`. It always should have: the OLED block overrides step 1 only, which is only coherent if steps 2–12 come from the dark ladder. Previously an OLED page got the light-mode intent ramp on a pure-black canvas.
  - `color-scheme` on bare `:root` narrows from `light dark` to `light`. Nothing in the system implements `prefers-color-scheme`, so the wider value made the browser darken the surfaces it owns — scrollbars, form controls, autofill, `<select>` popups — while every token stayed light. `[data-theme="dark"]` still declares `dark`.

  **New tokens**
  - `colors/aliases.css` defines the ~40 names components were already typing but that resolved to nothing, so those `var()` lookups stopped falling through to hardcoded hex: bare intent names (`--vds-color-primary`), the `*-emphasis` / `*-on-emphasis` / `*-muted` / `*-muted-text` / `*-subtle` families, `--vds-color-neutral-solid` / `-bg`, the `overlay*` spelling of `scrim*`, and the `sky-11` / `emerald-11` / `violet-11` syntax-highlight hues used by `react-editor`.
  - `--vds-color-border-interactive` (`neutral-9`) — the first neutral step that clears WCAG 1.4.11's 3:1 for the boundary of an operable control. `--vds-color-border` is a divider weight (1.73:1) and was being used for both.
  - `--vds-opacity-disabled` — one disabled opacity, replacing eight ad-hoc values.
  - `--vds-focus-ring-width` / `--vds-focus-ring-offset` — replacing ~20 per-component duplicates.
  - `spacing/semantic.css` — the interior-spacing tier: `--vds-surface-padding-inline/-block`, `--vds-slot-gap`, `--vds-stack-gap`, `--vds-cluster-gap`, `--vds-label-gap`, `--vds-control-padding-inline` and `-emphasis`. Strictly ordered, so nested groupings stay legible.
  - `--vds-surface-width-{xs,sm,md,lg,xl,2xl}` in `sizing.css` — overlay widths. Dialogs had been sized with `--vds-space-*`, which couples every overlay's width to the spacing ramp.

  **Radius**
  - `--vds-radius-0` was unitless `0`, which is a `<number>`, not a `<length>` — so any `calc()` subtracting a length from it was invalid and dropped the whole declaration. Now `0px`.
  - New `radii/nesting.css` adds the concentricity channel: a container opts in with `data-radius-host` and publishes `--vds-radius-host-r/-b/-p`; its direct children read `--vds-radius-inset` or `--vds-radius-flush`. Registered with `inherits: false` so it reaches exactly one level. Infrastructure — no component is migrated onto it yet.

  **core**
  - `*::-webkit-scrollbar-thumb` hardcoded `border-radius: 999px`, bypassing `--vds-radius-scrollbar-thumb`, which exists specifically to stop an 8px-thick thumb from rendering as a capsule. It now uses the token.
  - The `:focus-visible` ring reads `--vds-focus-ring-width` / `-offset` instead of `2px` literals.

- Updated dependencies [374334c]
  - @virtari-packages/tokens@0.5.0

## 0.3.3

### Patch Changes

- Updated dependencies [f2e0170]
- Updated dependencies [a2903fb]
  - @virtari-packages/tokens@0.4.2

## 0.3.2

### Patch Changes

- Updated dependencies [4bfc69a]
  - @virtari-packages/tokens@0.4.1

## 0.3.1

### Patch Changes

- e3f38c5: Fix editable color and input interactions.
  - Restore native iOS text selection/callout behavior for editable controls and replace transform-based typing motion with a non-geometric pulse.
  - Render gradient stop color popovers as floating solid ColorPicker surfaces so stop editing uses the same single-color picker UI.
  - Make the utilities build cleanup cross-platform so `pnpm run build` works on Windows.

## 0.3.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/tokens@0.4.0

## 0.2.1

### Patch Changes

- Updated dependencies [9727c41]
- Updated dependencies [39d97e8]
  - @virtari-packages/tokens@0.3.0

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.

### Patch Changes

- Updated dependencies [8dd36ce]
  - @virtari-packages/tokens@0.2.0
