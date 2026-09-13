# @virtari-packages/react-phone-input

Virtari phone input — accessible React component built on CSS variables and logical properties.

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has `read:packages` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Install from GitHub Packages

Create or edit `.npmrc` at the root of the consuming project:

```ini
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a token with `read:packages` permission (locally or in CI):

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

Then install as you would any scoped package:

```bash
npm install @virtari-packages/react-phone-input
# or
pnpm add @virtari-packages/react-phone-input
# or
yarn add @virtari-packages/react-phone-input
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { /* … */ } from "@virtari-packages/react-phone-input";
```

### Import styles

```ts
import "@virtari-packages/react-phone-input/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

## Accessibility & RTL

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides where logical props cannot express the rule. Layouts flip automatically when the host document sets `dir="rtl"`.

## Country defaults and restrictions

`PhoneInput` starts with the United States and `+1` unless `defaultCountry` is provided or an E.164 value identifies another country. Use `allowedCountries` to limit the picker. If that list excludes the United States, its first valid country becomes the fallback. `preferredCountries` only changes ordering and does not restrict the available countries.

## Links

- [Repository](https://github.com/itstheilya/virtari-ui)
- [Issues](https://github.com/itstheilya/virtari-ui/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
