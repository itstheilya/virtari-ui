# Virtari component and documentation quality contract

Every page review uses this contract. Fix reusable behavior and appearance in the owning package; a documentation-only override must not conceal a package defect. Preserve public APIs unless an additive capability is needed. Every page has its own review record under `docs/page-audit/` with findings, changed files, checks and remaining limitations.

## Package ownership and composition

- Use actual package components for controls, code, status, typography and layout. Read package exports and the focused skill before editing. Do not build another copy button, input, tab bar or code surface in a page when the package owns it.
- Documentation owns explanatory text, sample data and demo arrangements. A small shared adapter may select package props or translate labels; it must not reproduce component rendering, interaction or styling.
- Defaults must be useful in consumer applications with core, tokens and exported package styles alone. Never require `docs-*` CSS to supply component spacing, color, focus or disabled behavior.
- Keep native attributes, controlled/uncontrolled state, composed refs, event cancellation and form reset intact. Add a focused regression check when fixing behavior.

## Color and containment

- Use semantic foreground/background pairs; syntax colors are readable text roles, not solid fill steps. Check the composed background, including alpha layers. Ordinary text targets 4.5:1; large text 3:1. Essential control/state graphics target 3:1 against adjacent colors where WCAG requires it. Decorative borders need not become heavy outlines.
- Verify light, dark and dark-oled; bordered, tonal and elevated; and a nested theme. A child surface must remain distinguishable on a card without making every border conspicuous.
- Disabled is distinguishable but not a substitute for readable active text. Error, selected and focus states must not depend on color alone. Preserve forced-colors behavior.
- Use shared surface roles and existing brand variables. Fix a package's incorrect role mapping before inventing a page-specific color.

## Geometry and typography

- Use the established token scales and semantic gaps. Icon-label pairs, field helper text, groups and sections have different relationships. Symmetric control padding and slot-owned spacing must hold without per-label transforms.
- Icons have explicit size, reserved space and no accidental shrink; leading/trailing placement uses logical properties. Decorative icons do not capture input interaction; icon actions have their own accessible name and target.
- Use minimum height and unitless line height; allow long labels and real Persian/Latin scripts. Do not promise identical optical centering for every font or trim diacritics to align text.
- Check painted text as well as its CSS box. For icon/text control rows, use the shared controlText/vds-control-text path: supported browsers trim layout leading to font cap/baseline metrics; other browsers retain normal line boxes. Keep glyph overflow visible and verify real Latin/Persian labels.
- Shape follows existing roles and scoped sharp/soft/round/pill modes. Nested corners use the available inset; the surface contains children and header/body/footer own their padding. Avoid fixed radii that bypass the package tokens.

## Interaction and responsive behavior

- Keyboard reachability, visible focus, correct tab/radio/menu semantics, accessible names, error association and disabled behavior are part of the package.
- Verify RTL, long content, narrow containers and zoom without page-level horizontal overflow. Code/tables may scroll internally. Do not shrink readable text to avoid overflow.
- Touch controls need appropriate targets and separation. WCAG's 24 CSS-pixel minimum has exceptions; use comfortable larger targets where practical rather than treating the minimum as the ideal.
- Motion honors reduced motion and never remounts inputs. Overlay drag must release correctly. Native editable fields retain autocomplete, paste and reset.

## Code and documentation

- Use `CodeBlock` / `InlineCode` from `@virtari-packages/react-code`. Read-only snippets need a lightweight non-editable rendering path: do not mount a full editor hundreds of times solely to display a string.
- Language, copy feedback, line numbers, overflow, selection and surface contrast belong to the package. An editable example uses `CodeEditor`.
- Samples must use real exported props and demonstrate useful combinations, including empty, disabled, invalid and long-content states where relevant. Explain limitations honestly; do not label them fixed until the package changes and checks support that claim.
- Keep docs layout and navigation shared. Remove obsolete overrides after moving a fix into the package. Regenerate AI knowledge after source/examples change; root performs the final shared generation to avoid concurrent writes.

## Review evidence

Record concrete before/after defects, owning files and checks. Source review alone is not browser validation. Inspect rendered affected states and package-only compositions for visual fixes; measure contrast for changed text roles. An unchanged page can pass review only with an explanation of what was checked. Do not introduce arbitrary changes just to claim a page was edited.

References: [Virtari design language](design-language.md), [surface styles](surface-styles.md), [nested shape](nested-surfaces.md), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), [Material layout](https://m3.material.io/foundations/layout/canonical-examples/overview).
