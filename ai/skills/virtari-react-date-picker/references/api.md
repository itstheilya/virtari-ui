# @virtari-packages/react-date-picker API snapshot

Version: 1.1.0. Export entry points (exact package.json map):

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
  "./styles": {
    "style": "./dist/DatePicker.css",
    "default": "./dist/DatePicker.css"
  },
  "./tokens": {
    "style": "./dist/DatePicker.tokens.css",
    "default": "./dist/DatePicker.tokens.css"
  },
  "./calendar/styles": {
    "style": "./dist/Calendar.css",
    "default": "./dist/Calendar.css"
  },
  "./calendar/tokens": {
    "style": "./dist/Calendar.tokens.css",
    "default": "./dist/Calendar.tokens.css"
  },
  "./date-field/styles": {
    "style": "./dist/DateField.css",
    "default": "./dist/DateField.css"
  },
  "./date-field/tokens": {
    "style": "./dist/DateField.tokens.css",
    "default": "./dist/DateField.tokens.css"
  },
  "./time-field/styles": {
    "style": "./dist/TimeField.css",
    "default": "./dist/TimeField.css"
  },
  "./time-field/tokens": {
    "style": "./dist/TimeField.tokens.css",
    "default": "./dist/TimeField.tokens.css"
  },
  "./range-picker/styles": {
    "style": "./dist/DateRangePicker.css",
    "default": "./dist/DateRangePicker.css"
  },
  "./range-picker/tokens": {
    "style": "./dist/DateRangePicker.tokens.css",
    "default": "./dist/DateRangePicker.tokens.css"
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Calendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `RangeCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `CalendarProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `RangeCalendarProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateField` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `FieldSegment` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateFieldProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `TimeField` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `TimeFieldProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DatePicker` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DatePickerProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DatePickerPresetRenderProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateRangePicker` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateRangePickerProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateRangePickerPresetRenderProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DatePickerPresets` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateRangePickerPresets` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DatePickerPreset` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateRangePickerPreset` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DatePickerPresetsProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateRangePickerPresetsProps` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DatePickerSize` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DatePickerAppearance` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `MobilePickerPresentation` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `MobilePickerSizeMode` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `PickerOverlayMode` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `createCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `resolveLocale` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `CalendarSystem` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateValue` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `CalendarDate` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `CalendarDateTime` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `Time` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `ZonedDateTime` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `today` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `now` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `getLocalTimeZone` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `parseDate` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `parseDateTime` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `parseTime` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `parseAbsolute` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `parseZonedDateTime` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `isSameDay` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `isSameMonth` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `isSameYear` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `isToday` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `isWeekend` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `startOfMonth` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `startOfWeek` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `startOfYear` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `endOfMonth` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `endOfWeek` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `endOfYear` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `toCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `toCalendarDate` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `toCalendarDateTime` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `toZoned` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `GregorianCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `PersianCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `IslamicUmalquraCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `IslamicCivilCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `BuddhistCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `JapaneseCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `HebrewCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `IndianCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `EthiopicCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `TaiwanCalendar` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `I18nProvider` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `useLocale` (export) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.
- `DateRange` (type) from `@virtari-packages/react-date-picker`; source: `packages/react-date-picker/src/index.ts`.

## Source type declarations

Source: `packages/react-date-picker/src/aria-button.ts`

```tsx
export function toButtonProps(
  props: ButtonLikeProps,
): ButtonHTMLAttributes<HTMLButtonElement>;
```

Source: `packages/react-date-picker/src/Calendar.tsx`

```tsx
export type CalendarView = "days" | "months" | "years";
```

Source: `packages/react-date-picker/src/Calendar.tsx`

```tsx
export interface CalendarHandle {
  getView: () => CalendarView;
  setView: (view: CalendarView) => void;
  hasMonthDraft: () => boolean;
  hasYearDraft: () => boolean;
  applyMonthDraft: () => void;
  applyYearDraft: () => void;
  cancelDraft: () => void;
}
```

Source: `packages/react-date-picker/src/Calendar.tsx`

```tsx
export interface CalendarProps extends CalendarVisualProps {
  value?: DateValue | null;
  defaultValue?: DateValue | null;
  onChange?: (value: DateValue) => void;
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
  isDateUnavailable?: (date: DateValue) => boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  "aria-label"?: string;
  /** Fires when the internal view changes (days/months/years). */
  onViewChange?: (view: CalendarView) => void;
  /** Parent-supplied ref populated with year/month draft-commit methods. */
  apiRef?: { current: CalendarHandle | null };
  /** If true, Calendar hides its own Cancel/Change-Year/Month footer.
   *  Parent is expected to render an external action bar and drive
   *  commits through `apiRef`. */
  hideInternalActions?: boolean;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-date-picker/src/Calendar.tsx`

```tsx
export function Calendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  footer,
  className,
  onViewChange,
  apiRef,
  hideInternalActions,
  ref,
  ...props
}: CalendarProps);
```

Source: `packages/react-date-picker/src/Calendar.tsx`

```tsx
export interface RangeCalendarProps extends CalendarVisualProps {
  value?: { start: DateValue; end: DateValue } | null;
  defaultValue?: { start: DateValue; end: DateValue } | null;
  onChange?: (value: { start: DateValue; end: DateValue }) => void;
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
  isDateUnavailable?: (date: DateValue) => boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  allowsNonContiguousRanges?: boolean;
  autoFocus?: boolean;
  "aria-label"?: string;
  onViewChange?: (view: CalendarView) => void;
  apiRef?: { current: CalendarHandle | null };
  hideInternalActions?: boolean;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-date-picker/src/Calendar.tsx`

```tsx
export function RangeCalendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  footer,
  className,
  onViewChange,
  apiRef,
  hideInternalActions,
  ref,
  ...props
}: RangeCalendarProps);
```

Source: `packages/react-date-picker/src/context.ts`

```tsx
export type DatePickerSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
```

Source: `packages/react-date-picker/src/context.ts`

```tsx
export type DatePickerAppearance = "soft" | "outline" | "ghost" | "filled";
```

Source: `packages/react-date-picker/src/context.ts`

```tsx
export interface DatePickerVisualCtx {
  size: DatePickerSize;
  appearance: DatePickerAppearance;
  invalid?: boolean;
}
```

Source: `packages/react-date-picker/src/context.ts`

```tsx
export function useVisual(fallback: DatePickerVisualCtx): DatePickerVisualCtx;
```

Source: `packages/react-date-picker/src/date-utils.ts`

```tsx
export type CalendarSystem =
  | "gregory"
  | "persian"
  | "islamic-umalqura"
  | "islamic-civil"
  | "islamic-tbla"
  | "buddhist"
  | "japanese"
  | "hebrew"
  | "indian"
  | "ethiopic"
  | "ethioaa"
  | "roc";
```

Source: `packages/react-date-picker/src/date-utils.ts`

```tsx
export function createCalendar(identifier: string): Calendar;
```

Source: `packages/react-date-picker/src/date-utils.ts`

```tsx
export function resolveLocale(locale: string, calendar?: CalendarSystem): string;
```

Source: `packages/react-date-picker/src/DateField.tsx`

```tsx
export interface DateFieldProps {
  value?: DateValue | null;
  defaultValue?: DateValue | null;
  onChange?: (value: DateValue | null) => void;
  minValue?: DateValue;
  maxValue?: DateValue;
  placeholderValue?: DateValue;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  granularity?: "day" | "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  "aria-label"?: string;
  name?: string;
  autoFocus?: boolean;
  form?: string;
  validationBehavior?: "native" | "aria";

  /* ── Visual ── */
  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  /** Shorthand for isInvalid plus error styling. */
  invalid?: boolean;
  calendar?: CalendarSystem;
  locale?: string;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-date-picker/src/DateField.tsx`

```tsx
export function FieldSegment({ segment, state }: FieldSegmentProps);
```

Source: `packages/react-date-picker/src/DateField.tsx`

```tsx
export function StaticFieldSegments({ segments, className }: StaticFieldSegmentsProps);
```

Source: `packages/react-date-picker/src/DatePicker.tsx`

```tsx
export interface DatePickerProps {
  value?: DateValue | null;
  defaultValue?: DateValue | null;
  onChange?: (value: DateValue | null) => void;
  minValue?: DateValue;
  maxValue?: DateValue;
  placeholderValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  granularity?: "day" | "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  shouldCloseOnSelect?: boolean;
  showTimePicker?: boolean;
  showMilliseconds?: boolean;
  millisecondStep?: number;
  /**
   * Seeded time when the picker opens without a value. Defaults to the user's
   * current local time (now). Pass any `TimeValue` to override.
   */
  defaultTimeValue?: TimeValue;
  autoFocus?: boolean;
  form?: string;
  validationBehavior?: "native" | "aria";
  name?: string;

  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  "aria-label"?: string;

  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  invalid?: boolean;
  calendar?: CalendarSystem;
  locale?: string;
  className?: string;
  presets?: ReactNode | ((props: DatePickerPresetRenderProps) => ReactNode);
  footer?: ReactNode;
  overlayMode?: PickerOverlayMode;
  mobilePresentation?: MobilePickerPresentation;
  mobileSizeMode?: MobilePickerSizeMode;

  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-date-picker/src/DatePicker.tsx`

```tsx
export interface DatePickerPresetRenderProps {
  value: DateValue | null;
  setValue: (value: DateValue | null) => void;
}
```

Source: `packages/react-date-picker/src/DateRangePicker.tsx`

```tsx
export interface DateRangePickerProps {
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onChange?: (value: DateRange | null) => void;
  minValue?: DateValue;
  maxValue?: DateValue;
  placeholderValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  granularity?: "day" | "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  shouldCloseOnSelect?: boolean;
  showTimePicker?: boolean;
  showMilliseconds?: boolean;
  millisecondStep?: number;
  /**
   * Seeded time (applied to both start and end) when the picker opens
   * without a value. Defaults to the user's current local time (now).
   */
  defaultTimeValue?: TimeValue;
  allowsNonContiguousRanges?: boolean;
  autoFocus?: boolean;
  form?: string;
  validationBehavior?: "native" | "aria";
  startName?: string;
  endName?: string;

  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  "aria-label"?: string;

  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  invalid?: boolean;
  calendar?: CalendarSystem;
  locale?: string;
  className?: string;
  presets?: ReactNode | ((props: DateRangePickerPresetRenderProps) => ReactNode);
  footer?: ReactNode;
  overlayMode?: PickerOverlayMode;
  mobilePresentation?: MobilePickerPresentation;
  mobileSizeMode?: MobilePickerSizeMode;

  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-date-picker/src/DateRangePicker.tsx`

```tsx
export interface DateRangePickerPresetRenderProps {
  value: DateRange | null;
  setValue: (value: DateRange | null) => void;
}
```

Source: `packages/react-date-picker/src/picker-overlay.tsx`

```tsx
export type MobilePickerPresentation = "drawer" | "dialog";
```

Source: `packages/react-date-picker/src/picker-overlay.tsx`

```tsx
export type MobilePickerSizeMode = "content" | "full";
```

Source: `packages/react-date-picker/src/picker-overlay.tsx`

```tsx
export type PickerOverlayMode = "auto" | "popover" | "drawer" | "dialog";
```

Source: `packages/react-date-picker/src/picker-overlay.tsx`

```tsx
export type PickerDialogSize = "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-date-picker/src/picker-overlay.tsx`

```tsx
export function useIsMobileViewport();
```

Source: `packages/react-date-picker/src/picker-overlay.tsx`

```tsx
export function useResponsiveCalendarMonthCount(
  size: DatePickerSize,
  forceSingleMonth = false,
): 1 | 2;
```

Source: `packages/react-date-picker/src/picker-overlay.tsx`

```tsx
export function PickerActionBar({
  onApply,
  onCancel,
  applyDisabled,
  applyLabel = "Apply",
  cancelLabel = "Cancel",
  buttonSize = "md",
  className,
}: PickerActionBarProps);
```

Source: `packages/react-date-picker/src/picker-overlay.tsx`

```tsx
export function MobilePickerSurface({
  open,
  onOpenChange,
  title,
  description,
  leadingAction,
  trailingAction,
  presentation = "drawer",
  sizeMode = "content",
  dialogSize = "sm",
  className,
  bodyClassName,
  footerClassName,
  children,
  footer,
}: MobilePickerSurfaceProps);
```

Source: `packages/react-date-picker/src/Presets.tsx`

```tsx
export interface DatePickerPreset {
  id: string;
  label: ReactNode;
  value: DateValue;
  description?: ReactNode;
}
```

Source: `packages/react-date-picker/src/Presets.tsx`

```tsx
export interface DateRangePickerPreset {
  id: string;
  label: ReactNode;
  value: DateRange;
  description?: ReactNode;
}
```

Source: `packages/react-date-picker/src/Presets.tsx`

```tsx
export interface DatePickerPresetsProps {
  presets: DatePickerPreset[];
  value?: DateValue | null;
  onSelect: (value: DateValue) => void;
  /** Group label — announced by assistive tech. */
  label?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-date-picker/src/Presets.tsx`

```tsx
export function DatePickerPresets({
  presets,
  value,
  onSelect,
  label = "Quick select",
  className,
  ref,
}: DatePickerPresetsProps);
```

Source: `packages/react-date-picker/src/Presets.tsx`

```tsx
export interface DateRangePickerPresetsProps {
  presets: DateRangePickerPreset[];
  value?: DateRange | null;
  onSelect: (value: DateRange) => void;
  label?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-date-picker/src/Presets.tsx`

```tsx
export function DateRangePickerPresets({
  presets,
  value,
  onSelect,
  label = "Quick select",
  className,
  ref,
}: DateRangePickerPresetsProps);
```

Source: `packages/react-date-picker/src/TimeField.tsx`

```tsx
export interface TimeFieldProps {
  value?: TimeValue | null;
  defaultValue?: TimeValue | null;
  onChange?: (value: TimeValue | null) => void;
  minValue?: TimeValue;
  maxValue?: TimeValue;
  placeholderValue?: TimeValue;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  granularity?: "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  "aria-label"?: string;
  name?: string;
  autoFocus?: boolean;
  form?: string;
  validationBehavior?: "native" | "aria";

  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  invalid?: boolean;
  locale?: string;
  className?: string;
  showPicker?: boolean;
  showMilliseconds?: boolean;
  millisecondStep?: number;
  /**
   * Seeded time when the picker opens with no current value.
   * Defaults to the user's current local time (see `nowAsTime()`).
   */
  defaultTimeValue?: TimeValue;
  /**
   * When provided, intercepts field/trigger clicks and replaces the
   * default "open internal picker" behavior. The internal popover + mobile
   * surface are suppressed — parent owns picker presentation.
   * Used by DatePicker mobile step 1 to route to its time step.
   */
  onTriggerClick?: () => void;
  overlayMode?: PickerOverlayMode;
  mobilePresentation?: MobilePickerPresentation;
  mobileSizeMode?: MobilePickerSizeMode;

  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-date-picker/src/TimeField.tsx`

```tsx
export interface TimePickerEditorProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  hourCycle?: 12 | 24;
  granularity: "hour" | "minute" | "second";
  showMilliseconds?: boolean;
  millisecondStep: number;
}
```

Source: `packages/react-date-picker/src/TimeField.tsx`

```tsx
export function TimePickerEditor({
  value,
  onChange,
  hourCycle,
  granularity,
  showMilliseconds,
  millisecondStep,
}: TimePickerEditorProps);
```

Source: `packages/react-date-picker/src/TimeField.tsx`

```tsx
export function formatTimeValue(
  value: TimeValue | null | undefined,
  options: {
    hourCycle?: 12 | 24;
    granularity?: "hour" | "minute" | "second";
    showMilliseconds?: boolean;
  } = {},
);
```

Source: `packages/react-date-picker/src/TimeField.tsx`

```tsx
export function nowAsTime(
  granularity: "hour" | "minute" | "second" = "minute",
): TimeValue;
```

Source: `packages/react-date-picker/src/Wheel.tsx`

```tsx
export interface ScrollWheelProps {
  label: string;
  values: number[];
  value: number;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
  variant?: "number" | "period" | "year";
  className?: string;
  showHeader?: boolean;
}
```

Source: `packages/react-date-picker/src/Wheel.tsx`

```tsx
export function ScrollWheel({
  label,
  values,
  value,
  formatValue,
  onChange,
  variant = "number",
  className,
  showHeader = true,
}: ScrollWheelProps);
```

## Source files

- `packages/react-date-picker/src/aria-button.ts`
- `packages/react-date-picker/src/Calendar.css`
- `packages/react-date-picker/src/Calendar.tokens.css`
- `packages/react-date-picker/src/Calendar.tsx`
- `packages/react-date-picker/src/context.ts`
- `packages/react-date-picker/src/date-utils.ts`
- `packages/react-date-picker/src/DateField.css`
- `packages/react-date-picker/src/DateField.tokens.css`
- `packages/react-date-picker/src/DateField.tsx`
- `packages/react-date-picker/src/DatePicker.css`
- `packages/react-date-picker/src/DatePicker.tokens.css`
- `packages/react-date-picker/src/DatePicker.tsx`
- `packages/react-date-picker/src/DateRangePicker.css`
- `packages/react-date-picker/src/DateRangePicker.tokens.css`
- `packages/react-date-picker/src/DateRangePicker.tsx`
- `packages/react-date-picker/src/index.ts`
- `packages/react-date-picker/src/picker-overlay.tsx`
- `packages/react-date-picker/src/Presets.tsx`
- `packages/react-date-picker/src/TimeField.css`
- `packages/react-date-picker/src/TimeField.tokens.css`
- `packages/react-date-picker/src/TimeField.tsx`
- `packages/react-date-picker/src/Wheel.tsx`
- `packages/react-date-picker/package.json`
