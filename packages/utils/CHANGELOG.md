# @virtari-packages/utils

## 0.5.0

### Minor Changes

- f2badbc: Add static package code rendering, accessible clipboard feedback and shared rendered-field metadata. Improve semantic text contrast, control composition, native form reset, keyboard behavior, nested surfaces and containment in reviewed packages.

  Center control text with shared browser font metrics and separate icon/text slots; preserve ordinary line-box fallback where text-box trimming is unsupported.

- 800f0f5: Align segmented tracks with field radius roles, distinguish Round from Soft controls, and keep keycaps and small checkboxes appropriately bounded. Resolve nested Flow modes, clamp Editor radius subtraction and use a semantic TimeWheel role.

  Keep tab and segment indicators concentric with their tracks, bound vertical pill tracks, adapt boxed corners to radius modes, and honor explicit/provider/ancestor direction. Publish the styles required by standalone SegmentedControl consumers.

  Add shared platform-aware shortcut formatting and KbdShortcut. Match Windows/Linux Control and Apple Command labels with actual key bindings and ARIA metadata. Ignore handled, composing and repeated hotkey events by default; repeated activation can be opted into.

  Restore the actual opener's focus when a controlled CommandDialog closes, including an input that opened it with a shortcut. Preserve consumer autofocus callbacks and overrides.

### Patch Changes

- 35df268: Fix form-control compatibility: preserve refs and React 19 ref cleanups, honor disabled/read-only controls, retain numeric drafts and tag input focus, batch pasted tags, compose keyboard handlers, and preserve native text editing during IME composition. Stop combobox close from stealing outside focus and move the select clear button outside its trigger button.

  Connect date/time controls to React Aria's native form inputs. Add form association/reset support to composite controls. TagInput submits repeated name/value entries for committed tags; Combobox submits its selected values. OTP supports defaultValue and uncontrolled editing. Phone parsing refreshes when the parser loads and recognizes pasted international numbers.

  Keep Yoopta editor data when readOnly changes and apply external document replacements while retaining the mounted view for ordinary edit echoes. Avoid committing table cells on composition confirmation or browser-window blur.

## 0.4.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

## 0.3.0

### Minor Changes

- 9727c41: Second rolling update.
  - **react-data-table:** sticky utilities, toolbar and filter-drawer polish, DnD refinements.
  - **react-drawer / react-popover / react-dropdown-menu:** overlay behavior fixes.
  - **react-nav:** submenu + sticky interop.
  - **tokens / utils / react-avatar / react-slider / react-tabs / react-tooltip:** token + behavior polish.

- 39d97e8: Rolling update across the design system.
  - **tokens / utils:** primitive and helper refinements.
  - **react-data-table:** toolbar, filter drawer, DnD, and namespace refactor.
  - **react-drawer:** drag hook + Drawer.tsx updates.
  - **react-nav:** submenu context + hook refinements.
  - **react-avatar / react-checkbox / react-radio-group / react-select / react-slider / react-tabs / react-tooltip / react-popover / react-dropdown-menu:** behavior and style polish.
  - **react-date-picker / react-bottom-nav:** follow-up fixes for the latest token cleanup.

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.
