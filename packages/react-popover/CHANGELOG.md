# @virtari-packages/react-popover

## 1.1.1

### Patch Changes

- aeb16a1: Unify field and container appearance through bordered, tonal and elevated surface roles. Preserve semantic focus and invalid cues and stable control geometry. Add smart ScrollArea visibility and viewport access, quiet native desktop scrollbars, mode-aware nested card radii and tones, and flex-gap Stack spacing.
- 9b5353a: Establish the Virtari design language with tonal surface roles, purpose-based shape and spacing tokens, and consistent control typography. Remove global optical nudges, allow enlarged text to fit, and standardize logical icon slots across form controls. Existing component APIs and theme modes remain available; defaults intentionally change visually. InputIcon gains an optional logical side.
- Updated dependencies [35df268]
- Updated dependencies [f2badbc]
- Updated dependencies [800f0f5]
- Updated dependencies [9b5353a]
  - @virtari-packages/utils@0.5.0
  - @virtari-packages/primitives@1.1.0

## 1.1.0

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

## 0.4.1

### Patch Changes

- 9d56d6d: react-yoopta-editor: full chrome rewrite + Notion-style table + lucide-react removal.

  **react-yoopta-editor**
  - Drop `@yoopta/ui` and `lucide-react` entirely. All chrome (Toolbar, SlashMenu, ActionMenu, BlockOptions, BlockActions, TableHoverActions) is now reimplemented on `@yoopta/editor` primitives + Virtari design tokens with Tabler icons only.
  - New `Toolbar` — selection-anchored floating toolbar (B/I/U/S/Code/Highlight/Math) with preset highlight color popover.
  - New `SlashMenu` — auto-detects `/` typing via Slate `Editor.string` and filters available plugins; full keyboard nav.
  - New `ActionMenu` — turn-into / insert popover with searchable plugin list and Tabler icon mapping for 28 plugin types.
  - New `BlockOptions` — popover (Turn into / Duplicate / Copy link / Delete) anchored to the block grip.
  - New `BlockActions` — hover plus + drag-handle bar with native HTML5 drag-and-drop block reordering.
  - New `TableHoverActions` — Notion-style table chrome:
    - Add column / add row buttons on the right and bottom edges.
    - Per-column drag handles on top of every column; per-row drag handles on the left of every row.
    - Click handle → highlights the entire column / row (cells get `data-selected` with primary-color tint).
    - Drag handle → reorders columns / rows via `TableCommands.moveTableColumn` / `moveTableRow` with a live drop indicator line.
    - `Esc` clears the selection; `Backspace` / `Delete` removes the selected row / column.
    - Real-time reposition via `ResizeObserver` + `MutationObserver` + post-mutation `setTimeout` retries (handles Yoopta's async state batching).
    - 40 px hover buffer plus `mouseenter` cancellation so handles stay alive while the cursor travels to them.
  - New custom element renderers:
    - `TodoListElement` — Tabler checkbox icon, line-through when checked, toggles `props.checked` via Slate `Transforms.setNodes`.
    - `TabsElements` (4 levels) — wraps `tabs-container` / `tabs-list` / `tabs-item-heading` / `tabs-item-content` in the Virtari Tabs primitive.
    - `CarouselElements` — `carousel-container` becomes a horizontal `scroll-snap` rail; each `carousel-list-item` is a fixed-width slide.
  - Suppress the leaf-level slash placeholder inside table cells so `Type /…` no longer leaks into empty cells.
  - `STARTER_CONTENT` now ships interactive Tabs / Accordion / Table samples for the playground.

  **react-popover**
  - Re-export `PopoverAnchor` so consumers can position popovers against virtual references (used by the Yoopta chrome).

  **react-file-upload**
  - `FileUploadDropzone` is now click-anywhere: `noClick: true` was removed and `FileUploadTrigger` calls `e.stopPropagation()` to prevent the dropzone's bubbled click from re-opening the picker.

## 0.4.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/utils@0.4.0

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
