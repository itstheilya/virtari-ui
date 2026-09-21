# @virtari-packages/react-flow

## 0.3.1

### Patch Changes

- 800f0f5: Align segmented tracks with field radius roles, distinguish Round from Soft controls, and keep keycaps and small checkboxes appropriately bounded. Resolve nested Flow modes, clamp Editor radius subtraction and use a semantic TimeWheel role.

  Keep tab and segment indicators concentric with their tracks, bound vertical pill tracks, adapt boxed corners to radius modes, and honor explicit/provider/ancestor direction. Publish the styles required by standalone SegmentedControl consumers.

  Add shared platform-aware shortcut formatting and KbdShortcut. Match Windows/Linux Control and Apple Command labels with actual key bindings and ARIA metadata. Ignore handled, composing and repeated hotkey events by default; repeated activation can be opted into.

  Restore the actual opener's focus when a controlled CommandDialog closes, including an input that opened it with a shortcut. Preserve consumer autofocus callbacks and overrides.

- Updated dependencies [35df268]
- Updated dependencies [f2badbc]
- Updated dependencies [800f0f5]
  - @virtari-packages/utils@0.5.0

## 0.3.0

### Minor Changes

- 93cd22a: Foundations audit remediation: sizing, spacing, colour and radius defects across the component layer.

  Four parallel audits found eight cases where the code did not do what it said. This fixes them, plus the systemic drift underneath.

  **Functional bugs**
  - **Every modal rendered at 320px.** `.vds-dialog-content` declared `min-inline-size` and `max-inline-size` but never `inline-size`, so a fixed-position box with `width: auto` collapsed onto its floor. The `size` prop only moved a ceiling the content never reached. Sizes now resolve to their declared widths — sm 384px, md 512px, lg 768px, xl 1024px. AlertDialog inherits the fix; CommandDialog gets a proper 640px palette width instead of being pinned to a dialog `md`.
  - **`<Icon color="danger">` did nothing.** All six intents referenced token names that never existed and fell through to `currentColor`. They now read the `--vds-color-icon-*` family, which the token architecture defined for exactly this and which had no consumers.
  - **Selected flow nodes had no selection ring.** `--vds-color-primary-border` did not exist and was referenced without a fallback, making the whole `box-shadow` invalid at computed-value time.
  - **The language picker could not be rebranded.** Four sites resolved to a literal `#6366f1` that neither re-tinted nor darkened. They now use real semantic roles.
  - **Drawer and Dialog bodies sat flush against their headers.** `padding-block-start: 0` on the slot after a header put the first line of content against the tint or rule. Containers now own the gap between adjacent slots, following the model Card already used. Accordion's content seam had the same defect.
  - **The editor's toolbar scroll area was rounder than the toolbar containing it** — an inverted sign. Its video letterbox also used a mode-flipping token and rendered near-white in dark mode.
  - **Input's inline action button radius was dead code.** Its `max()` floor was greater than the input radius in all four radius modes, so the concentric term never won; in pill mode the floor was `9999px`, giving a full circle at a 4px inset.
  - **Segmented tabs were 2px too round.** The concentric gap was hardcoded at `0.125rem` while the list padding token is `0.25rem` — wrong by exactly 2× — and it recomputed from the global token, so a list-radius override never propagated.

  **Accessibility**
  - Placeholders across every input moved from `--vds-color-text-subtle` (4.11:1 light, 3.57:1 dark, 3.07:1 on muted surfaces) to `--vds-color-text-placeholder`, now ~7.6:1. Placeholders are not inactive UI under WCAG 1.4.3.
  - The resting boundary of operable controls moved to `--vds-color-border-interactive`, clearing WCAG 1.4.11's 3:1. `--vds-color-border` was 1.73:1 and served as both divider and control boundary. Hover moved to `neutral-10` so the state stays monotonic in both themes. **Switch changes most:** its track was ~1.4:1, making the control and its white thumb effectively invisible.
  - Disabled states use `--vds-opacity-disabled` instead of eight ad-hoc values, with dim-once resets so nested disabled controls no longer multiply their opacity.
  - Focus rings converge on `--vds-focus-ring-width` / `-offset`, replacing ~20 per-component duplicates.

  **Consistency**
  - 25 stale `--vds-size-*` fallbacks left over from the ramp rebase in `b13ff6f` corrected. They were inert with the tokens package loaded but wrong in the standalone use the packages support.
  - Chip's ramp was shifted a full step, so an unsized Chip was 32px beside a 36px Input. Realigned. Avatar's `lg` moved off a hardcoded `3rem`.
  - Table and DataTable row heights agreed on 32/40/48. They previously meant 44px and 28px under the same token name. DataTable's declared height was also smaller than its own avatar and action cells, making the density token decorative.
  - Textarea's minimum height now scales with `size` instead of being a flat 80px at all seven sizes.
  - `size` is the canonical prop on Input, Textarea, NumberInput and OtpInput; `inputSize` still works and is deprecated.
  - ~190 raw primitive-step colour references migrated to semantic roles, so retuning a role now reaches the components that were bypassing it.
  - 40 files moved from bare `@layer components` (a weaker layer) or no layer at all into `@layer design-system.components`. Unlayered files previously outranked every layer including `utilities`, so consumers could not override them.
  - Off-scale spacing, physical properties that would not mirror in RTL, and two `!important` declarations removed.

  **Breaking**
  - `InputProps` now omits the native `size` attribute to make room for the canonical `size` prop. It was visually inert — `.vds-input` is always full width — and unused across the repo.
  - `react-color-picker`'s ~40 local tokens are renamed `--vds-color-picker-*` → `--color-picker-*`. They sat inside the global `--vds-color-*` namespace and would collide with any future semantic token. Consumers overriding them must update.
  - Table row heights shrink one step; existing tables render denser.
  - Every modal that relied on the 320px collapse will now render at its declared size.

## 0.2.1

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

## 0.2.0

### Minor Changes

- Rolling update 4 — react-flow debut + editor power-up + form-input polish.
  - **react-flow:** new package — flow canvas, badge edges, persistence hook, layout helper, tokens.
  - **react-editor:** EditorTableHoverActions + EditorToolbar overhaul, context/utils/types expansion, theme additions.
  - **react-input / react-number-input / react-textarea:** input CSS refinements.
  - **react-language-picker:** popover/menu CSS additions.
  - **react-select:** Combobox + Select CSS + token tweaks.
  - **react-switch:** Switch CSS + drag hook tuning.

## 0.1.0

- Initial release.
