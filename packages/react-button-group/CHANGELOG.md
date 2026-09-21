# @virtari-packages/react-button-group

## 5.0.0

### Patch Changes

- Updated dependencies [35df268]
- Updated dependencies [f2badbc]
- Updated dependencies [0c1908a]
- Updated dependencies [800f0f5]
- Updated dependencies [9b5353a]
  - @virtari-packages/utils@0.5.0
  - @virtari-packages/react-button@1.2.0

## 4.0.0

### Patch Changes

- Updated dependencies [93cd22a]
  - @virtari-packages/react-button@1.1.0

## 3.0.0

### Patch Changes

- Updated dependencies [08252d7]
  - @virtari-packages/react-button@1.0.0

## 2.0.2

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

- Updated dependencies [4bfc69a]
  - @virtari-packages/react-button@0.4.2

## 2.0.1

### Patch Changes

- Updated dependencies [b893c0a]
  - @virtari-packages/react-button@0.4.1

## 2.0.0

### Patch Changes

- Updated dependencies [bdd9b44]
  - @virtari-packages/react-button@0.4.0

## 1.0.1

### Patch Changes

- Updated dependencies [b9889b9]
  - @virtari-packages/react-button@0.3.1

## 1.0.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/utils@0.4.0
  - @virtari-packages/react-button@0.3.0
