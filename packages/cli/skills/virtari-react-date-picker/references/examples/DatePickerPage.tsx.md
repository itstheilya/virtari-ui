# Original documentation page

Source ID: `apps/docs/src/pages/DatePickerPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  DatePicker,
  DateRangePicker,
  DateField,
  TimeField,
  Calendar,
  RangeCalendar,
  DatePickerPresets,
  DateRangePickerPresets,
  I18nProvider,
  CalendarDate,
  Time,
  today,
  getLocalTimeZone,
  isWeekend,
  type DateValue,
  type DateRange,
} from "@virtari-packages/react-date-picker";
import { Section, Row } from "../components";

const tz = getLocalTimeZone();
const todayDate = today(tz);

/* ──────────────────────────────────────────────────────────── *
 * Preset builders
 * ──────────────────────────────────────────────────────────── */

const singlePresets = [
  { id: "today", label: "Today", value: todayDate },
  { id: "tomorrow", label: "Tomorrow", value: todayDate.add({ days: 1 }) },
  { id: "next-week", label: "Next week", value: todayDate.add({ weeks: 1 }) },
  { id: "next-month", label: "Next month", value: todayDate.add({ months: 1 }) },
];

const rangePresets = [
  {
    id: "today",
    label: "Today",
    value: { start: todayDate, end: todayDate },
  },
  {
    id: "7d",
    label: "Last 7 days",
    value: { start: todayDate.subtract({ days: 6 }), end: todayDate },
  },
  {
    id: "30d",
    label: "Last 30 days",
    value: { start: todayDate.subtract({ days: 29 }), end: todayDate },
  },
  {
    id: "mtd",
    label: "Month to date",
    value: { start: todayDate.set({ day: 1 }), end: todayDate },
  },
  {
    id: "ytd",
    label: "Year to date",
    value: {
      start: new CalendarDate(todayDate.year, 1, 1),
      end: todayDate,
    },
  },
];

export function DatePickerPage() {
  /* Stateful demos */
  const [date, setDate] = useState<DateValue | null>(null);
  const [range, setRange] = useState<DateRange | null>(null);
  const [withPreset, setWithPreset] = useState<DateValue | null>(null);
  const [rangeWithPresets, setRangeWithPresets] = useState<DateRange | null>(null);
  const [deadline, setDeadline] = useState<DateValue | null>(null);
  const [meetingTime, setMeetingTime] = useState<Time | null>(new Time(9, 30));
  const [preciseTime, setPreciseTime] = useState<Time | null>(new Time(14, 8, 32, 240));
  const [dob, setDob] = useState<DateValue | null>(null);
  const [faDate, setFaDate] = useState<DateValue | null>(null);
  const [calDate, setCalDate] = useState<DateValue | null>(todayDate);
  const [calRange, setCalRange] = useState<DateRange | null>(null);
  const [scheduledWindow, setScheduledWindow] = useState<DateRange | null>(null);

  return (
    <>
      {/* ══════ Basic ══════ */}
      <Section
        title="DatePicker — basic"
        description="Segmented keyboard-friendly input + popover calendar. Arrow keys increment a segment; Enter/Space opens the calendar; arrow keys + Home/End/PageUp/PageDown navigate the grid."
      >
        <div style={{ maxInlineSize: "16rem" }}>
          <DatePicker
            value={date}
            onChange={setDate}
            aria-label="Deadline"
          />
        </div>
      </Section>

      {/* ══════ Appearance ══════ */}
      <Section
        title="Appearance"
        description="soft (default), outline, ghost, filled — shared vocabulary with Input / Select."
      >
        <Row>
          {(["soft", "outline", "ghost", "filled"] as const).map((a) => (
            <div key={a} style={{ inlineSize: "14rem" }}>
              <DatePicker appearance={a} aria-label={`${a} appearance`} />
            </div>
          ))}
        </Row>
      </Section>

      {/* ══════ Sizes ══════ */}
      <Section
        title="Sizes"
        description="Shared ramp with Button / Input / Select. The overlay scales with the control and collapses multi-month layouts when the viewport is too narrow."
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
              <DatePicker size={s} aria-label={`${s} size`} />
            </Row>
          ))}
        </div>
      </Section>

      {/* ══════ States ══════ */}
      <Section
        title="States"
        description="invalid, disabled, read-only, min/max, isDateUnavailable."
      >
        <Row>
          <div style={{ inlineSize: "16rem" }}>
            <DatePicker invalid aria-label="Invalid" errorMessage="Pick a later date" />
          </div>
          <div style={{ inlineSize: "16rem" }}>
            <DatePicker isDisabled aria-label="Disabled" />
          </div>
          <div style={{ inlineSize: "16rem" }}>
            <DatePicker
              isReadOnly
              value={todayDate}
              aria-label="Read-only"
            />
          </div>
          <div style={{ inlineSize: "16rem" }}>
            <DatePicker
              minValue={todayDate}
              maxValue={todayDate.add({ months: 3 })}
              aria-label="Next 3 months"
            />
          </div>
          <div style={{ inlineSize: "16rem" }}>
            <DatePicker
              isDateUnavailable={(d) => isWeekend(d, "en-US")}
              aria-label="Weekdays only"
            />
          </div>
        </Row>
      </Section>

      {/* ══════ With time ══════ */}
      <Section
        title="Date + time (granularity)"
        description="Flip `granularity` to minute/second and the picker gains a time row. 24-hour cycle default; set hourCycle={12} for AM/PM."
      >
        <Row>
          <div style={{ inlineSize: "18rem" }}>
            <DatePicker
              granularity="minute"
              value={deadline}
              onChange={setDeadline}
              aria-label="Deadline (24h)"
            />
          </div>
          <div style={{ inlineSize: "18rem" }}>
            <DatePicker
              granularity="minute"
              hourCycle={12}
              aria-label="Deadline (12h)"
            />
          </div>
        </Row>
      </Section>

      {/* ══════ Range ══════ */}
      <Section
        title="DateRangePicker"
        description="Two linked segmented inputs. Click a day in the calendar to start a range, click again to end it; the preview fills between as you hover."
      >
        <div style={{ maxInlineSize: "24rem" }}>
          <DateRangePicker
            value={range}
            onChange={setRange}
            aria-label="Trip dates"
          />
        </div>
      </Section>

      {/* ══════ Range with presets ══════ */}
      <Section
        title="DateRangePicker with presets"
        description="A sidebar of shortcuts beside the calendar. Click to jump; the selection is still editable afterward."
      >
        <div style={{ maxInlineSize: "28rem" }}>
          <DateRangePicker
            value={rangeWithPresets}
            onChange={setRangeWithPresets}
            aria-label="Report range"
            presets={({ value, setValue }) => (
              <DateRangePickerPresets
                presets={rangePresets}
                value={value}
                onSelect={setValue}
              />
            )}
          />
        </div>
      </Section>

      <Section
        title="Desktop Dialog Preview"
        description="On desktop, date pickers use popover or dialog surfaces. Drawer stays mobile-only."
      >
        <Row>
          <div style={{ maxInlineSize: "16rem" }}>
            <DatePicker
              overlayMode="dialog"
              aria-label="Dialog preview"
            />
          </div>
          <div style={{ maxInlineSize: "14rem" }}>
            <TimeField
              label="Time dialog"
              overlayMode="dialog"
              defaultValue={new Time(10, 15)}
            />
          </div>
        </Row>
      </Section>

      <Section
        title="DateRangePicker + time"
        description="Range selection with explicit Apply/Cancel and start/end time editing. On mobile this can open as a full-height drawer or dialog."
      >
        <div style={{ maxInlineSize: "28rem" }}>
          <DateRangePicker
            value={scheduledWindow}
            onChange={setScheduledWindow}
            granularity="second"
            hourCycle={12}
            aria-label="Scheduled window"
            showMilliseconds
            millisecondStep={50}
            overlayMode="dialog"
          />
        </div>
      </Section>

      {/* ══════ Single with presets ══════ */}
      <Section
        title="DatePicker with presets"
        description="Same pattern for single dates — quick jumps to common choices."
      >
        <div style={{ maxInlineSize: "26rem" }}>
          <DatePicker
            value={withPreset}
            onChange={setWithPreset}
            aria-label="Schedule"
            presets={({ value, setValue }) => (
              <DatePickerPresets
                presets={singlePresets}
                value={value}
                onSelect={setValue}
              />
            )}
          />
        </div>
      </Section>

      {/* ══════ Persian / RTL ══════ */}
      <Section
        title="Persian (Jalali) + RTL"
        description="Wrap in <I18nProvider locale='fa-IR'> and set calendar='persian'. Direction flips automatically, month names are Persian."
      >
        <I18nProvider locale="fa-IR">
          <div style={{ maxInlineSize: "18rem" }}>
            <DatePicker
              calendar="persian"
              value={faDate}
              onChange={setFaDate}
              aria-label="تاریخ تولد"
            />
          </div>
        </I18nProvider>
      </Section>

      {/* ══════ Islamic (Umm al-Qura) ══════ */}
      <Section
        title="Islamic — Umm al-Qura"
        description="The calendar system used in Saudi Arabia. Swap to 'islamic-civil' for the tabular Hijri calendar."
      >
        <I18nProvider locale="ar-SA">
          <div style={{ maxInlineSize: "18rem" }}>
            <DatePicker
              calendar="islamic-umalqura"
              aria-label="Hijri date"
            />
          </div>
        </I18nProvider>
      </Section>

      {/* ══════ DateField (no popover) ══════ */}
      <Section
        title="DateField — segmented input only"
        description="Form-friendly: no popover, no extra overlay. Plug it into a <form> as a drop-in date input."
      >
        <Row>
          <div style={{ inlineSize: "14rem" }}>
            <DateField
              label="Date of birth"
              value={dob}
              onChange={setDob}
            />
          </div>
          <div style={{ inlineSize: "14rem" }}>
            <DateField
              label="Filled"
              appearance="filled"
              defaultValue={todayDate}
            />
          </div>
          <div style={{ inlineSize: "14rem" }}>
            <DateField
              label="Ghost"
              appearance="ghost"
              defaultValue={todayDate}
            />
          </div>
        </Row>
      </Section>

      {/* ══════ TimeField ══════ */}
      <Section
        title="TimeField"
        description="12h / 24h cycle, optional seconds granularity. Arrow keys + number typing just work."
      >
        <Row>
          <div style={{ inlineSize: "12rem" }}>
            <TimeField
              label="Meeting (24h)"
              value={meetingTime}
              onChange={(v) => setMeetingTime(v as Time | null)}
            />
          </div>
          <div style={{ inlineSize: "14rem" }}>
            <TimeField
              label="Meeting (12h)"
              hourCycle={12}
              defaultValue={new Time(9, 30)}
            />
          </div>
          <div style={{ inlineSize: "14rem" }}>
            <TimeField
              label="With seconds"
              granularity="second"
              defaultValue={new Time(14, 0, 30)}
            />
          </div>
          <div style={{ inlineSize: "14rem" }}>
            <TimeField
              label="With ms"
              granularity="second"
              showMilliseconds
              millisecondStep={20}
              value={preciseTime}
              onChange={(v) => setPreciseTime(v as Time | null)}
            />
          </div>
        </Row>
      </Section>

      {/* ══════ Standalone Calendar ══════ */}
      <Section
        title="Standalone Calendar"
        description="Render the calendar outside a popover — e.g. as the body of a scheduling page."
      >
        <Row>
          <Calendar
            value={calDate}
            onChange={setCalDate}
            aria-label="Embedded calendar"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--vds-space-2)",
              alignSelf: "center",
            }}
          >
            <span className="docs-hint">Selected</span>
            <VirtariInlineCode>{calDate ? calDate.toString() : "—"}</VirtariInlineCode>
          </div>
        </Row>
      </Section>

      {/* ══════ Standalone RangeCalendar ══════ */}
      <Section
        title="Standalone RangeCalendar"
        description="Same, for ranges."
      >
        <Row>
          <RangeCalendar
            value={calRange}
            onChange={setCalRange}
            aria-label="Embedded range"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--vds-space-2)",
              alignSelf: "center",
            }}
          >
            <span className="docs-hint">Range</span>
            <VirtariInlineCode>
              {calRange
                ? `${calRange.start.toString()} → ${calRange.end.toString()}`
                : "—"}
            </VirtariInlineCode>
          </div>
        </Row>
      </Section>

      {/* ══════ Usage ══════ */}
      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  DatePicker,
  DateRangePicker,
  DateField,
  TimeField,
  Calendar,
  RangeCalendar,
  I18nProvider,
  today,
  getLocalTimeZone,
} from "@virtari-packages/react-date-picker";

// Wrap your app once so locale and direction propagate.
<I18nProvider locale="fa-IR">
  <DatePicker
    value={value}
    onChange={setValue}
    size="md"                  // 2xs | xs | sm | md | lg | xl | 2xl
    appearance="soft"          // soft | outline | ghost | filled
    invalid={hasError}
    calendar="persian"         // gregory | persian | islamic-umalqura | ...
    granularity="minute"       // day | hour | minute | second
    hourCycle={12}             // 12 | 24
    minValue={today(getLocalTimeZone())}
    isDateUnavailable={(d) => isWeekend(d, "en-US")}
  />
</I18nProvider>`} />
      </Section>
    </>
  );
}

```
