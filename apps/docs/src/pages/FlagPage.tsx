import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  Flag,
  FlagIr,
  FlagUs,
  FlagGb,
  FlagDe,
  FlagFr,
  FlagJp,
  FlagBr,
  FlagIn,
  FlagSa,
  FlagGbEng,
  FlagGbSct,
  FlagGbWls,
  FlagEsCt,
  FlagEsGa,
  countryCodes,
  hasFlag,
  type CountryCode,
} from "@virtari-packages/react-flag";
import { Input } from "@virtari-packages/react-input";
import { Section, Row, Stack } from "../components";

const SIZES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

export function FlagPage() {
  const [query, setQuery] = useState("");
  const filtered = countryCodes.filter((c) => c.includes(query.toLowerCase())).slice(0, 48);

  return (
    <>
      <Section
        title="Overview"
        description="Typed, tree-shakeable country flags. The Iran entry uses the historic Lion and Sun flag; the remaining collection is generated from flag-icons (MIT)."
      >
        <Row>
          <FlagIr size="xl" title="Iran" />
          <FlagUs size="xl" />
          <FlagGb size="xl" />
          <FlagDe size="xl" />
          <FlagFr size="xl" />
          <FlagJp size="xl" />
          <FlagBr size="xl" />
          <FlagIn size="xl" />
          <FlagSa size="xl" />
        </Row>
      </Section>

      <Section title="Size ramp" description="Same size scale as Input and Button — flags snap into rows of controls cleanly.">
        <Stack>
          {SIZES.map((s) => (
            <Row key={s}>
              <span className="docs-size-label">{s}</span>
              <Flag code="ir" size={s} title="Iran" />
              <Flag code="us" size={s} />
              <Flag code="jp" size={s} />
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="Rounded variants" description="Default is subtle 2px; rounded='full' gives a circular flag (1:1 crop).">
        <Row>
          <Flag code="ir" size="xl" rounded />
          <Flag code="ir" size="xl" rounded={false} />
          <Flag code="ir" size="xl" rounded="full" />
          <Flag code="us" size="xl" rounded="full" />
          <Flag code="fr" size="xl" rounded="full" />
        </Row>
      </Section>

      <Section
        title="Sub-region flags"
        description="flag-icons ships flags for autonomous regions — useful for language pickers (Welsh, Scottish Gaelic, Catalan, Galician, Basque)."
      >
        <Row>
          <FlagGbEng size="lg" title="England" />
          <FlagGbSct size="lg" title="Scotland" />
          <FlagGbWls size="lg" title="Wales" />
          <FlagEsCt size="lg" title="Catalonia" />
          <FlagEsGa size="lg" title="Galicia" />
        </Row>
      </Section>

      <Section
        title="Dynamic <Flag code=…>"
        description="When the country code is only known at runtime, use the dispatching <Flag> — it lazy-loads the per-country SVG via the generated manifest."
      >
        <Stack>
          <Input
            inputSize="md"
            placeholder="Type an ISO code like ir, us, gb-eng…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Row style={{ flexWrap: "wrap", gap: "0.5rem" }}>
            {filtered.map((code) => (
              <span key={code} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                <Flag code={code} size="md" />
                <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)" }}>{code}</span>
              </span>
            ))}
          </Row>
          <p className="docs-hint">
            hasFlag("ir") → {String(hasFlag("ir"))}, hasFlag("xx") → {String(hasFlag("xx"))} — total: {countryCodes.length}
          </p>
        </Stack>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`// Named import (best tree-shaking; use when code is known at build time)
import { FlagIr, FlagUs } from "@virtari-packages/react-flag";
<FlagIr size="lg" />

// Dynamic (lazy-loaded per manifest)
import { Flag } from "@virtari-packages/react-flag";
<Flag code="gb-eng" size="md" rounded="full" title="England" />

// Sizes: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number`} />
      </Section>

      <Section title="License">
        <p className="docs-hint">
          SVG assets from flag-icons (MIT) by Panayiotis Lipiridis. See packages/react-flag/ATTRIBUTION.md.
        </p>
      </Section>
    </>
  );
}

// Suppress unused-import warnings in editors by touching types:
export type _TouchTypes = CountryCode;
