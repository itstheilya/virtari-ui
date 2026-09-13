import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CountryCode } from "@virtari-packages/react-flag";
import { countries, countriesByCode, type CountryEntry } from "./generated/countries";
import { normalizeDigits } from "./digits";
import { getLibPhone, loadLibPhone } from "./lazy-libphonenumber";

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

const DEFAULT_COUNTRY = "us" as CountryCode;

function normalizeAllowedCountries(
  allowedCountries: readonly CountryCode[] | undefined,
): readonly CountryCode[] | undefined {
  if (allowedCountries === undefined) return undefined;

  const unique = Array.from(new Set(allowedCountries)).filter(
    (code) => code in countriesByCode,
  );
  return unique.length > 0 ? unique : [DEFAULT_COUNTRY];
}

function resolveFallbackCountry(
  defaultCountry: CountryCode | undefined,
  allowedCountries: readonly CountryCode[] | undefined,
): CountryCode {
  if (defaultCountry && (!allowedCountries || allowedCountries.includes(defaultCountry))) {
    return defaultCountry;
  }
  if (!allowedCountries || allowedCountries.includes(DEFAULT_COUNTRY)) return DEFAULT_COUNTRY;
  return allowedCountries[0] ?? DEFAULT_COUNTRY;
}

function isAllowedCountry(
  country: CountryCode,
  allowedCountries: readonly CountryCode[] | undefined,
): boolean {
  return !allowedCountries || allowedCountries.includes(country);
}

function stripDialPrefix(input: string, dialCode: string): string {
  const digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith(dialCode)) return digits.slice(dialCode.length);
  if (digits.startsWith("+" + dialCode.replace(/^\+/, ""))) {
    return digits.slice(dialCode.length);
  }
  return digits.replace(/^\+/, "");
}

export function usePhoneInput({
  value,
  defaultValue,
  defaultCountry,
  allowedCountries,
  onChange,
  onValidityChange,
  normalize = true,
}: UsePhoneInputProps) {
  const isControlled = value !== undefined;
  const allowed = useMemo(
    () => normalizeAllowedCountries(allowedCountries),
    [allowedCountries],
  );
  const fallbackCountry = useMemo(
    () => resolveFallbackCountry(defaultCountry, allowed),
    [allowed, defaultCountry],
  );

  const [internalCountry, setInternalCountry] = useState<CountryCode>(
    () => resolveFallbackCountry(defaultCountry, normalizeAllowedCountries(allowedCountries)),
  );
  const [internalRaw, setInternalRaw] = useState<string>(defaultValue ?? "");
  // Re-render bump after lazy lib loads so AsYouType formatting kicks in.
  const [libReady, setLibReady] = useState<boolean>(!!getLibPhone());

  useEffect(() => {
    if (libReady) return;
    let mounted = true;
    loadLibPhone().then(() => {
      if (mounted) setLibReady(true);
    });
    return () => {
      mounted = false;
    };
  }, [libReady]);

  useEffect(() => {
    setInternalCountry((current) =>
      isAllowedCountry(current, allowed) ? current : fallbackCountry,
    );
  }, [allowed, fallbackCountry]);

  const currentRaw = isControlled ? (value ?? "") : internalRaw;

  // When a value arrives as E.164, infer country from it so the
  // picker stays in sync without the consumer threading two props.
  const inferredCountry: CountryCode = useMemo(() => {

    const lib = getLibPhone();
    if (!lib) return internalCountry;
    try {
      const parsed = lib.parsePhoneNumberFromString(normalize ? normalizeDigits(currentRaw) : currentRaw);
      if (parsed?.country) {
        const parsedCountry = parsed.country.toLowerCase() as CountryCode;
        if (isAllowedCountry(parsedCountry, allowed)) return parsedCountry;
      }
    } catch {
      /* ignore */
    }
    return isAllowedCountry(internalCountry, allowed) ? internalCountry : fallbackCountry;
  }, [allowed, currentRaw, fallbackCountry, internalCountry, normalize, libReady]);

  const country: CountryCode = inferredCountry;
  const countryEntry: CountryEntry =
    countriesByCode[country] ?? (countriesByCode.us as CountryEntry);

  const formatted: PhoneInputValue = useMemo(() => {
    const lib = getLibPhone();
    const normalized = normalize ? normalizeDigits(currentRaw) : currentRaw;
    if (!lib) {
      return {
        country,
        national: normalized,
        e164: null,
        isValid: false,
      };
    }
    try {
      const ayt = new lib.AsYouType(country.toUpperCase() as never);
      const national = ayt.input(normalized);
      const number = ayt.getNumber();
      const isValid = number?.isValid() ?? false;
      return {
        country,
        national,
        e164: isValid ? (number!.number as string) : null,
        isValid,
      };
    } catch {
      return { country, national: normalized, e164: null, isValid: false };
    }
  }, [currentRaw, country, normalize, libReady]);

  const prevValidity = useRef<boolean>(formatted.isValid);
  useEffect(() => {
    if (prevValidity.current !== formatted.isValid) {
      prevValidity.current = formatted.isValid;
      onValidityChange?.(formatted.isValid);
    }
  }, [formatted.isValid, onValidityChange]);

  const setNationalFromUser = useCallback(
    (raw: string) => {
      const normalized = normalize ? normalizeDigits(raw) : raw;
      if (!isControlled) setInternalRaw(normalized);
      const lib = getLibPhone();
      const next: PhoneInputValue = (() => {
        if (!lib) return { country, national: normalized, e164: null, isValid: false };
        const ayt = new lib.AsYouType(country.toUpperCase() as never);
        const national = ayt.input(normalized);
        const number = ayt.getNumber();
        const isValid = number?.isValid() ?? false;
        return {
          country: (number?.country?.toLowerCase() as CountryCode | undefined) ?? country,
          national,
          e164: isValid ? (number!.number as string) : null,
          isValid,
        };
      })();
      onChange?.(next);
    },
    [country, isControlled, normalize, onChange],
  );

  const setCountry = useCallback(
    (nextCountry: CountryCode) => {
      if (!isAllowedCountry(nextCountry, allowed)) return;
      setInternalCountry(nextCountry);
      const stripped = stripDialPrefix(currentRaw, countryEntry.dialCode);
      if (!isControlled) setInternalRaw(stripped);
      const lib = getLibPhone();
      if (lib) {
        const ayt = new lib.AsYouType(nextCountry.toUpperCase() as never);
        const national = ayt.input(normalize ? normalizeDigits(stripped) : stripped);
        const number = ayt.getNumber();
        const isValid = number?.isValid() ?? false;
        onChange?.({
          country: nextCountry,
          national,
          e164: isValid ? (number!.number as string) : null,
          isValid,
        });
      } else {
        onChange?.({
          country: nextCountry,
          national: stripped,
          e164: null,
          isValid: false,
        });
      }
    },
    [allowed, currentRaw, countryEntry.dialCode, isControlled, normalize, onChange],
  );

  return {
    country,
    countryEntry,
    value: formatted,
    allCountries: countries,
    reset: () => {
      const fallback = fallbackCountry;
      const raw = normalize ? normalizeDigits(defaultValue ?? "") : defaultValue ?? "";
      setInternalCountry(fallback);
      if (!isControlled) setInternalRaw(raw);
      const lib = getLibPhone();
      if (!lib) {
        onChange?.({ country: fallback, national: raw, e164: null, isValid: false });
        return;
      }
      const formatter = new lib.AsYouType(fallback.toUpperCase() as never);
      const national = formatter.input(raw);
      const number = formatter.getNumber();
      const isValid = number?.isValid() ?? false;
      onChange?.({
        country: (number?.country?.toLowerCase() as CountryCode | undefined) ?? fallback,
        national,
        e164: isValid ? number!.number as string : null,
        isValid,
      });
    },
    setCountry,
    setNational: setNationalFromUser,
  } as const;
}
