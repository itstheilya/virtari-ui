# Virtari CLI

Install editable Virtari component source directly into a React project.

```bash
pnpm dlx virtari@latest init
pnpm dlx virtari@latest add button input dialog
pnpm dlx virtari@latest add virtari-utilities
pnpm dlx virtari@latest add virtari-all
```

`init` also installs the complete portable AI skill bundle in
`.agents/skills` and adds a managed Virtari contract to the project's
`AGENTS.md`. The contract requires an agent to search the local source and
registry before creating UI, install an existing component when available,
and use only documented Virtari variables and utilities when composing a
missing component.

```bash
pnpm dlx virtari@latest skills list
pnpm dlx virtari@latest skills add
pnpm dlx virtari@latest skills sync
```

Use `--no-skills` with `init` to opt out, or `--skills-dir <path>` to select a
different project-local skill directory. `skills add <name...>` installs only
the selected focused skills; omitting names installs the complete bundle.

Run `pnpm dlx virtari@latest list` to discover every installable item. Pass one
name for a single component, several names for a feature set, or `virtari-all`
for the complete component collection and utility stylesheet.

The source is written to `src/virtari` by default. Change `target` in
`virtari.json` to move the complete tree. Internal imports are relative, so the
source remains portable and does not depend on Virtari runtime packages.

Use `virtari diff button` before updating an edited component. Existing changed
files are never overwritten unless `--overwrite` is supplied explicitly.

The same items are available through the official shadcn GitHub registry
protocol:

```bash
pnpm dlx shadcn@latest add itstheilya/virtari-ui/button#cli-v0.1.7
```

The CLI reads the matching release tag by default. Set
`VIRTARI_REGISTRY_TOKEN` for an authenticated private GitHub source registry.
