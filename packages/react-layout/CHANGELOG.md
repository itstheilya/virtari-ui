# @virtari-packages/react-layout

## 0.3.2

### Patch Changes

- aeb16a1: Unify field and container appearance through bordered, tonal and elevated surface roles. Preserve semantic focus and invalid cues and stable control geometry. Add smart ScrollArea visibility and viewport access, quiet native desktop scrollbars, mode-aware nested card radii and tones, and flex-gap Stack spacing.
- Updated dependencies [35df268]
- Updated dependencies [f2badbc]
- Updated dependencies [800f0f5]
  - @virtari-packages/utils@0.5.0

## 0.3.1

### Patch Changes

- 0e67486: fix(react-layout): Col span collapsing below 640px and broken `start` prop

  The base rule declared `grid-column-start: var(--col-start)` unconditionally.
  With `--col-start` unset (the common case) the declaration is invalid at
  computed-value time, which resets `grid-column-start` to `auto` and wipes the
  span applied by the `grid-column` shorthand on the previous line — every
  `<Col span={n}>` collapsed to a single grid track below 640px. At ≥640px the
  responsive `grid-column` shorthands re-declared later in the file masked the
  collapse but also overrode the longhand, making `start` inert there; and when
  the longhand did apply (<640px with `start` set), it clobbered the span, which
  lives in the shorthand's start component.

  `Col.tsx` now composes `start` directly into the emitted `--col-span-*` values
  (`start={3} span={6}` → `grid-column: 3 / span 6`; `start` + `span="full"` →
  `3 / -1`), and the bare `grid-column-start` declaration is gone. `start` now
  works at every breakpoint, rides through the `--col-span-sm/md/lg/xl` fallback
  chain, and no longer cancels `span`. `order: var(--col-order)` had the same
  invalid-at-computed-value-time pattern (harmlessly, since it resolved to the
  default `0`) and gained an explicit `0` fallback. The inline `--col-start`
  custom property is no longer emitted or consumed.

  Consumers that worked around the collapse by re-asserting the base span under
  `max-width: 639.98px` can drop that override after upgrading.

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
