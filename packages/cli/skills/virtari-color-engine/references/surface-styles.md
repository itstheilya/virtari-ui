# Surface styles

Set `data-surface-style="bordered"`, `"tonal"` or `"elevated"` on the document root. The docs Settings panel persists this choice independently from color theme, direction and radius. Tonal is the default.

All default editable shells use the same field background, border color, hover border and resting shadow roles. Border width remains 1px in every style, including transparent borders, to avoid changes in height or text placement. Semantic focus, invalid and selection cues remain visible. Explicit component variants such as outline and ghost are deliberate overrides.

Bordered mode uses quiet neutral alpha boundaries (a4 on surfaces, a6 on fields and a8 on hover). An explicit field outline retains its border in every mode, using the same alpha scale. Increased contrast preferences restore stronger boundaries; forced colors uses system colors. A subtle decorative border is not a claim of WCAG boundary contrast.

Use `data-field-tone="strong"` on a field or group for a transparent fill that retains its surrounding color. It deepens a light container and lifts a dark one. Nested `data-field-tone="default"` restores the current appearance's resting field fill. The attribute works across Input, NumberInput, PhoneInput, Select, Combobox, DateField, Textarea, TagInput and OTP. Theme, appearance and tone boundaries can nest in either order; light, dark and OLED colors resolve locally. Custom host colors still need their own contrast assessment.

Cards and persistent panels use `--vds-surface-bg`, `--vds-surface-border` and `--vds-surface-shadow`. Menus and temporary panels use `--vds-overlay-bg` and `--vds-overlay-shadow`; navigation uses `--vds-navigation-bg`. A tonal layer must remain distinguishable from the layer behind it. Content separators and semantic indicators are not decorative container borders and retain their colors.

Scoped styles also work on a container. Portalled content is outside that container's CSS inheritance, so apply the same attribute to the portalled content, or put the mode on the document root. The comparison example in Introduction demonstrates this.

Nested default Cards use progressively distinct surface tones. Their corner budget follows the actual parent radius and inset, with a mode-specific minimum and explicit overrides respected; see [nested surfaces](./nested-surfaces.md).

ScrollArea defaults to `type="smart"`. Only overflowing axes have a track; scroll activity, pointer hover or keyboard focus reveals it. After 900ms idle outside hover/focus it fades away. Tracks overlay the viewport, avoiding layout shifts. Use `viewportRef` for scroll restoration and `viewportProps` for native viewport attributes/events. Existing auto/always/scroll/hover modes remain available. High contrast mode keeps tracks visible.

Native overflow areas (textareas, code, editors and menu lists) also hide their themed thumb while idle on desktop and reveal it on hover or keyboard focus. Touch retains the platform scrollbar behavior. High contrast mode preserves visibility. Use ScrollArea when scroll-activity timing and an inset overlay track are needed.

Stack uses native flex gap so component margin resets and hidden form controls cannot erase the spacing between fields.

Validation: field surface comparison, nested-card geometry and smart-scroll browser fixtures are under `apps/docs/tests`; they complement the native form compatibility audit. Appearance is validated in Chromium; native Safari password-manager behavior still requires the consuming application and a real saved credential.
