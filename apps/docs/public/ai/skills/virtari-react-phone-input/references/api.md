# @virtari-packages/react-phone-input API snapshot

Version: 1.0.1. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/PhoneInput.css",
  "./tokens": "./dist/PhoneInput.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `PhoneInput` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `PhoneInputProps` (type) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `PhoneInputValue` (type) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `PhoneInputSize` (type) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `PhoneInputCountrySelect` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `PhoneInputCountrySelectProps` (type) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `usePhoneInput` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `UsePhoneInputProps` (type) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `normalizeDigits` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `toE164` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `isValidPhone` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `countries` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `countriesByCode` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `dialCodeToCountries` (export) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.
- `CountryEntry` (type) from `@virtari-packages/react-phone-input`; source: `packages/react-phone-input/src/index.ts`.

## Source type declarations

Source: `packages/react-phone-input/src/digits.ts`

```tsx
export function normalizeDigits(input: string): string;
```

Source: `packages/react-phone-input/src/generated/countries.ts`

```tsx
export interface CountryEntry {
  code: CountryCode;
  alpha3: string;
  dialCode: string;
  names: { en: string; fa: string; ar: string; native: string };
  priority: number;
  region: string;
}
```

Source: `packages/react-phone-input/src/lazy-libphonenumber.ts`

```tsx
export function getLibPhone(): typeof LibPhone | null;
```

Source: `packages/react-phone-input/src/lazy-libphonenumber.ts`

```tsx
export function loadLibPhone(): Promise<typeof LibPhone>;
```

Source: `packages/react-phone-input/src/PhoneInput.tsx`

```tsx
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
```

Source: `packages/react-phone-input/src/PhoneInputCountrySelect.tsx`

```tsx
export type PhoneInputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-phone-input/src/PhoneInputCountrySelect.tsx`

```tsx
export interface PhoneInputCountrySelectProps {
  /** Selected country (ISO 3166-1 alpha-2). */
  country: CountryCode;
  /** Fires when the user picks a new country. */
  onCountryChange: (code: CountryCode) => void;
  /** Size preset — mirrors Input ramp. */
  size?: PhoneInputSize;
  /** Countries pinned to the top of the search list. */
  preferredCountries?: CountryCode[];
  /** Countries available in the picker. An empty list falls back to US. */
  allowedCountries?: CountryCode[];
  /** Language used for country names in the list. Defaults to document.lang or `"en"`. */
  locale?: "en" | "fa" | "ar";
  /** Whole picker disabled (mirrors Input disabled). */
  disabled?: boolean;
  /** `aria-invalid` forwarded to the trigger. */
  invalid?: boolean;
  /** Placeholder for the search box inside the popover. */
  searchPlaceholder?: string;
  /** Optional override for the trigger button (advanced usage). */
  renderTrigger?: (entry: CountryEntry, open: boolean) => ReactNode;
  /** Label used for announce-only region + aria-label on the trigger. */
  label?: string;
  id?: string;
  className?: string;
}
```

Source: `packages/react-phone-input/src/PhoneInputCountrySelect.tsx`

```tsx
export function PhoneInputCountrySelect({
  country,
  onCountryChange,
  size = "md",
  preferredCountries,
  allowedCountries,
  locale,
  disabled,
  invalid,
  searchPlaceholder,
  renderTrigger,
  label,
  id,
  className,
}: PhoneInputCountrySelectProps);
```

Source: `packages/react-phone-input/src/use-phone-input.ts`

```tsx
export interface PhoneInputValue {
  /** ISO 3166-1 alpha-2 of the currently-selected country. */
  country: CountryCode;
  /** National number, formatted-as-you-type for display. */
  national: string;
  /** Canonical E.164 string. `null` until the current input parses as valid. */
  e164: string | null;
  /** True when the current value is a valid, complete phone number. */
  isValid: boolean;
}
```

Source: `packages/react-phone-input/src/use-phone-input.ts`

```tsx
export interface UsePhoneInputProps {
  value?: string;
  defaultValue?: string;
  defaultCountry?: CountryCode;
  allowedCountries?: readonly CountryCode[];
  onChange?: (next: PhoneInputValue) => void;
  onValidityChange?: (isValid: boolean) => void;
  /** Auto-convert ۰۱۲۳… / ٠١٢٣… to ASCII before parsing. Default `true`. */
  normalize?: boolean;
}
```

Source: `packages/react-phone-input/src/use-phone-input.ts`

```tsx
export function usePhoneInput({
  value,
  defaultValue,
  defaultCountry,
  allowedCountries,
  onChange,
  onValidityChange,
  normalize = true,
}: UsePhoneInputProps);
```

Source: `packages/react-phone-input/src/utils.ts`

```tsx
export async function toE164(
  value: string,
  country: CountryCode,
): Promise<string | null>;
```

Source: `packages/react-phone-input/src/utils.ts`

```tsx
export async function isValidPhone(
  value: string,
  country?: CountryCode,
): Promise<boolean>;
```

## Source files

- `packages/react-phone-input/src/digits.ts`
- `packages/react-phone-input/src/generated/countries.ts`
- `packages/react-phone-input/src/index.ts`
- `packages/react-phone-input/src/lazy-libphonenumber.ts`
- `packages/react-phone-input/src/PhoneInput.css`
- `packages/react-phone-input/src/PhoneInput.tokens.css`
- `packages/react-phone-input/src/PhoneInput.tsx`
- `packages/react-phone-input/src/PhoneInputCountrySelect.tsx`
- `packages/react-phone-input/src/use-phone-input.ts`
- `packages/react-phone-input/src/utils.ts`
- `packages/react-phone-input/package.json`
