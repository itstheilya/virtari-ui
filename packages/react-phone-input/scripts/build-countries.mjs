#!/usr/bin/env node
// Generate a typed country dataset from world-countries + i18n-iso-countries
// + libphonenumber-js metadata. Run via `pnpm codegen`.

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const require = createRequire(import.meta.url);

const outDir = resolve(root, "src/generated");

const countryNameOverrides = {
  ir: { en: "Iran" },
};

function requireFromPackage(mod) {
  const candidates = [
    resolve(root, "node_modules", mod),
    resolve(root, "../..", "node_modules", mod),
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  return mod; // let require throw with a useful message
}

async function main() {
  const wcPath = requireFromPackage("world-countries/dist/countries-unescaped.json");
  if (!existsSync(wcPath)) {
    throw new Error(`world-countries not found at ${wcPath}. Run 'pnpm install' first.`);
  }
  const worldCountries = JSON.parse(await readFile(wcPath, "utf8"));

  const isoCountriesModule = require(requireFromPackage("i18n-iso-countries"));
  const en = require(requireFromPackage("i18n-iso-countries/langs/en.json"));
  const fa = require(requireFromPackage("i18n-iso-countries/langs/fa.json"));
  const ar = require(requireFromPackage("i18n-iso-countries/langs/ar.json"));
  isoCountriesModule.registerLocale(en);
  isoCountriesModule.registerLocale(fa);
  isoCountriesModule.registerLocale(ar);

  const entries = [];
  for (const c of worldCountries) {
    const code = (c.cca2 || "").toLowerCase();
    if (!code) continue;

    const root = c.idd?.root || "";
    const suffixes = c.idd?.suffixes || [];
    // For countries with a single-suffix (most), dialCode = root+suffix. For
    // multi-suffix shared roots (e.g. US/CA share +1 with many area codes),
    // we keep the root as the dial code; libphonenumber handles the rest.
    let dialCode = root;
    if (suffixes.length === 1 && suffixes[0]) dialCode = root + suffixes[0];
    if (!dialCode) continue;

    const native = Object.values(c.name?.native || {})[0]?.common || c.name?.common || code.toUpperCase();

    const generatedNames = {
      en: isoCountriesModule.getName(code.toUpperCase(), "en") || c.name?.common || code,
      fa: isoCountriesModule.getName(code.toUpperCase(), "fa") || native,
      ar: isoCountriesModule.getName(code.toUpperCase(), "ar") || native,
      native,
    };

    entries.push({
      code,
      alpha3: (c.cca3 || "").toLowerCase(),
      dialCode,
      names: { ...generatedNames, ...countryNameOverrides[code] },
      // priority: lower = shown first when two countries share a dial code
      priority: sharedPriority(code),
      region: (c.region || "").toLowerCase(),
    });
  }

  entries.sort((a, b) => a.names.en.localeCompare(b.names.en));

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const typesTs = `// AUTO-GENERATED. DO NOT EDIT.
import type { CountryCode } from "@virtari-packages/react-flag";

export interface CountryEntry {
  code: CountryCode;
  alpha3: string;
  dialCode: string;
  names: { en: string; fa: string; ar: string; native: string };
  priority: number;
  region: string;
}

export const countries: readonly CountryEntry[] = ${JSON.stringify(entries, null, 2)} as const;

export const countriesByCode: Readonly<Record<string, CountryEntry>> = (() => {
  const map: Record<string, CountryEntry> = {};
  for (const c of countries) map[c.code] = c;
  return map;
})();

export const dialCodeToCountries: Readonly<Record<string, readonly CountryEntry[]>> = (() => {
  const map: Record<string, CountryEntry[]> = {};
  for (const c of countries) {
    const k = c.dialCode;
    (map[k] ??= []).push(c);
  }
  for (const k of Object.keys(map)) map[k].sort((a, b) => a.priority - b.priority);
  return map;
})();
`;

  await writeFile(join(outDir, "countries.ts"), typesTs, "utf8");

  console.log(`[react-phone-input] generated ${entries.length} countries -> src/generated/countries.ts`);
}

// Curated priority map for shared-dial-code roots (lower = preferred default).
// libphonenumber-js follows a similar ordering internally.
function sharedPriority(code) {
  const table = {
    us: 0, ca: 1, // +1
    gb: 0, gg: 1, je: 2, im: 3, // +44
    ru: 0, kz: 1, // +7
    // Most others: 0 (single country on the dial code)
  };
  return table[code] ?? 0;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
