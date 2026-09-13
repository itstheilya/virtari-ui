import { cn } from "@virtari-packages/utils";
import { Flag, type CountryCode } from "@virtari-packages/react-flag";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxOptions,
  useComboboxContext,
} from "@virtari-packages/react-select";
import * as PopoverPrimitive from "@virtari-packages/primitives/popover";
import {
  useCallback,
  useId,
  useMemo,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { countries, countriesByCode, type CountryEntry } from "./generated/countries";

export type PhoneInputSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

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

function resolveLocale(preferred?: "en" | "fa" | "ar"): "en" | "fa" | "ar" {
  if (preferred) return preferred;
  if (typeof document !== "undefined") {
    const lang = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    if (lang.startsWith("fa")) return "fa";
    if (lang.startsWith("ar")) return "ar";
  }
  return "en";
}

function orderedCountries(
  preferred: readonly CountryCode[] | undefined,
  allowed: readonly CountryCode[] | undefined,
): CountryEntry[] {
  const available = allowed === undefined
    ? countries.slice()
    : Array.from(new Set(allowed))
        .map((code) => countriesByCode[code])
        .filter((entry): entry is CountryEntry => Boolean(entry));
  const usable = available.length > 0
    ? available
    : [countriesByCode.us as CountryEntry];
  if (!preferred || preferred.length === 0) return usable;

  const pref: CountryEntry[] = [];
  const rest: CountryEntry[] = [];
  const preferredSet = new Set(preferred);
  for (const code of preferred) {
    const entry = countriesByCode[code];
    if (entry && usable.includes(entry)) pref.push(entry);
  }
  for (const entry of usable) {
    if (!preferredSet.has(entry.code as CountryCode)) rest.push(entry);
  }
  return [...pref, ...rest];
}

/**
 * Standalone country+dial picker. Usable on its own, and also driven internally
 * by `<PhoneInput>` via the same control-plane.
 */
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
}: PhoneInputCountrySelectProps) {
  const resolvedLocale = resolveLocale(locale);
  const items = useMemo(
    () =>
      orderedCountries(preferredCountries, allowedCountries).map((entry) => ({
        value: entry.code,
        label: entry.names[resolvedLocale],
        keywords: [entry.names.en, entry.names.native, entry.dialCode, entry.code],
      })),
    [allowedCountries, preferredCountries, resolvedLocale],
  );

  const handleChange = useCallback(
    (next: string | string[]) => {
      const v = Array.isArray(next) ? next[0] : next;
      if (v) onCountryChange(v as CountryCode);
    },
    [onCountryChange],
  );

  const countryFilter = useCallback(
    (item: { value: string; label: string; keywords?: string[] }, query: string) => {
      if (!query) return true;
      const q = query.trim().toLowerCase().replace(/^\+/, "");
      if (!q) return true;
      if (item.label.toLowerCase().includes(q)) return true;
      if (item.value.toLowerCase().includes(q)) return true;
      return (item.keywords ?? []).some((kw) =>
        String(kw).toLowerCase().replace(/^\+/, "").includes(q),
      );
    },
    [],
  );

  const triggerId = useId();

  return (
    <Combobox
      items={items}
      value={country}
      onValueChange={handleChange}
      size={size === "2xs" || size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
      searchable
      disabled={disabled}
      invalid={invalid}
      filter={countryFilter}
    >
      <CountryTrigger
        id={id ?? triggerId}
        country={country}
        size={size}
        disabled={disabled}
        invalid={invalid}
        label={label}
        renderTrigger={renderTrigger}
        className={className}
      />
      <ComboboxContent align="start" sideOffset={6} data-size={size}>
        <ComboboxInput placeholder={searchPlaceholder ?? placeholderFor(resolvedLocale)} />
        <ComboboxList>
          <ComboboxOptions estimateSize={36}>
            {(item) => {
              const entry = countriesByCode[item.value];
              if (!entry) return null;
              return (
                <ComboboxItem key={item.value} value={item.value}>
                  <span className="vds-phone-input-option">
                    <Flag code={entry.code as CountryCode} size="sm" className="vds-phone-input-flag" />
                    <span className="vds-phone-input-option-name">{entry.names[resolvedLocale]}</span>
                    <span className="vds-phone-input-option-dial">
                      <bdi dir="ltr">{entry.dialCode}</bdi>
                    </span>
                  </span>
                </ComboboxItem>
              );
            }}
          </ComboboxOptions>
          <ComboboxEmpty>{emptyMessageFor(resolvedLocale)}</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function placeholderFor(locale: "en" | "fa" | "ar"): string {
  if (locale === "fa") return "جست‌وجوی کشور…";
  if (locale === "ar") return "ابحث عن دولة…";
  return "Search country…";
}
function emptyMessageFor(locale: "en" | "fa" | "ar"): string {
  if (locale === "fa") return "هیچ کشوری یافت نشد";
  if (locale === "ar") return "لم يتم العثور على دولة";
  return "No matching country";
}

/**
 * The trigger button. Consumes the combobox context so clicks toggle the
 * popover and keyboard nav works correctly.
 */
function CountryTrigger({
  id,
  country,
  size,
  disabled,
  invalid,
  label,
  renderTrigger,
  className,
}: {
  id: string;
  country: CountryCode;
  size: PhoneInputSize;
  disabled?: boolean;
  invalid?: boolean;
  label?: string;
  renderTrigger?: (entry: CountryEntry, open: boolean) => ReactNode;
  className?: string;
}) {
  const { open, setOpen, listId, inputRef, triggerRef } = useComboboxContext();
  const entry = countriesByCode[country];

  const setRef = useCallback(
    (el: HTMLButtonElement | null) => {
      triggerRef.current = el as unknown as HTMLElement | null;
    },
    [triggerRef],
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.stopPropagation();
    const next = !open;
    setOpen(next);
    if (next) requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const ariaLabel = label
    ? `${label}: ${entry?.names.en ?? country}, ${entry?.dialCode ?? ""}`
    : `Country selector, currently ${entry?.names.en ?? country}, dial code ${entry?.dialCode ?? ""}`;

  return (
    <PopoverPrimitive.Anchor asChild>
      <button
        ref={setRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        className={cn("vds-phone-input-country", className)}
        data-size={size}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {renderTrigger && entry
          ? renderTrigger(entry, open)
          : (
            <>
              <Flag
                code={country}
                size={size === "2xs" || size === "xs" ? "xs" : "sm"}
                className="vds-phone-input-flag"
              />
              <span className="vds-phone-input-dial">
                <bdi dir="ltr">{entry?.dialCode}</bdi>
              </span>
              <svg
                className="vds-phone-input-caret"
                viewBox="0 0 12 12"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M3 4.5 6 7.5 9 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
      </button>
    </PopoverPrimitive.Anchor>
  );
}
