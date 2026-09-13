# @virtari-packages/utilities

## 6.0.0

### Patch Changes

- Updated dependencies [aeb16a1]
- Updated dependencies [f2badbc]
- Updated dependencies [0c1908a]
- Updated dependencies [800f0f5]
- Updated dependencies [9b5353a]
  - @virtari-packages/tokens@0.7.0

## 5.0.0

### Patch Changes

- Updated dependencies [cec42d2]
  - @virtari-packages/tokens@0.6.0

## 4.0.0

### Patch Changes

- Updated dependencies [374334c]
  - @virtari-packages/tokens@0.5.0

## 3.0.3

### Patch Changes

- Updated dependencies [f2e0170]
- Updated dependencies [a2903fb]
  - @virtari-packages/tokens@0.4.2

## 3.0.2

### Patch Changes

- Updated dependencies [4bfc69a]
  - @virtari-packages/tokens@0.4.1

## 3.0.1

### Patch Changes

- e3f38c5: Fix editable color and input interactions.
  - Restore native iOS text selection/callout behavior for editable controls and replace transform-based typing motion with a non-geometric pulse.
  - Render gradient stop color popovers as floating solid ColorPicker surfaces so stop editing uses the same single-color picker UI.
  - Make the utilities build cleanup cross-platform so `pnpm run build` works on Windows.

## 3.0.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/tokens@0.4.0

## 2.0.0

### Patch Changes

- Updated dependencies [9727c41]
- Updated dependencies [39d97e8]
  - @virtari-packages/tokens@0.3.0

## 1.0.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.

### Patch Changes

- Updated dependencies [8dd36ce]
  - @virtari-packages/tokens@0.2.0
