import { forwardRef } from "react";
import { cn, useComposedRefs, useFormReset } from "@virtari-packages/utils";
import { Input, type InputProps } from "@virtari-packages/react-input";
import type { CountryCode } from "@virtari-packages/react-flag";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type ChangeEvent,
  type Ref,
} from "react";
import { usePhoneInput, type PhoneInputValue } from "./use-phone-input";
import { countriesByCode } from "./generated/countries";
import {
  PhoneInputCountrySelect,
  type PhoneInputSize,
} from "./PhoneInputCountrySelect";

export type { PhoneInputValue, PhoneInputSize };

export interface PhoneInputProps
  extends Omit<
    InputProps,
    "value" | "defaultValue" | "onChange" | "type" | "size" | "inputSize"
  > {
  /** Controlled value — E.164 (`+1…`) or a national string. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** ISO 3166-1 alpha-2 fallback when `value` has no explicit country. Defaults to `"us"`. */
  defaultCountry?: CountryCode;
  /** Restricts the country picker. When US is excluded, the first valid entry becomes the fallback. */
  allowedCountries?: CountryCode[];
  /** Countries pinned to the top of the popover. */
  preferredCountries?: CountryCode[];
  /** Size preset — shares ramp with Input. Default `"md"`. */
  size?: PhoneInputSize;
  /** `true` when the value is invalid — forwards to Input. */
  invalid?: boolean;
  /** Fires on every keystroke with parsed `{ country, national, e164, isValid }`. */
  onChange?: (next: PhoneInputValue) => void;
  /** Fires when `isValid` flips. */
  onValidityChange?: (isValid: boolean) => void;
  /** Country-name language in the popover. Default: document lang → `"en"`. */
  locale?: "en" | "fa" | "ar";
  /** Auto-normalize Persian/Arabic digits to ASCII before parsing. Default `true`. */
  normalizeDigits?: boolean;
  /** When set, emits a hidden `<input name={name}>` with the E.164 value for server forms. */
  name?: string;
  /** Optional label propagated to the country-trigger `aria-label`. */
  label?: string;
  /** Placeholder for the tel input. */
  placeholder?: string;
  /** Placeholder text for the country-search input. */
  searchPlaceholder?: string;
  ref?: Ref<HTMLInputElement>;
}

/**
 * Complete phone-number input. Composes `<Input>` with a leading country
 * picker driven by a `<Combobox>`. Handles parsing, format-as-you-type,
 * Persian/Arabic digit normalization, ARIA, autofill hints, and RTL layout.
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput({
  value,
  defaultValue,
  defaultCountry,
  allowedCountries,
  preferredCountries,
  size = "md",
  invalid,
  disabled,
  readOnly,
  onChange,
  onValidityChange,
  locale,
  normalizeDigits = true,
  name,
  label,
  placeholder,
  searchPlaceholder,
  className,
  id,
  ...rest
}, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useComposedRefs(inputRef, ref);
  const reactId = useId();
  const triggerId = `${id ?? reactId}-country`;
  const errorId = `${id ?? reactId}-error`;
  const dialId = `${id ?? reactId}-dial`;
  const liveId = `${id ?? reactId}-announce`;

  const announceRef = useRef<HTMLSpanElement | null>(null);

  const {
    country,
    countryEntry,
    value: formatted,
    setCountry,
    setNational,
    reset,
  } = usePhoneInput({
    value,
    defaultValue,
    defaultCountry,
    allowedCountries,
    onChange,
    onValidityChange,
    normalize: normalizeDigits,
  });

  useFormReset(inputRef, reset, rest.form);

  // Announce country changes in a polite live region so screen readers catch them.
  useEffect(() => {
    if (!announceRef.current) return;
    announceRef.current.textContent =
      `${countryEntry.names.en} selected — dial code ${countryEntry.dialCode}`;
  }, [countryEntry]);

  const handleCountryChange = useCallback(
    (code: CountryCode) => {
      if (!disabled && !readOnly) setCountry(code);
    },
    [setCountry, disabled, readOnly],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly) setNational(e.target.value);
    },
    [setNational, disabled, readOnly],
  );

  const ariaDescribedBy = [dialId, rest["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={cn("vds-input-wrapper vds-phone-input", className)}
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
    >
      <PhoneInputCountrySelect
        id={triggerId}
        country={country}
        onCountryChange={handleCountryChange}
        size={size}
        preferredCountries={preferredCountries}
        allowedCountries={allowedCountries}
        locale={locale}
        disabled={disabled || readOnly}
        invalid={invalid}
        searchPlaceholder={searchPlaceholder}
        label={label}
      />

      {/* Hidden helper lets screen readers announce the active dial code before the digits. */}
      <span id={dialId} className="vds-phone-input-announce">
        Dial code {countryEntry.dialCode}
      </span>

      <Input
        ref={mergedRef}
        id={id ?? reactId}
        inputSize={size}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={placeholder}
        value={formatted.national}
        onChange={handleInputChange}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedBy}
        aria-errormessage={invalid ? errorId : undefined}
        {...rest}
      />

      {/* Live region for country-change announcements. */}
      <span
        ref={announceRef}
        id={liveId}
        className="vds-phone-input-announce"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Canonical E.164 for form submissions — only emitted when `name` is set. */}
      {name ? (
        <input
          type="hidden"
          name={name}
          value={formatted.e164 ?? ""}
          form={rest.form}
          disabled={disabled}
          autoComplete="tel"
          readOnly
        />
      ) : null}
    </div>
  );
});

export { PhoneInputCountrySelect };
export { countries, countriesByCode, dialCodeToCountries } from "./generated/countries";
export type { CountryEntry } from "./generated/countries";
