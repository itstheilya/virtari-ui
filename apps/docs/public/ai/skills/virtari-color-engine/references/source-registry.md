# Virtari source registry

Virtari's primary distribution model installs readable React and CSS source into
the consumer repository. The existing package builds remain available during
migration, but a source installation has no runtime dependency on
`@virtari-packages/*`.

## Consumer workflow

```bash
pnpm dlx virtari@latest init
pnpm dlx virtari@latest add button input dialog
pnpm dlx virtari@latest add virtari-utilities
pnpm dlx virtari@latest add virtari-all
```

`init` creates `virtari.json`, installs the shared foundation under
`src/virtari`, and records provenance in `.virtari/installed.json`. `add`
resolves only the requested components and their transitive source dependencies.
It also adds required third-party packages to `package.json`.

By default, `init` also copies the generated Virtari skill bundle into
`.agents/skills` and writes a managed instruction block to `AGENTS.md`. This
gives coding agents a discovery-first contract: inspect `virtari.json`, the
local target, and the registry before building UI; install an existing item;
otherwise compose with exact Virtari primitives, utilities, and semantic
variables. Application code must not invent a parallel token vocabulary.

```bash
pnpm dlx virtari@latest skills list
pnpm dlx virtari@latest skills add
pnpm dlx virtari@latest skills sync
```

`skills add` installs every skill when no names are supplied and accepts one or
more focused skill names otherwise. `skills sync` refreshes generated skill
files from the current CLI release. Use `init --no-skills` to opt out or
`--skills-dir <project-relative-path>` to choose the destination.

`virtari-utilities` installs the generated token-backed utility stylesheet.
`virtari-all` resolves the shared foundation, utilities, every component, and
their transitive primitives. Prefer individual items when an application only
needs part of the system. Use `virtari list` to inspect the complete inventory.

Headless primitives are registry items at submodule granularity. A button pulls
the slot and ref-composition source it uses; it does not install dialog,
positioning, scroll-lock, or the rest of the primitive package.

Import the base stylesheet once from the application entry point:

```ts
import "./virtari/styles/index.css";
```

Then import the local component source:

```tsx
import { Button } from "./virtari/components/button";
```

The default target can be changed before installation:

```json
{
  "$schema": "https://raw.githubusercontent.com/itstheilya/virtari-ui/cli-v0.1.8/virtari.schema.json",
  "target": "src/design-system",
  "registry": "https://raw.githubusercontent.com/itstheilya/virtari-ui/cli-v0.1.8/registry.json",
  "install": true
}
```

All generated internal imports are relative, so moving the whole target tree does
not require an alias or a Virtari package at runtime.

## Safe customization and updates

Installed files are application source. Teams may change markup, props, tokens,
motion, and styles directly. The CLI stores content hashes only to explain update
drift; it does not control the installed code.

```bash
pnpm dlx virtari@latest diff button
pnpm dlx virtari@latest add button --dry-run
pnpm dlx virtari@latest add button --overwrite
pnpm dlx virtari@latest doctor
```

An ordinary `add` never replaces a changed file. `--overwrite` is explicit and
should follow review of `diff`. File targets are confined to the project, writes
are atomic, and the registry cannot invoke arbitrary post-install hooks. Package
manager installation is optional with `--no-install`.

## shadcn compatibility

The root `registry.json` follows the public shadcn source-registry schema. A
consumer can use the standard shadcn CLI without installing the Virtari CLI:

```bash
pnpm dlx shadcn@latest add itstheilya/virtari-ui/button#cli-v0.1.8
```

Registry dependencies use full same-repository GitHub addresses because bare
names refer to shadcn's built-in registry. Tagged release commands should pin the
GitHub item address to the release tag for reproducible installs.

## Repository ownership

Package source under `packages/*/src` is authoritative. `pnpm registry:build`
creates the transformed files under `registry/` and the root manifest.
Generated registry files are never edited by hand.

```bash
pnpm registry:build
pnpm registry:check
pnpm registry:test
```

CI checks deterministic generation, every relative import, third-party
dependency declarations, target confinement, conflict protection, update diffs,
and removal of internal package imports.

## Scope and limits

Source ownership removes Virtari's component API ceiling: consumers can change
the actual implementation instead of waiting for a prop. It does not remove the
contracts of React, browsers, accessibility, or third-party behavior packages.
The registry therefore keeps dependency declarations explicit and installs only
what a selected component needs.

The component source, generated registry, and CLI use the MIT License. Consumers may
copy, modify, merge, publish, and redistribute installed source while retaining
the license notice. Every registry item installs that notice at
`src/virtari/LICENSE`. The release workflow verifies that package manifests and
license files remain consistent before publishing through npm trusted
publishing with OIDC.
