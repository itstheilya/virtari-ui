# @virtari-packages/react-card

## 0.3.1

### Patch Changes

- aeb16a1: Unify field and container appearance through bordered, tonal and elevated surface roles. Preserve semantic focus and invalid cues and stable control geometry. Add smart ScrollArea visibility and viewport access, quiet native desktop scrollbars, mode-aware nested card radii and tones, and flex-gap Stack spacing.
- f2badbc: Add static package code rendering, accessible clipboard feedback and shared rendered-field metadata. Improve semantic text contrast, control composition, native form reset, keyboard behavior, nested surfaces and containment in reviewed packages.

  Center control text with shared browser font metrics and separate icon/text slots; preserve ordinary line-box fallback where text-box trimming is unsupported.

- 9b5353a: Establish the Virtari design language with tonal surface roles, purpose-based shape and spacing tokens, and consistent control typography. Remove global optical nudges, allow enlarged text to fit, and standardize logical icon slots across form controls. Existing component APIs and theme modes remain available; defaults intentionally change visually. InputIcon gains an optional logical side.
- Updated dependencies [35df268]
- Updated dependencies [f2badbc]
- Updated dependencies [800f0f5]
  - @virtari-packages/utils@0.5.0

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

## 0.2.1

### Patch Changes

- Updated dependencies [9727c41]
- Updated dependencies [39d97e8]
  - @virtari-packages/utils@0.3.0

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.

### Patch Changes

- Updated dependencies [8dd36ce]
  - @virtari-packages/utils@0.2.0
