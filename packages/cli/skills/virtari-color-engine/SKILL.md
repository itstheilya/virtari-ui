---
name: virtari-color-engine
description: "Use when building, reviewing, or troubleshooting virtari-color-engine. Framework-agnostic OKLCH scale generation, accent harmony suggestions, WCAG contrast selection and portable Virtari theme export."
---

# virtari-color-engine

Use the existing package and its composition API. Verify the installed version against this snapshot (0.1.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `color-engine`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Install 'virtari-color-engine' for headless use, or add its editable source through the Virtari source registry.
- Use generateNeutralScale for tinted gray palettes, suggestAccents for color-theory candidates and generateVirtariTheme for complete light, dark and dark-oled token documents.
- Use themeToCss or themeToJson for portable outputs. The CSS export binds Virtari primitive scales and the canonical on-primary and on-accent foreground roles.
- Use chooseForeground and contrastRatio for opaque sRGB pairs, then validate the final composited interface in its real states.

## Known limits and mistakes to avoid

- The contrast result covers the supplied color pair; it does not establish page-level WCAG conformance.
- Do not present WCAG 3 or APCA as stable conformance standards.
- Do not create parallel color variables when a generated Virtari role already exists.

Related package IDs: `tokens`, `react-color-picker`, `react-layout`. Discover their focused skills from the catalog; do not load all packages at once.
