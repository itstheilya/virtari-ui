# Virtari design language

Virtari uses the hierarchy and tonal containment of Material 3 Expressive as a reference, expressed through its own indigo brand, web components, typography, and existing APIs. This is a design language, not an MUI skin or an Android component port.

## Rules

- **Color communicates role.** The canvas is quiet. Permanent navigation uses `surface-container-low`, supporting groups use `surface-container`, and nested emphasis uses `surface-container-high`. Editable fields use `surface-field`. Selected navigation uses the paired `primary-container` and `on-primary-container` tokens. Status colors retain their meaning; primary is not an error color.
- **Shape communicates purpose.** Default fields use 12px corners, actions and content groups 20px, and dialogs/sheets 28px. Small utilities have tighter corners. Sharp, round, and pill remain supported personalities; pill never turns a text field or dialog into an ellipse. Nested radii subtract the containing inset rather than repeating the outer radius.
- **Spacing communicates relationships.** Compact icon/label pairs use 4px, ordinary pairs 8px, related content 12px, groups 16px, and sections/surface insets 24px. Use the semantic gap tokens. Control sizes remain a separate scale; spacing changes must not silently resize every widget.
- **Text is centered as a line box.** Symmetric padding, flex/grid alignment, a unitless line height and a minimum control height provide stable geometry. Do not translate all labels by a fixed pixel amount or compensate separately for every component. Fonts have different ascender/descender and cap-height metrics: geometric centering is portable; identical optical centering for arbitrary fonts is not guaranteed. For a custom brand font, validate its real scripts and diacritics, and use a deliberate font-specific override only if necessary.
- **Icons belong to slots.** Leading/trailing slots reserve their actual width plus the shared gap. Native input padding reserves exactly that space. Icons do not shrink, capture unintended pointer events, or use hardcoded physical left/right offsets. Interactive trailing actions have their own accessible labels and focus stops.
- **Elevation is restrained.** Flat containment does most of the work; resting, raised, floating and modal shadow roles indicate hierarchy. Do not add blur to communicate hierarchy.
- **Motion follows intent.** Pointer movement follows the pointer directly. Entering surfaces ease out, dismissal is direct, and overshoot is bounded. Reduced motion removes nonessential movement. Never animate input focus by replacing/remounting the native input.
- **Density is explicit.** Existing compact sizes stay available for dense desktop work. Touch interfaces should select sufficiently large controls and spacing; a 24px compact control is not a universal touch target recommendation.

## Composition and ownership

The documentation uses Virtari layout, header, navigation, sidebar, drawer, command, and form primitives. A canonical navigation model supplies desktop, mobile, search and previous/next ordering. Groups use the navigation component's own expandable submenu. Each header/body/footer owns its padding; the surface owns containment. A page adds content, not another shell or duplicated navigation tree.

## Migration

Existing public component APIs and color/radius aliases remain. Default surfaces, shapes and line metrics change intentionally. Remove application-level optical `translateY` patches before evaluating the new defaults. Test custom fonts, long labels, RTL, zoom and touch density in the consuming app. Existing form/autofill and drawer-release fixes are preserved.

The [radius and shortcut audit](./radius-audit.md) records the shape-role matrix, intentional exceptions, corrected inconsistencies and browser verification. The Design guidelines page includes a live comparison of the four radius modes.

Checkpoint before the redesign: `35df268` on `main`. Redesign branch: `codex/virtari-design-language`.

## Primary references

- [Material 3 and Expressive](https://m3.material.io/)
- [Material color roles](https://m3.material.io/styles/color/roles)
- [Google's Expressive design research](https://design.google/library/expressive-material-design-google-research)
- [Material typography and script-aware line heights](https://developer.android.com/design/style/typography.html)
- [CSS Inline Layout: line boxes and font metrics](https://www.w3.org/TR/css-inline-3/)

These references inform the rules; component behavior is validated in this repository rather than assumed from another framework.
