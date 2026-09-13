import { forwardRef } from "react";
import { cn } from "@virtari-packages/utils";
import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { useDateRangePicker, useDateField } from "@react-aria/datepicker";
import {
  useDateRangePickerState,
  useDateFieldState,
  type DateRange,
  type TimeValue,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import * as PopoverPrimitive from "@virtari-packages/primitives/popover";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerSize, DatePickerAppearance } from "./context";
import { RangeCalendar, type CalendarView, type CalendarHandle } from "./Calendar";
import { FieldSegment, StaticFieldSegments } from "./DateField";
import { TimeField, TimePickerEditor, nowAsTime } from "./TimeField";
import { toButtonProps } from "./aria-button";
import {
  MobilePickerSurface,
  type MobilePickerPresentation,
  type MobilePickerSizeMode,
  type PickerOverlayMode,
  PickerActionBar,
  useIsMobileViewport,
  useResponsiveCalendarMonthCount,
} from "./picker-overlay";

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

export interface DateRangePickerPresetRenderProps {
  value: DateRange | null;
  setValue: (value: DateRange | null) => void;
}

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(function DateRangePicker({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  label,
  description,
  errorMessage,
  presets,
  footer,
  className,
  overlayMode = "auto",
  mobilePresentation = "drawer",
  mobileSizeMode = "full",
  defaultTimeValue,
  ...props
}, ref) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const isMobile = useIsMobileViewport();
  const preferredOverlayMode = overlayMode === "auto"
    ? (isMobile ? mobilePresentation : "popover")
    : overlayMode;
  const resolvedOverlayMode = !isMobile && preferredOverlayMode === "drawer"
    ? "dialog"
    : preferredOverlayMode;
  const usePopoverSurface = resolvedOverlayMode === "popover";
  const useSheetSurface = resolvedOverlayMode === "drawer" || resolvedOverlayMode === "dialog";
  const visibleMonthCount = useResponsiveCalendarMonthCount(size, isMobile);
  // Desktop dialogs should size to content rather than going full-screen; the
  // `mobileSizeMode="full"` default is intended for mobile drawers.
  const effectiveSizeMode =
    !isMobile && resolvedOverlayMode === "dialog" ? "content" : mobileSizeMode;

  const state = useDateRangePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false,
  });
  const [draftRange, setDraftRange] = useState<DateRange | null>(toCompleteRange(state.value));
  const [mobileView, setMobileView] = useState<"date" | "start-time" | "end-time">("date");
  const [calendarView, setCalendarView] = useState<CalendarView>("days");
  const calendarApiRef = useRef<CalendarHandle | null>(null);

  useEffect(() => {
    if (!state.isOpen) {
      setDraftRange(toCompleteRange(state.value));
      setMobileView("date");
      setCalendarView("days");
    }
  }, [state.isOpen, state.value]);

  useEffect(() => {
    if (state.isOpen) {
      setDraftRange(toCompleteRange(state.value));
      setMobileView("date");
      setCalendarView("days");
    }
  }, [state.isOpen]);

  const groupRef = useRef<HTMLDivElement>(null);
  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    descriptionProps,
    errorMessageProps,
  } = useDateRangePicker(
    { ...props, label, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef,
  );
  const triggerButtonProps = toButtonProps(buttonProps);

  const startFieldState = useDateFieldState({
    ...startFieldProps,
    locale: usedLocale,
    createCalendar,
  });
  const startFieldRef = useRef<HTMLDivElement>(null);
  const startInputRef = useRef<HTMLInputElement>(null);
  const { fieldProps: innerStartFieldProps, inputProps: startInputProps } = useDateField(
    startFieldProps,
    startFieldState,
    startFieldRef,
  );

  const endFieldState = useDateFieldState({
    ...endFieldProps,
    locale: usedLocale,
    createCalendar,
  });
  const endFieldRef = useRef<HTMLDivElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const { fieldProps: innerEndFieldProps, inputProps: endInputProps } = useDateField(
    endFieldProps,
    endFieldState,
    endFieldRef,
  );

  const draftState = useDateRangePickerState({
    ...props,
    value: draftRange,
    onChange: setDraftRange,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false,
  });

  const isInvalid = invalid ?? state.isInvalid;
  const isSplitLayout = state.hasTime && (size === "lg" || size === "xl" || size === "2xl");
  const triggerUsesReadonlyField = useSheetSurface;
  const timeGranularity: "hour" | "minute" | "second" =
    props.granularity === "day" ? "hour" : props.granularity ?? "hour";

  // Seed both start and end time on open so picking a range alone produces
  // complete DateTimes (prevents the "apply twice" symptom on the range picker).
  useEffect(() => {
    if (!state.isOpen || !state.hasTime) return;
    const seed = defaultTimeValue ?? nowAsTime(timeGranularity);
    if (draftState.timeRange?.start == null) {
      draftState.setTime("start", seed);
    }
    if (draftState.timeRange?.end == null) {
      draftState.setTime("end", seed);
    }
  }, [state.isOpen, state.hasTime, draftState, defaultTimeValue, timeGranularity]);

  const fallbackTime = () =>
    (defaultTimeValue ?? nowAsTime(timeGranularity));
  const draftStartTime = (draftState.timeRange?.start ?? fallbackTime()).copy() as TimeValue;
  const draftEndTime = (draftState.timeRange?.end ?? fallbackTime()).copy() as TimeValue;
  const renderedPresets = typeof presets === "function"
    ? presets({
        value: draftRange,
        setValue: setDraftRange,
      })
    : presets;
  const applyDisabled = state.hasTime
    ? !(draftState.value?.start && draftState.value?.end)
    : !(draftState.dateRange?.start && draftState.dateRange?.end);
  const commitAndClose = () => {
    state.setValue(toCompleteRange(draftState.value));
    state.setOpen(false);
  };
  const resetAndClose = () => {
    setDraftRange(toCompleteRange(state.value));
    state.setOpen(false);
  };
  const buttonSize = size === "2xs" || size === "xs" ? "sm" : "md";
  const actionBarByCalendarView = (): ReactNode => {
    if (calendarView === "months") {
      return (
        <PickerActionBar
          className="vds-date-range-picker-actions"
          buttonSize={buttonSize}
          cancelLabel="Cancel"
          applyLabel="Change Month"
          onCancel={() => calendarApiRef.current?.cancelDraft()}
          onApply={() => calendarApiRef.current?.applyMonthDraft()}
        />
      );
    }
    if (calendarView === "years") {
      return (
        <PickerActionBar
          className="vds-date-range-picker-actions"
          buttonSize={buttonSize}
          cancelLabel="Cancel"
          applyLabel="Change Year"
          onCancel={() => calendarApiRef.current?.cancelDraft()}
          onApply={() => calendarApiRef.current?.applyYearDraft()}
        />
      );
    }
    return (
      <PickerActionBar
        className="vds-date-range-picker-actions"
        buttonSize={buttonSize}
        applyDisabled={applyDisabled}
        onCancel={resetAndClose}
        onApply={commitAndClose}
      />
    );
  };
  const actionBarDateView = actionBarByCalendarView();
  const hasRangeSelected = Boolean(
    draftState.dateRange?.start && draftState.dateRange?.end,
  );
  const actionBarTimeView = (
    <PickerActionBar
      className="vds-date-range-picker-actions"
      buttonSize={buttonSize}
      cancelLabel="Cancel"
      applyLabel="Set Time"
      onCancel={resetAndClose}
      onApply={() => {
        if (hasRangeSelected) {
          commitAndClose();
        } else {
          setMobileView("date");
        }
      }}
    />
  );

  const rangeCalendar = (
    <RangeCalendar
      value={toCompleteRange(draftState.dateRange)}
      onChange={draftState.setDateRange}
      minValue={props.minValue ?? null}
      maxValue={props.maxValue ?? null}
      isDateUnavailable={props.isDateUnavailable}
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
      allowsNonContiguousRanges={props.allowsNonContiguousRanges}
      autoFocus={!isMobile}
      aria-label={props["aria-label"] ?? "Date range calendar"}
      visibleDuration={{ months: visibleMonthCount }}
      pageBehavior="single"
      size={size}
      appearance={appearance}
      invalid={isInvalid}
      locale={usedLocale}
      apiRef={calendarApiRef}
      onViewChange={setCalendarView}
      hideInternalActions
    />
  );

  const overlayBody = (
    <div className="vds-date-range-picker-overlay">
      <div className="vds-date-range-picker-content-inner">
        {renderedPresets ? (
          <div className="vds-date-range-picker-presets">{renderedPresets}</div>
        ) : null}
        <div
          className="vds-date-range-picker-main"
          data-layout={isSplitLayout ? "split" : "stack"}
          data-has-time={state.hasTime ? "true" : undefined}
        >
          {rangeCalendar}
          {state.hasTime ? (
            <div className="vds-date-range-picker-time" data-embedded="true">
              <TimeField
                value={draftState.timeRange?.start ?? null}
                onChange={(value) => {
                  if (value) {
                    draftState.setTime("start", value);
                  }
                }}
                granularity={timeGranularity}
                hourCycle={props.hourCycle}
                hideTimeZone={props.hideTimeZone}
                showPicker={props.showTimePicker ?? true}
                overlayMode="popover"
                showMilliseconds={props.showMilliseconds}
                millisecondStep={props.millisecondStep}
                defaultTimeValue={defaultTimeValue}
                size={size}
                appearance={appearance}
                label="Start time"
                aria-label="Start time"
              />
              <TimeField
                value={draftState.timeRange?.end ?? null}
                onChange={(value) => {
                  if (value) {
                    draftState.setTime("end", value);
                  }
                }}
                granularity={timeGranularity}
                hourCycle={props.hourCycle}
                hideTimeZone={props.hideTimeZone}
                showPicker={props.showTimePicker ?? true}
                overlayMode="popover"
                showMilliseconds={props.showMilliseconds}
                millisecondStep={props.millisecondStep}
                defaultTimeValue={defaultTimeValue}
                size={size}
                appearance={appearance}
                label="End time"
                aria-label="End time"
              />
            </div>
          ) : null}
          {footer ? (
            <div className="vds-date-range-picker-footer">{footer}</div>
          ) : null}
        </div>
      </div>
      {actionBarDateView}
    </div>
  );

  const pickerGroup = (
    <div
      {...groupProps}
      ref={groupRef}
      className="vds-date-range-picker-group"
      data-surface-trigger={triggerUsesReadonlyField ? "true" : undefined}
      onClick={() => {
        if (triggerUsesReadonlyField && !props.isDisabled && !props.isReadOnly) {
          state.setOpen(true);
        }
      }}
    >
      {triggerUsesReadonlyField ? (
        <StaticFieldSegments segments={startFieldState.segments} className="vds-date-range-picker-field" />
      ) : (
        <div
          {...innerStartFieldProps}
          ref={startFieldRef}
          className="vds-date-range-picker-field"
        >
          {startFieldState.segments.map((segment, index) => (
            <FieldSegment key={index} segment={segment} state={startFieldState} />
          ))}
        </div>
      )}

      <span className="vds-date-range-picker-separator" aria-hidden="true">
        -
      </span>

      {triggerUsesReadonlyField ? (
        <StaticFieldSegments segments={endFieldState.segments} className="vds-date-range-picker-field" />
      ) : (
        <div
          {...innerEndFieldProps}
          ref={endFieldRef}
          className="vds-date-range-picker-field"
        >
          {endFieldState.segments.map((segment, index) => (
            <FieldSegment key={index} segment={segment} state={endFieldState} />
          ))}
        </div>
      )}

      <button
        {...triggerButtonProps}
        type="button"
        className="vds-date-range-picker-trigger"
        aria-label={triggerButtonProps["aria-label"] ?? "Open calendar"}
      >
        <CalendarIcon />
      </button>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn("vds-date-range-picker", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={isInvalid ? "true" : undefined}
      data-disabled={props.isDisabled ? "true" : undefined}
      data-readonly={props.isReadOnly ? "true" : undefined}
      data-dir={direction}
    >
      <input {...startInputProps} ref={startInputRef} form={props.form} />
      <input {...endInputProps} ref={endInputRef} form={props.form} />
      {label ? (
        <span {...labelProps} className="vds-date-range-picker-label">
          {label}
        </span>
      ) : null}

      {usePopoverSurface ? (
        <PopoverPrimitive.Root open={state.isOpen} onOpenChange={state.setOpen}>
          <PopoverPrimitive.Anchor asChild>{pickerGroup}</PopoverPrimitive.Anchor>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              sideOffset={6}
              align="start"
              collisionPadding={8}
              sticky="always"
              className="vds-date-range-picker-content"
              data-size={size}
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              {overlayBody}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      ) : pickerGroup}

      {useSheetSurface ? (
        <MobilePickerSurface
          open={state.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              setDraftRange(toCompleteRange(state.value));
              setMobileView("date");
            }
            state.setOpen(open);
          }}
          title={
            mobileView === "start-time"
              ? "Start time"
              : mobileView === "end-time"
                ? "End time"
                : label ?? "Select range"
          }
          presentation={resolvedOverlayMode}
          sizeMode={effectiveSizeMode}
          dialogSize={
            mobileView === "date"
              ? size === "xl" || size === "2xl" ? "xl" : "lg"
              : "sm"
          }
          bodyClassName="vds-date-range-picker-mobile-body"
          footer={mobileView !== "date" ? actionBarTimeView : actionBarDateView}
        >
          {mobileView === "start-time" || mobileView === "end-time" ? (
            <div className="vds-date-range-picker-mobile-panel vds-date-range-picker-mobile-time-panel">
              <div className="vds-time-picker-panel vds-time-picker-panel--embedded">
              <TimePickerEditor
                value={mobileView === "start-time" ? draftStartTime : draftEndTime}
                onChange={(value) => draftState.setTime(mobileView === "start-time" ? "start" : "end", value)}
                hourCycle={props.hourCycle}
                granularity={timeGranularity}
                showMilliseconds={props.showMilliseconds}
                millisecondStep={props.millisecondStep ?? 10}
              />
              </div>
            </div>
          ) : (
            <div className="vds-date-range-picker-mobile-panel">
              <div className="vds-date-range-picker-content-inner">
                {renderedPresets ? (
                  <div className="vds-date-range-picker-presets">{renderedPresets}</div>
                ) : null}
                <div
                  className="vds-date-range-picker-main"
                  data-layout="stack"
                  data-has-time={state.hasTime ? "true" : undefined}
                >
                  <RangeCalendar
                    value={toCompleteRange(draftState.dateRange)}
                    onChange={draftState.setDateRange}
                    minValue={props.minValue ?? null}
                    maxValue={props.maxValue ?? null}
                    isDateUnavailable={props.isDateUnavailable}
                    isDisabled={props.isDisabled}
                    isReadOnly={props.isReadOnly}
                    allowsNonContiguousRanges={props.allowsNonContiguousRanges}
                    aria-label={props["aria-label"] ?? "Date range calendar"}
                    visibleDuration={{ months: visibleMonthCount }}
                    pageBehavior="single"
                    size={size}
                    appearance={appearance}
                    invalid={isInvalid}
                    locale={usedLocale}
                    className="vds-date-range-picker-mobile-calendar"
                    apiRef={calendarApiRef}
                    onViewChange={setCalendarView}
                    hideInternalActions
                  />
                  {state.hasTime ? (
                    <div
                      className="vds-date-range-picker-time"
                      data-embedded="true"
                      data-mobile-time-links="true"
                    >
                      <TimeField
                        value={draftState.timeRange?.start ?? draftStartTime}
                        granularity={timeGranularity}
                        hourCycle={props.hourCycle}
                        hideTimeZone={props.hideTimeZone}
                        showPicker
                        showMilliseconds={props.showMilliseconds}
                        millisecondStep={props.millisecondStep}
                        defaultTimeValue={defaultTimeValue}
                        onTriggerClick={() => setMobileView("start-time")}
                        size={size}
                        appearance={appearance}
                        label="Start time"
                        aria-label="Start time"
                      />
                      <TimeField
                        value={draftState.timeRange?.end ?? draftEndTime}
                        granularity={timeGranularity}
                        hourCycle={props.hourCycle}
                        hideTimeZone={props.hideTimeZone}
                        showPicker
                        showMilliseconds={props.showMilliseconds}
                        millisecondStep={props.millisecondStep}
                        defaultTimeValue={defaultTimeValue}
                        onTriggerClick={() => setMobileView("end-time")}
                        size={size}
                        appearance={appearance}
                        label="End time"
                        aria-label="End time"
                      />
                    </div>
                  ) : null}
                  {footer ? (
                    <div className="vds-date-range-picker-footer">{footer}</div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </MobilePickerSurface>
      ) : null}

      {description ? (
        <span {...descriptionProps} className="vds-date-range-picker-description">
          {description}
        </span>
      ) : null}
      <span
        {...errorMessageProps}
        role={isInvalid && errorMessage ? "alert" : undefined}
        aria-hidden={isInvalid && errorMessage ? undefined : true}
        data-visible={isInvalid && errorMessage ? "" : undefined}
        data-empty={isInvalid && errorMessage ? undefined : ""}
        className="vds-date-range-picker-error"
      >
        <span className="vds-date-range-picker-error-body">{errorMessage}</span>
      </span>
    </div>
  );
});

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 6.5H13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M5.5 2V5M10.5 2V5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function toCompleteRange(
  value: { start: DateValue | null; end: DateValue | null } | null | undefined,
): DateRange | null {
  if (!value?.start || !value.end) {
    return null;
  }

  return {
    start: value.start,
    end: value.end,
  };
}
