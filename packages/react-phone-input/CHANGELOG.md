# @virtari-packages/react-phone-input

## 1.0.2

### Patch Changes

- ac401c7: Use the historic Lion and Sun artwork for Iran, label the country as Iran, and make date-picker overlays responsive across the full component size ramp while keeping Apply and Cancel reachable.
- 35df268: Fix form-control compatibility: preserve refs and React 19 ref cleanups, honor disabled/read-only controls, retain numeric drafts and tag input focus, batch pasted tags, compose keyboard handlers, and preserve native text editing during IME composition. Stop combobox close from stealing outside focus and move the select clear button outside its trigger button.

  Connect date/time controls to React Aria's native form inputs. Add form association/reset support to composite controls. TagInput submits repeated name/value entries for committed tags; Combobox submits its selected values. OTP supports defaultValue and uncontrolled editing. Phone parsing refreshes when the parser loads and recognizes pasted international numbers.

  Keep Yoopta editor data when readOnly changes and apply external document replacements while retaining the mounted view for ordinary edit echoes. Avoid committing table cells on composition confirmation or browser-window blur.

- e085f4e: Default phone inputs to United States and +1, and add an allowedCountries restriction that selects the first permitted country when US is unavailable.
- 35df268: Replace form-control focus outlines with a 4px spread halo using existing primary alpha colors and a soft 180ms shadow transition. Apply the same treatment to selection, date/time, search, file, rich-text and code controls; retain danger alpha for invalid fields. Preserve forced-colors focus indicators and honor reduced-motion preferences without changing token definitions.
- 9b5353a: Establish the Virtari design language with tonal surface roles, purpose-based shape and spacing tokens, and consistent control typography. Remove global optical nudges, allow enlarged text to fit, and standardize logical icon slots across form controls. Existing component APIs and theme modes remain available; defaults intentionally change visually. InputIcon gains an optional logical side.
- Updated dependencies [ac401c7]
- Updated dependencies [aeb16a1]
- Updated dependencies [35df268]
- Updated dependencies [f2badbc]
- Updated dependencies [c052c05]
- Updated dependencies [0c1908a]
- Updated dependencies [35df268]
- Updated dependencies [800f0f5]
- Updated dependencies [9b5353a]
  - @virtari-packages/react-flag@0.3.1
  - @virtari-packages/react-input@1.1.0
  - @virtari-packages/react-select@1.1.1
  - @virtari-packages/utils@0.5.0
  - @virtari-packages/primitives@1.1.0

## 1.0.1

### Patch Changes

- Updated dependencies [93cd22a]
  - @virtari-packages/react-input@1.0.0
  - @virtari-packages/react-select@1.1.0

## 1.0.0

### Major Changes

- 08252d7: Own the primitive layer: every component now builds on `@virtari-packages/primitives` instead of `@radix-ui/*`.

  The behaviour layer — focus management, keyboard navigation, portalling, dismissable layers, floating positioning — has been forked into a new in-tree package we maintain ourselves. Component behaviour and accessibility are unchanged; what changes is who owns the code and what it writes into the DOM.

  **Breaking — anything that targeted the old names must be updated:**
  - Generated element ids are now prefixed `vds-` instead of `radix-` (e.g. `aria-controls="vds-_r_4o_"`). Affects DOM snapshots and tests that assert on ids.
  - Emitted attributes are now `data-vds-*` instead of `data-radix-*` — `data-vds-popper-content-wrapper`, `data-vds-focus-guard`, `data-vds-collection-item`, `data-vds-select-viewport`, `data-vds-scroll-area-viewport`, `data-vds-menu-content`.
  - Emitted CSS custom properties are now `--vds-*` instead of `--radix-*` — `--vds-popper-available-width`, `--vds-select-trigger-width`, `--vds-accordion-content-height`, `--vds-collapsible-content-height`, and the rest of the popper/toast/slider/scroll-area set.
  - Every `@radix-ui/*` dependency is gone. Apps that render Radix components _inside_ ours via `asChild` were relying on a shared Radix context; that context is no longer shared.

  **Also fixed:** `ScrollArea`'s corner never received its background colour — the stylesheet targeted `[data-radix-scroll-area-corner]`, an attribute the primitive never emitted. The corner now carries `.vds-scroll-area-corner` and the rule matches.

### Patch Changes

- Updated dependencies [08252d7]
  - @virtari-packages/react-select@1.0.0

## 0.3.5

### Patch Changes

- Updated dependencies [4bfc69a]
  - @virtari-packages/react-input@0.4.2
  - @virtari-packages/react-select@0.5.1

## 0.3.4

### Patch Changes

- e3f38c5: Fix editable color and input interactions.
  - Restore native iOS text selection/callout behavior for editable controls and replace transform-based typing motion with a non-geometric pulse.
  - Render gradient stop color popovers as floating solid ColorPicker surfaces so stop editing uses the same single-color picker UI.
  - Make the utilities build cleanup cross-platform so `pnpm run build` works on Windows.

- Updated dependencies [e3f38c5]
  - @virtari-packages/react-input@0.4.1

## 0.3.3

### Patch Changes

- Updated dependencies [b893c0a]
  - @virtari-packages/react-input@0.4.0

## 0.3.2

### Patch Changes

- Updated dependencies [bdd9b44]
  - @virtari-packages/react-select@0.5.0

## 0.3.1

### Patch Changes

- Updated dependencies
  - @virtari-packages/react-input@0.3.1
  - @virtari-packages/react-select@0.4.1

## 0.3.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/utils@0.4.0
  - @virtari-packages/react-flag@0.3.0
  - @virtari-packages/react-input@0.3.0
  - @virtari-packages/react-select@0.4.0

## 0.2.1

### Patch Changes

- Updated dependencies [9727c41]
- Updated dependencies [39d97e8]
  - @virtari-packages/utils@0.3.0
  - @virtari-packages/react-select@0.3.0
  - @virtari-packages/react-flag@0.2.1
  - @virtari-packages/react-input@0.2.1

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.

### Patch Changes

- Updated dependencies [8dd36ce]
  - @virtari-packages/utils@0.2.0
  - @virtari-packages/react-flag@0.2.0
  - @virtari-packages/react-input@0.2.0
  - @virtari-packages/react-select@0.2.0
