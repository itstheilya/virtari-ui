import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import { PhoneInput, type PhoneInputValue } from "@virtari-packages/react-phone-input";
import { Section, Row, Stack } from "../components";

const SIZES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

export function PhoneInputPage() {
  const [ctrl, setCtrl] = useState<PhoneInputValue | null>(null);

  return (
    <>
      <Section
        title="Overview"
        description="A complete tel input: country picker, dial-code prefix, format-as-you-type, Persian/Arabic digit normalization, full ARIA and autofill hints. Composed on top of <Input> + <Combobox>."
      >
        <div style={{ maxInlineSize: "24rem" }}>
          <PhoneInput placeholder="Phone number" />
        </div>
      </Section>

      <Section
        title="Uncontrolled and normalized"
        description="The default is United States (+1). Persian and Arabic numerals are still converted to ASCII before US formatting; try ۲۰۲۵۵۵۰۱۲۳."
      >
        <div style={{ maxInlineSize: "24rem" }}>
          <PhoneInput placeholder="For example, 202 555 0123" />
        </div>
      </Section>

      <Section
        title="Controlled"
        description="Listen to onChange to get parsed { country, national, e164, isValid } on every keystroke. E.164 stays null until the number is complete and valid."
      >
        <Stack>
          <div style={{ maxInlineSize: "24rem" }}>
            <PhoneInput
              onChange={setCtrl}
              preferredCountries={["us", "gb", "ir", "de", "fr"]}
            />
          </div>
          <VirtariCodeBlock renderer="static" language="json" code={JSON.stringify(ctrl, null, 2)} />
        </Stack>
      </Section>

      <Section
        title="Size ramp"
        description="Shares the same height ramp as Input and Button. Country chip widens on larger sizes so the flag + dial code stay readable."
      >
        <Stack>
          {SIZES.map((s) => (
            <Row key={s}>
              <span className="docs-size-label">{s}</span>
              <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
                <PhoneInput size={s} />
              </div>
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="States">
        <Stack>
          <div style={{ maxInlineSize: "22rem" }}>
            <PhoneInput placeholder="Normal" />
          </div>
          <div style={{ maxInlineSize: "22rem" }}>
            <PhoneInput invalid placeholder="Invalid" />
          </div>
          <div style={{ maxInlineSize: "22rem" }}>
            <PhoneInput disabled placeholder="Disabled" />
          </div>
        </Stack>
      </Section>

      <Section
        title="Preferred countries"
        description="Pin a short-list to the top of the popover. Everything else stays below, alphabetical."
      >
        <div style={{ maxInlineSize: "24rem" }}>
          <PhoneInput
            preferredCountries={["us", "gb", "ir", "de", "fr", "ae", "sa"]}
          />
        </div>
      </Section>

      <Section
        title="Restricted countries"
        description="Use allowedCountries to limit the picker. US remains the fallback when available; when it is excluded, the first valid allowed country is selected."
      >
        <div style={{ maxInlineSize: "24rem" }}>
          <PhoneInput allowedCountries={["gb", "de", "fr"]} />
        </div>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { PhoneInput } from "@virtari-packages/react-phone-input";

<PhoneInput
  preferredCountries={["us", "gb", "ir"]}
  allowedCountries={["us", "gb", "ir"]} // optional restriction; US is the default
  onChange={({ country, national, e164, isValid }) => { … }}
  onValidityChange={(ok) => setValid(ok)}
  name="phone"               // emits a hidden <input autoComplete="tel" value={e164}>
  size="md"                  // 2xs | xs | sm | md | lg | xl | 2xl
  invalid={hasError}
  locale="fa"                // country-name language in the popover
/>`} />
      </Section>
    </>
  );
}
