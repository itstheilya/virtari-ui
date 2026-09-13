# Original documentation page

Source ID: `apps/docs/src/pages/SelectPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { Flag, type CountryCode } from "@virtari-packages/react-flag";
import { useEffect, useState } from "react";
import {
  Select,
  SelectField,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectEmpty,
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxOptions,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxLoading,
  type ComboboxItemData,
} from "@virtari-packages/react-select";
import { Section, Row } from "../components";

/* ─────────────────────────────────────────────
 * Realistic data sets
 * ───────────────────────────────────────────── */

const COUNTRIES: ComboboxItemData[] = [
  { value: "us", label: "United States", flag: "us", region: "Americas" },
  { value: "ca", label: "Canada", flag: "ca", region: "Americas" },
  { value: "mx", label: "Mexico", flag: "mx", region: "Americas" },
  { value: "br", label: "Brazil", flag: "br", region: "Americas" },
  { value: "ar", label: "Argentina", flag: "ar", region: "Americas" },
  { value: "uk", label: "United Kingdom", flag: "gb", region: "Europe" },
  { value: "de", label: "Germany", flag: "de", region: "Europe" },
  { value: "fr", label: "France", flag: "fr", region: "Europe" },
  { value: "es", label: "Spain", flag: "es", region: "Europe" },
  { value: "it", label: "Italy", flag: "it", region: "Europe" },
  { value: "nl", label: "Netherlands", flag: "nl", region: "Europe" },
  { value: "se", label: "Sweden", flag: "se", region: "Europe" },
  { value: "no", label: "Norway", flag: "no", region: "Europe" },
  { value: "pl", label: "Poland", flag: "pl", region: "Europe" },
  { value: "ir", label: "Iran", flag: "ir", region: "Asia" },
  { value: "tr", label: "Turkey", flag: "tr", region: "Asia" },
  { value: "ae", label: "United Arab Emirates", flag: "ae", region: "Asia" },
  { value: "sa", label: "Saudi Arabia", flag: "sa", region: "Asia" },
  { value: "jp", label: "Japan", flag: "jp", region: "Asia" },
  { value: "kr", label: "South Korea", flag: "kr", region: "Asia" },
  { value: "cn", label: "China", flag: "cn", region: "Asia" },
  { value: "in", label: "India", flag: "in", region: "Asia" },
  { value: "sg", label: "Singapore", flag: "sg", region: "Asia" },
  { value: "au", label: "Australia", flag: "au", region: "Oceania" },
  { value: "nz", label: "New Zealand", flag: "nz", region: "Oceania" },
  { value: "za", label: "South Africa", flag: "za", region: "Africa" },
  { value: "eg", label: "Egypt", flag: "eg", region: "Africa" },
  { value: "ng", label: "Nigeria", flag: "ng", region: "Africa" },
  { value: "ke", label: "Kenya", flag: "ke", region: "Africa" },
  { value: "ma", label: "Morocco", flag: "ma", region: "Africa" },
];

const FRAMEWORKS: ComboboxItemData[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "angular", label: "Angular" },
  { value: "qwik", label: "Qwik" },
  { value: "astro", label: "Astro" },
  { value: "nextjs", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "nuxt", label: "Nuxt" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "preact", label: "Preact" },
  { value: "lit", label: "Lit" },
  { value: "ember", label: "Ember" },
];

/** Mock async user search — resolves after 400ms. Fires a small result set. */
const USER_DIRECTORY = [
  { value: "u-1", label: "Alice Chen", role: "Product Designer" },
  { value: "u-2", label: "Bilal Karim", role: "Staff Engineer" },
  { value: "u-3", label: "Carla Moretti", role: "Engineering Manager" },
  { value: "u-4", label: "Daniel Okafor", role: "Platform Engineer" },
  { value: "u-5", label: "Elena Ivanova", role: "Data Scientist" },
  { value: "u-6", label: "Farid Ahmadi", role: "Design Systems Lead" },
  { value: "u-7", label: "Grace Nakamura", role: "Frontend Engineer" },
  { value: "u-8", label: "Hana Park", role: "UX Researcher" },
  { value: "u-9", label: "Ivan Dimitrov", role: "Backend Engineer" },
  { value: "u-10", label: "Julia Weiss", role: "Product Manager" },
];

/** Synthetic city list for the virtualization demo. */
const VIRTUAL_CITIES: ComboboxItemData[] = Array.from({ length: 2000 }, (_, i) => {
  const bases = [
    "Tehran", "Tokyo", "Berlin", "Paris", "Madrid", "Cairo", "Lagos",
    "Rio", "Lima", "Sydney", "Auckland", "Oslo", "Warsaw", "Seoul",
    "Mumbai", "Jakarta", "Dubai", "Istanbul", "Hanoi", "Lisbon",
  ];
  const base = bases[i % bases.length]!;
  return { value: `city-${i}`, label: `${base} District ${i + 1}` };
});

/* ─────────────────────────────────────────────
 * Grouped render prop for the region example.
 * Closure resets at index 0 so headers stay correct after filtering.
 * ───────────────────────────────────────────── */
const renderCountryWithGroupHeader = (() => {
  let lastRegion: string | null = null;
  return (item: ComboboxItemData, index: number) => {
    if (index === 0) lastRegion = null;
    const region = item.region as string;
    const showHeader = region !== lastRegion;
    lastRegion = region;
    return (
      <div key={item.value}>
        {showHeader ? (
          <div
            style={{
              padding: "var(--vds-space-1-5) var(--vds-space-3)",
              fontSize: "var(--vds-text-xs)",
              fontWeight: 600,
              color: "var(--vds-color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {region}
          </div>
        ) : null}
        <ComboboxItem value={item.value}>
          <span style={{ marginInlineEnd: "0.5rem" }}>
            <Flag code={item.flag as CountryCode} size="sm" />
          </span>
          {item.label}
        </ComboboxItem>
      </div>
    );
  };
})();

/* ─────────────────────────────────────────────
 * Async search mock
 * ───────────────────────────────────────────── */
function useAsyncUserSearch() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<ComboboxItemData[]>(USER_DIRECTORY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setItems(USER_DIRECTORY);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = window.setTimeout(() => {
      const q = query.toLowerCase();
      setItems(
        USER_DIRECTORY.filter(
          (u) =>
            u.label.toLowerCase().includes(q) ||
            (u.role as string).toLowerCase().includes(q),
        ),
      );
      setLoading(false);
    }, 380);
    return () => window.clearTimeout(t);
  }, [query]);

  return { items, loading, onSearchChange: setQuery };
}

/* ─────────────────────────────────────────────
 * Page
 * ───────────────────────────────────────────── */
export function SelectPage() {
  /* Select state */
  const [plan, setPlan] = useState<string>("");

  /* Combobox state */
  const [country, setCountry] = useState<string | string[]>("");
  const [stack, setStack] = useState<string | string[]>([]);
  const [city, setCity] = useState<string | string[]>("");
  const [user, setUser] = useState<string | string[]>("");
  const [region, setRegion] = useState<string | string[]>("");

  const asyncSearch = useAsyncUserSearch();

  return (
    <>
      {/* ═══════════════════════ SELECT ═══════════════════════ */}

      <Section
        title="Select — basic"
        description="Accessible native-select clone. Use for 2–20 static options. Keeps standard form semantics and first-char typeahead."
      >
        <div style={{ maxInlineSize: "18rem" }}>
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger aria-label="Choose an option">
              <SelectValue placeholder="Choose a plan…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free — 3 projects</SelectItem>
              <SelectItem value="pro">Pro — $19/mo</SelectItem>
              <SelectItem value="team">Team — $49/mo</SelectItem>
              <SelectItem value="enterprise" disabled>
                Enterprise — contact sales
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section
        title="Field API"
        description="Use SelectField when the compound Select needs the same label, description, error, and counter controls as Input and Textarea."
      >
        <div style={{ maxInlineSize: "22rem" }}>
          <SelectField
            label="Billing plan"
            description="Choose how your workspace is billed."
            error={!plan ? "Select a plan to continue" : undefined}
            counter="4 options"
            invalid={!plan}
            metaLayout="inline"
            descriptionAlign="end"
            errorAlign="start"
            counterAlign="end"
          >
            {({ controlId, describedBy, invalid }) => (
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger
                  id={controlId}
                  aria-describedby={describedBy}
                  invalid={invalid}
                >
                  <SelectValue placeholder="Choose a plan…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free — 3 projects</SelectItem>
                  <SelectItem value="pro">Pro — $19/mo</SelectItem>
                  <SelectItem value="team">Team — $49/mo</SelectItem>
                  <SelectItem value="enterprise">
                    Enterprise — contact sales
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </SelectField>
        </div>
      </Section>

      <Section title="Appearance" description="soft (default), outline, ghost, filled.">
        <Row>
          {(["soft", "outline", "ghost", "filled"] as const).map((a) => (
            <div key={a} style={{ inlineSize: "14rem" }}>
              <Select>
                <SelectTrigger appearance={a} aria-label={`${a} appearance`}>
                  <SelectValue placeholder={`${a} appearance`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Option A</SelectItem>
                  <SelectItem value="b">Option B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </Row>
      </Section>

      <Section
        title="Sizes"
        description="Shared height ramp with Button, Input, Toggle."
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--vds-space-2)",
            maxInlineSize: "22rem",
          }}
        >
          {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <Row key={s}>
              <span className="docs-size-label">{s}</span>
              <Select>
                <SelectTrigger size={s} aria-label={`${s} size`}>
                  <SelectValue placeholder={`${s} size`} />
                </SelectTrigger>
                <SelectContent size={s}>
                  <SelectItem value="a">Option A</SelectItem>
                  <SelectItem value="b">Option B</SelectItem>
                </SelectContent>
              </Select>
            </Row>
          ))}
        </div>
      </Section>

      <Section
        title="States"
        description="Clearable, loading, invalid. Works alongside existing primitive props."
      >
        <Row>
          <div style={{ inlineSize: "16rem" }}>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger
                aria-label="Billing plan"
                clearable
                onClear={() => setPlan("")}
              >
                <SelectValue placeholder="Clearable — select then click ×" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div style={{ inlineSize: "16rem" }}>
            <Select>
              <SelectTrigger loading aria-label="Loading plans">
                <SelectValue placeholder="Loading plans…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div style={{ inlineSize: "16rem" }}>
            <Select>
              <SelectTrigger invalid aria-label="Required plan">
                <SelectValue placeholder="Invalid — field required" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div style={{ inlineSize: "16rem" }}>
            <Select disabled>
              <SelectTrigger aria-label="Choose an option">
                <SelectValue placeholder="Disabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Option A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Row>
      </Section>

      <Section title="Grouped">
        <div style={{ maxInlineSize: "18rem" }}>
          <Select>
            <SelectTrigger aria-label="Choose an option">
              <SelectValue placeholder="Pick a timezone…" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Americas</SelectLabel>
                <SelectItem value="est">Eastern (EST / UTC-5)</SelectItem>
                <SelectItem value="cst">Central (CST / UTC-6)</SelectItem>
                <SelectItem value="mst">Mountain (MST / UTC-7)</SelectItem>
                <SelectItem value="pst">Pacific (PST / UTC-8)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                <SelectItem value="cet">Central European (UTC+1)</SelectItem>
                <SelectItem value="eet">Eastern European (UTC+2)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="ist">India Standard (UTC+5:30)</SelectItem>
                <SelectItem value="irst">Iran Standard (UTC+3:30)</SelectItem>
                <SelectItem value="jst">Japan Standard (UTC+9)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Empty state" description="Use <SelectEmpty> when you render no SelectItems.">
        <div style={{ maxInlineSize: "18rem" }}>
          <Select>
            <SelectTrigger aria-label="Choose an option">
              <SelectValue placeholder="No options yet…" />
            </SelectTrigger>
            <SelectContent>
              <SelectEmpty>No plans available for your region.</SelectEmpty>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {/* ═══════════════════════ COMBOBOX ═══════════════════════ */}

      <Section
        title="Combobox — searchable"
        description="For anything beyond ~20 options, async data, or when users need to filter by typing. Built on Popover + custom listbox — the underlying Select focus model can't host an input."
      >
        <div style={{ maxInlineSize: "22rem" }}>
          <Combobox
            items={COUNTRIES}
            value={country}
            onValueChange={setCountry}
            emptyMessage="No countries match that search"
          >
            <ComboboxTrigger aria-label="Country" placeholder="Select a country…" clearable />
            <ComboboxContent>
              <ComboboxInput placeholder="Search countries…" />
              <ComboboxList>
                <ComboboxOptions>
                  {(item) => (
                    <ComboboxItem key={item.value} value={item.value}>
                      <span style={{ marginInlineEnd: "0.5rem" }}>
                        <Flag code={item.flag as CountryCode} size="sm" />
                      </span>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxOptions>
                <ComboboxEmpty />
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </Section>

      <Section
        title="Multi-select with chips"
        description="Selected items render as removable Chips in the trigger. Backspace on empty input removes the last one. Try: search for “next”."
      >
        <div style={{ maxInlineSize: "28rem" }}>
          <Combobox
            items={FRAMEWORKS}
            value={stack}
            onValueChange={setStack}
            multiple
            emptyMessage="No frameworks match"
          >
            <ComboboxTrigger aria-label="Frameworks" placeholder="Pick your stack…" clearable />
            <ComboboxContent>
              <ComboboxInput placeholder="Search frameworks…" />
              <ComboboxList>
                <ComboboxOptions>
                  {(item) => (
                    <ComboboxItem key={item.value} value={item.value}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxOptions>
                <ComboboxEmpty />
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <p className="docs-hint" style={{ marginBlockStart: "var(--vds-space-2)" }}>
          Selected: {Array.isArray(stack) ? stack.length : 0} / {FRAMEWORKS.length}
        </p>
      </Section>

      <Section
        title="Async search"
        description="Consumer owns filtering. Pass onSearchChange and supply filtered items. Built-in loading + empty states."
      >
        <div style={{ maxInlineSize: "22rem" }}>
          <Combobox
            items={asyncSearch.items}
            value={user}
            onValueChange={setUser}
            loading={asyncSearch.loading}
            onSearchChange={asyncSearch.onSearchChange}
            emptyMessage="No teammates found"
          >
            <ComboboxTrigger aria-label="Teammate" placeholder="Assign to teammate…" clearable />
            <ComboboxContent>
              <ComboboxInput placeholder="Type a name or role…" />
              <ComboboxList>
                <ComboboxLoading>Searching directory…</ComboboxLoading>
                <ComboboxOptions>
                  {(item) => (
                    <ComboboxItem key={item.value} value={item.value}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "2px",
                        }}
                      >
                        <span>{item.label}</span>
                        <span
                          style={{
                            fontSize: "var(--vds-text-xs)",
                            color: "var(--vds-color-text-muted)",
                          }}
                        >
                          {item.role as string}
                        </span>
                      </div>
                    </ComboboxItem>
                  )}
                </ComboboxOptions>
                <ComboboxEmpty />
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </Section>

      <Section
        title="Virtualized (2 000 items)"
        description="Opt into @tanstack/react-virtual with `virtualized`. Arrow keys stay in sync with scrolling."
      >
        <div style={{ maxInlineSize: "22rem" }}>
          <Combobox
            items={VIRTUAL_CITIES}
            value={city}
            onValueChange={setCity}
            virtualized
            emptyMessage="No cities match"
          >
            <ComboboxTrigger aria-label="District" placeholder="Pick a district…" clearable />
            <ComboboxContent>
              <ComboboxInput placeholder="Search 2 000 districts…" />
              <ComboboxList>
                <ComboboxOptions estimateSize={36} maxHeight={280}>
                  {(item) => (
                    <ComboboxItem key={item.value} value={item.value}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxOptions>
                <ComboboxEmpty />
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </Section>

      <Section
        title="Grouped results"
        description="Region headers between items. Stays correct during search — the header resets at index 0 of every render pass."
      >
        <div style={{ maxInlineSize: "22rem" }}>
          <Combobox
            items={COUNTRIES}
            value={region}
            onValueChange={setRegion}
            emptyMessage="No countries match"
          >
            <ComboboxTrigger aria-label="Country by region" placeholder="Pick a country…" clearable />
            <ComboboxContent>
              <ComboboxInput placeholder="Search countries…" />
              <ComboboxList>
                <ComboboxOptions>
                  {renderCountryWithGroupHeader}
                </ComboboxOptions>
                <ComboboxEmpty />
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </Section>

      <Section
        title="Combobox states"
        description="Same appearance + invalid + loading props as Select. Disabled applies to the whole widget."
      >
        <Row>
          <div style={{ inlineSize: "18rem" }}>
            <Combobox items={FRAMEWORKS} invalid>
              <ComboboxTrigger aria-label="Required framework" placeholder="Required" />
              <ComboboxContent>
                <ComboboxInput />
                <ComboboxList>
                  <ComboboxOptions>
                    {(item) => (
                      <ComboboxItem key={item.value} value={item.value}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxOptions>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div style={{ inlineSize: "18rem" }}>
            <Combobox items={FRAMEWORKS} disabled>
              <ComboboxTrigger aria-label="Disabled framework" placeholder="Disabled" />
              <ComboboxContent>
                <ComboboxInput />
                <ComboboxList>
                  <ComboboxOptions>
                    {(item) => (
                      <ComboboxItem key={item.value} value={item.value}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxOptions>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div style={{ inlineSize: "18rem" }}>
            <Combobox items={[]} loading>
              <ComboboxTrigger aria-label="Loading frameworks" placeholder="Fetching…" />
              <ComboboxContent>
                <ComboboxInput />
                <ComboboxList>
                  <ComboboxLoading>Loading frameworks…</ComboboxLoading>
                  <ComboboxOptions>
                    {(item) => (
                      <ComboboxItem key={item.value} value={item.value}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxOptions>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </Row>
      </Section>

      {/* ═══════════════════════ USAGE ═══════════════════════ */}

      <Section title="Usage — Select">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";

<Select value={plan} onValueChange={setPlan}>
  <SelectTrigger
    size="md"
    appearance="outline"   // soft | outline | ghost | filled
    clearable              // clear action; update value in onClear
    invalid                // form error state
    loading                // spinner replaces chevron
    onClear={() => setPlan("")}
  >
    <SelectValue placeholder="Choose a plan…" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="free">Free</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
  </SelectContent>
</Select>`} />
      </Section>

      <Section title="Usage — Combobox">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxOptions,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxLoading,
} from "@virtari-packages/react-select";

<Combobox
  items={users}                  // ComboboxItemData[]: { value, label, ... }
  value={value}
  onValueChange={setValue}
  multiple                       // chips in trigger, Backspace removes last
  virtualized                    // @tanstack/react-virtual for 500+ items
  loading={isFetching}
  onSearchChange={setQuery}      // async mode — consumer owns filtering
  emptyMessage="No matches"
>
  <ComboboxTrigger aria-label="Choose an option" placeholder="Assign…" clearable />
  <ComboboxContent>
    <ComboboxInput placeholder="Search…" />
    <ComboboxList>
      <ComboboxLoading>Loading…</ComboboxLoading>
      <ComboboxOptions>
        {(item) => (
          <ComboboxItem key={item.value} value={item.value}>
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxOptions>
      <ComboboxEmpty />
    </ComboboxList>
  </ComboboxContent>
</Combobox>`} />
      </Section>
    </>
  );
}

```
