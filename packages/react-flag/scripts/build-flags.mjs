#!/usr/bin/env node
// Generate typed React components from flag-icons SVG assets.
// Run: `pnpm codegen` inside packages/react-flag.
//
// flag-icons ships already-optimized SVGs in /flags/4x3/. Each file looks like:
//   <svg xmlns="..." viewBox="0 0 640 480">...</svg>
// We strip the opening <svg …> attrs and wrap the contents in our own
// typed React component that carries `.vds-flag` + data-* hooks.

import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function resolveFlagIconsDir() {
  const candidates = [
    resolve(root, "node_modules/flag-icons/flags/4x3"),
    resolve(root, "../../node_modules/flag-icons/flags/4x3"),
    resolve(root, "../../node_modules/.pnpm/flag-icons/node_modules/flag-icons/flags/4x3"),
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  return candidates[0];
}

const sourceDir = resolveFlagIconsDir();
const overrideDir = resolve(root, "assets/overrides");
const outDir = resolve(root, "src/generated");
const flagsDir = resolve(outDir, "flags");

function toComponentName(code) {
  return (
    "Flag" +
    code
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
  );
}

function jsxSafeChildren(svgInner, { preserveStyles = false } = {}) {
  // SVG attributes like `clip-path`, `fill-rule`, `xmlns:xlink` need JSX-safe names.
  // Void elements in SVG (<path>, <circle>, <rect>, <use>, <stop>, <line>) are
  // already self-closing in flag-icons' source. Still, handle a few edge cases.
  return (
    svgInner
      // HTML comments -> strip
      .replace(/<!--[\s\S]*?-->/g, "")
      // bare class= -> className= (must run BEFORE the generic hyphen transform)
      .replace(/\sclass="/g, " className=\"")
      // lowercased hyphen attrs -> camelCase (clip-path -> clipPath, fill-rule -> fillRule etc.)
      // BUT keep aria-*, data-* hyphenated (JSX passes them through as-is).
      .replace(/([a-z]+)-([a-z]+)=/g, (m, a, b) =>
        a === "aria" || a === "data" ? m : a + b.charAt(0).toUpperCase() + b.slice(1) + "="
      )
      // xlink:href / xml:space -> xlinkHref / xmlSpace
      .replace(/xlink:href=/g, "xlinkHref=")
      .replace(/xml:space=/g, "xmlSpace=")
      // strip stray xmlns:* on inner nodes (rare but breaks JSX)
      .replace(/\s+xmlns:[a-z]+="[^"]*"/g, "")
      // Convert presentation styles to React style objects. The upstream icons
      // normally use SVG attributes, while curated overrides may use compact
      // presentation styles that must survive code generation.
      .replace(/\s+style="([^"]*)"/g, (_match, declarations) => {
        if (!preserveStyles) return "";
        const properties = declarations
          .split(";")
          .map((declaration) => declaration.trim())
          .filter(Boolean)
          .map((declaration) => {
            const separator = declaration.indexOf(":");
            if (separator === -1) return null;
            const property = declaration
              .slice(0, separator)
              .trim()
              .replace(/-([a-z])/g, (_value, letter) => letter.toUpperCase());
            const value = declaration.slice(separator + 1).trim();
            if (!/^[a-z][A-Za-z0-9]*$/.test(property) || property.startsWith("inkscape")) {
              return null;
            }
            return `${property}: ${JSON.stringify(value)}`;
          })
          .filter(Boolean);
        return properties.length ? ` style={{ ${properties.join(", ")} }}` : "";
      })
      // Strip Inkscape-internal attributes (sodipodi, inkscape namespaces have been
      // removed above, but the attributes themselves remain as camelCased noise)
      .replace(/\s+(sodipodi|inkscape)[A-Za-z]+="[^"]*"/g, "")
  );
}

async function main() {
  if (!existsSync(sourceDir)) {
    throw new Error(
      `flag-icons SVG sources not found at ${sourceDir}. Did you run 'pnpm install'?`,
    );
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(flagsDir, { recursive: true });

  const files = (await readdir(sourceDir)).filter((f) => f.endsWith(".svg")).sort();
  const codes = files.map((f) => f.replace(/\.svg$/, ""));

  let generated = 0;
  for (const code of codes) {
    const componentName = toComponentName(code);
    const overridePath = join(overrideDir, code + ".svg");
    const hasOverride = existsSync(overridePath);
    const sourcePath = hasOverride ? overridePath : join(sourceDir, code + ".svg");
    const sourceLabel = hasOverride
      ? `assets/overrides/${code}.svg`
      : `flag-icons/flags/4x3/${code}.svg`;
    const raw = await readFile(sourcePath, "utf8");

    // Extract <svg …>…</svg>
    const svgMatch = raw.match(/<svg([^>]*)>([\s\S]*)<\/svg>/);
    if (!svgMatch) {
      console.warn(`[react-flag] skipping ${code} — unexpected SVG shape`);
      continue;
    }
    const rawAttrs = svgMatch[1];
    const body = jsxSafeChildren(svgMatch[2].trim(), { preserveStyles: hasOverride });

    // Keep only viewBox from the original. Everything else (xmlns, width, height)
    // we re-declare on our controlled wrapper.
    const viewBoxMatch = rawAttrs.match(/\sviewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 640 480";

    const out = `// AUTO-GENERATED. DO NOT EDIT. Source: ${sourceLabel}
import type { FC } from "react";
import { cn } from "@virtari-packages/utils";
import type { FlagCoreProps } from "../../Flag";

const ${componentName}: FC<FlagCoreProps> = ({
  size,
  rounded = true,
  title,
  className,
  style,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${viewBox}"
    className={cn("vds-flag", className)}
    data-size={typeof size === "string" ? size : undefined}
    data-rounded={rounded === false ? undefined : rounded === "full" ? "full" : ""}
    data-code="${code}"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    ${body}
  </svg>
);

export default ${componentName};
`;
    await writeFile(join(flagsDir, componentName + ".tsx"), out, "utf8");
    generated++;
  }

  // codes.ts — union type + runtime array + type guard
  const codesTs = `// AUTO-GENERATED. DO NOT EDIT.
export const countryCodes = [
${codes.map((c) => `  "${c}",`).join("\n")}
] as const;

export type CountryCode = (typeof countryCodes)[number];

export function hasFlag(code: string): code is CountryCode {
  return (countryCodes as readonly string[]).includes(code);
}
`;
  await writeFile(join(outDir, "codes.ts"), codesTs, "utf8");

  // index.ts — re-export every Flag component
  const indexTs =
    "// AUTO-GENERATED. DO NOT EDIT.\n" +
    codes
      .map((c) => `export { default as ${toComponentName(c)} } from "./flags/${toComponentName(c)}";`)
      .join("\n") +
    "\n";
  await writeFile(join(outDir, "index.ts"), indexTs, "utf8");

  // manifest.ts — dynamic imports for <Flag code="…" /> fallback
  const manifestTs = `// AUTO-GENERATED. DO NOT EDIT.
import type { FC } from "react";
import type { CountryCode } from "./codes";
import type { FlagCoreProps } from "../Flag";

export const flagManifest: Record<CountryCode, () => Promise<{ default: FC<FlagCoreProps> }>> = {
${codes.map((c) => `  "${c}": () => import("./flags/${toComponentName(c)}"),`).join("\n")}
};
`;
  await writeFile(join(outDir, "manifest.ts"), manifestTs, "utf8");

  console.log(`[react-flag] generated ${generated} flag components -> src/generated/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
