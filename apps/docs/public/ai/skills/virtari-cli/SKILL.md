---
name: virtari-cli
description: "Use when building, reviewing, or troubleshooting virtari. Source-first CLI that installs editable Virtari React and CSS files with transitive dependencies, conflict protection, diffing, and health checks."
---

# virtari

Use the existing package and its composition API. Verify the installed version against this snapshot (0.1.6); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `cli`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Run virtari init once, import the installed styles/index.css at the application root, then add only the component items the application needs.
- Import installed components from the local target in virtari.json. Source-owned projects must not add @virtari-packages/* runtime imports.
- Use virtari diff and --dry-run before updating customized files. Pass --overwrite only after reviewing local changes.
- The root registry.json is compatible with shadcn GitHub registries; package source remains authoritative and pnpm registry:build regenerates transformed files.

## Known limits and mistakes to avoid

- Third-party React and behavior dependencies remain normal package dependencies; source ownership removes the Virtari black box, not the React runtime.
- Do not edit generated registry files. Change packages/*/src, rebuild the registry, and commit both source and generated output.
- Preserve the MIT notice when distributing substantial portions of Virtari source.

Related package IDs: `core`, `tokens`, `utils`, `primitives`. Discover their focused skills from the catalog; do not load all packages at once.
