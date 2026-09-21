import { useEffect, useMemo, useState } from "react";
import {
  NEUTRAL_PALETTE_PRESETS,
  generateVirtariTheme,
  parseNeutralImport,
  recommendNeutralPalette,
  suggestAccents,
  themeToCss,
  themeToJson,
  type AccentStrategy,
  type ColorScale,
  type ThemeName,
  type VirtariColorTheme,
} from "virtari-color-engine";
import { Button } from "@virtari-packages/react-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@virtari-packages/react-accordion";
import { ColorPicker, rgbaToHexString } from "@virtari-packages/react-color-picker";
import { IconArrowLeft, IconArrowRight, IconCheck, IconDownload, IconRefresh } from "@virtari-packages/react-icons";
import { Cluster, Stack } from "@virtari-packages/react-layout";
import { Popover, PopoverContent, PopoverTrigger } from "@virtari-packages/react-popover";
import { Stepper, StepperStep } from "@virtari-packages/react-stepper";
import { InputField } from "@virtari-packages/react-input";
import { TextareaField } from "@virtari-packages/react-textarea";
import { toast } from "@virtari-packages/react-toast";
import { Section } from "../components";

const STORAGE_KEY = "virtari.color-engine.generator.v3";
const STYLE_ID = "virtari-custom-color-theme";
const DEFAULT_PRIMARY = "#6246EA";
const DEFAULT_ACCENT_STRATEGY: AccentStrategy = "analogous";

type NeutralPreset = string | "auto" | "imported";
type AccentMode = AccentStrategy | "custom" | "no-accent";

type SavedGeneratorState = {
  name: string;
  primary: string;
  accentMode: AccentMode;
  customAccent: string;
  neutralPreset: NeutralPreset;
  importedNeutrals?: Partial<Record<ThemeName, ColorScale>>;
};

const PRIMARY_PRESETS = [
  { name: "Violet", value: "#6246EA" }, { name: "Indigo", value: "#4F46E5" },
  { name: "Blue", value: "#2563EB" }, { name: "Sky", value: "#0284C7" },
  { name: "Cyan", value: "#0891B2" }, { name: "Teal", value: "#0D9488" },
  { name: "Green", value: "#16A34A" }, { name: "Amber", value: "#D97706" },
  { name: "Orange", value: "#EA580C" }, { name: "Red", value: "#DC2626" },
  { name: "Rose", value: "#E11D48" }, { name: "Pink", value: "#DB2777" },
] as const;

const COLOR_FAMILIES = ["neutral", "primary", "accent"] as const;

function readSavedState(): SavedGeneratorState {
  const fallback: SavedGeneratorState = { name: "My Virtari theme", primary: DEFAULT_PRIMARY, accentMode: DEFAULT_ACCENT_STRATEGY, customAccent: "#24B39B", neutralPreset: "auto" };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const saved = { ...fallback, ...(JSON.parse(raw) as Partial<SavedGeneratorState>) };
    if (saved.neutralPreset === "cool") saved.neutralPreset = "slate";
    if (saved.neutralPreset === "warm") saved.neutralPreset = "stone";
    if (saved.neutralPreset === "pure") saved.neutralPreset = "natural-gray";
    const validNeutral = saved.neutralPreset === "auto" || saved.neutralPreset === "imported" || NEUTRAL_PALETTE_PRESETS.some(preset => preset.id === saved.neutralPreset);
    return { ...saved, neutralPreset: validNeutral ? saved.neutralPreset : "auto" };
  } catch { return fallback; }
}

function isHex(value: string) { return /^#[\da-f]{6}$/i.test(value.trim()); }
function scaleAt(scale: ColorScale, step: number) { return (scale as Record<string, string>)[String(step)]; }

function setThemeVariables(element: HTMLElement, theme: VirtariColorTheme, mode: ThemeName) {
  const palette = theme.themes[mode];
  for (const family of COLOR_FAMILIES) for (let step = 1; step <= 12; step += 1) element.style.setProperty(`--vds-color-${family}-${step}`, scaleAt(palette[family], step));
  element.style.setProperty("--vds-color-primary-contrast", palette.foreground.primary.color);
  element.style.setProperty("--vds-color-accent-contrast", palette.foreground.accent.color);
  element.style.setProperty("--vds-color-on-primary", palette.foreground.primary.color);
  element.style.setProperty("--vds-color-on-accent", palette.foreground.accent.color);
}

function clearThemeVariables(element: HTMLElement) {
  for (const family of COLOR_FAMILIES) for (let step = 1; step <= 12; step += 1) element.style.removeProperty(`--vds-color-${family}-${step}`);
  ["--vds-color-primary-contrast", "--vds-color-accent-contrast", "--vds-color-on-primary", "--vds-color-on-accent"].forEach(property => element.style.removeProperty(property));
}

function downloadFile(filename: string, contents: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}

function PaletteStrip({ scale, label }: { scale: ColorScale; label: string }) {
  return <div className="docs-color-engine-palette" aria-label={`${label} color scale`}>{Array.from({ length: 12 }, (_, index) => { const step = index + 1; const color = scaleAt(scale, step); return <span key={step} title={`${label} ${step}: ${color}`} style={{ backgroundColor: color }} />; })}</div>;
}

function ColorTrigger({ color, label }: { color: string; label: string }) {
  return <span className="docs-color-engine-color-trigger"><span className="docs-color-engine-color-chip" style={{ backgroundColor: color }} /><span>{label}</span><code>{color.toUpperCase()}</code></span>;
}

export function ColorGeneratorPage() {
  const [saved] = useState(readSavedState);
  const [step, setStep] = useState(0);
  const [name, setName] = useState(saved.name);
  const [primary, setPrimary] = useState(saved.primary);
  const [accentMode, setAccentMode] = useState<AccentMode>(saved.accentMode);
  const [customAccent, setCustomAccent] = useState(saved.customAccent);
  const [neutralPreset, setNeutralPreset] = useState<NeutralPreset>(saved.neutralPreset);
  const [importedNeutrals, setImportedNeutrals] = useState(saved.importedNeutrals);
  const [neutralJson, setNeutralJson] = useState("");
  const [importError, setImportError] = useState("");

  const safePrimary = isHex(primary) ? primary : DEFAULT_PRIMARY;
  const suggestions = useMemo(() => suggestAccents(safePrimary), [safePrimary]);
  const selectedSuggestion = suggestions.find(item => item.strategy === accentMode);
  const safeAccent = accentMode === "custom" ? (isHex(customAccent) ? customAccent : suggestions[0].color) : (selectedSuggestion?.color ?? suggestions[0].color);
  const autoNeutral = useMemo(() => recommendNeutralPalette(safePrimary, accentMode === "no-accent" ? undefined : safeAccent), [safePrimary, safeAccent, accentMode]);
  const selectedNeutral = NEUTRAL_PALETTE_PRESETS.find(preset => preset.id === neutralPreset);
  const neutralOptions = neutralPreset === "imported" ? { neutralScales: importedNeutrals } : { neutral: neutralPreset === "auto" ? autoNeutral : (selectedNeutral ?? autoNeutral) };
  const theme = useMemo(() => generateVirtariTheme({ name, primary: safePrimary, accent: safeAccent, neutralAccent: accentMode === "no-accent", ...neutralOptions }), [name, safePrimary, safeAccent, accentMode, neutralPreset, importedNeutrals, autoNeutral]);

  useEffect(() => {
    const state: SavedGeneratorState = { name, primary: safePrimary, accentMode, customAccent, neutralPreset, importedNeutrals };
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) { style = document.createElement("style"); style.id = STYLE_ID; document.head.append(style); }
    style.textContent = themeToCss(theme);
    const targets = [document.documentElement, document.querySelector<HTMLElement>(".docs-app")].filter(Boolean) as HTMLElement[];
    const apply = (target: HTMLElement) => { target.setAttribute("data-brand", "custom"); setThemeVariables(target, theme, target.dataset.theme === "dark" ? "dark" : "light"); };
    targets.forEach(apply);
    const observers = targets.map(target => { const observer = new MutationObserver(() => apply(target)); observer.observe(target, { attributes: true, attributeFilter: ["data-theme"] }); return observer; });
    return () => { observers.forEach(observer => observer.disconnect()); targets.forEach(clearThemeVariables); };
  }, [theme, name, safePrimary, accentMode, customAccent, neutralPreset, importedNeutrals]);

  function importNeutralScale() {
    try { setImportedNeutrals(parseNeutralImport(neutralJson)); setNeutralPreset("imported"); setImportError(""); toast.success("Gray shades imported"); }
    catch (error) { setImportError(error instanceof Error ? error.message : "This JSON cannot be imported."); }
  }

  function resetTheme() {
    setStep(0); setName("My Virtari theme"); setPrimary(DEFAULT_PRIMARY); setAccentMode(DEFAULT_ACCENT_STRATEGY); setCustomAccent("#24B39B"); setNeutralPreset("auto"); setImportedNeutrals(undefined); setNeutralJson(""); setImportError("");
    try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
    document.getElementById(STYLE_ID)?.remove();
    [document.documentElement, document.querySelector<HTMLElement>(".docs-app")].filter(Boolean).forEach(element => { const target = element as HTMLElement; clearThemeVariables(target); target.removeAttribute("data-brand"); });
    toast.success("Color choices reset");
  }

  const primaryForeground = theme.themes.light.foreground.primary;
  const accentForeground = theme.themes.light.foreground.accent;

  return <Stack gap="xl" className="docs-color-engine">
    <Section title="Build your color system" description="Pick a primary, choose an accent relationship, select a neutral palette, then export production-ready Virtari tokens.">
      <div className="docs-color-engine-toolbar">
        <Stepper activeStep={step} size="sm" variant="soft" tone="primary" aria-label="Color generator progress" className="docs-color-engine-stepper"><StepperStep label="Primary" /><StepperStep label="Accent" /><StepperStep label="Neutral" /><StepperStep label="Export" /></Stepper>
      </div>
    </Section>

    <section className="docs-color-engine-stage" aria-live="polite">
      {step === 0 && <>
        <header className="docs-color-engine-stage-head"><span>1 / 4</span><div><h2>Choose a primary color</h2><p>Start from a tested preset or open the full picker for your exact brand color.</p></div></header>
        <div className="docs-color-engine-primary-grid">{PRIMARY_PRESETS.map(preset => { const selected = safePrimary.toLowerCase() === preset.value.toLowerCase(); return <Button key={preset.value} type="button" color="contrast" variant="soft" className="docs-color-engine-primary-option" aria-pressed={selected} onClick={() => setPrimary(preset.value)}><span className="docs-color-engine-primary-swatch" style={{ backgroundColor: preset.value }} /><span className="docs-color-engine-primary-meta"><strong>{preset.name}</strong><code>{preset.value}</code></span>{selected && <span className="docs-color-engine-check"><IconCheck size={15} aria-hidden /></span>}</Button>; })}</div>
        <div className="docs-color-engine-custom-row"><div><strong>Custom primary</strong><span>Use HEX, HSL or the visual controls.</span></div><Popover><PopoverTrigger asChild><Button type="button" color="contrast" variant="outline"><ColorTrigger color={safePrimary} label="Edit color" /></Button></PopoverTrigger><PopoverContent size="lg" align="end" className="docs-color-engine-picker-popover"><ColorPicker mode="solid" value={safePrimary} allowAlpha={false} appearance="flat" swatches={PRIMARY_PRESETS.map(item => item.value)} onValueChange={(_, detail) => setPrimary(rgbaToHexString(detail.activeColor, false))} /></PopoverContent></Popover></div>
        <div className="docs-color-engine-selection-preview"><div><strong>Generated primary scale</strong><span>12 semantic steps from surface to text</span></div><PaletteStrip label="Primary" scale={theme.themes.light.primary} /><span className="docs-color-engine-ratio">On solid: {primaryForeground.color} · {primaryForeground.ratio}:1 · {primaryForeground.aaa ? "AAA" : "AA"}</span></div>
      </>}

      {step === 1 && <>
        <header className="docs-color-engine-stage-head"><span>2 / 4</span><div><h2>Choose an accent color</h2><p>Virtari has one generated accent role. Choose the relationship that best fits the primary.</p></div></header>
        <div className="docs-color-engine-theories">{suggestions.map(suggestion => { const selected = accentMode === suggestion.strategy; return <Button key={suggestion.strategy} type="button" color="contrast" variant="soft" className="docs-color-engine-theory" aria-pressed={selected} onClick={() => setAccentMode(suggestion.strategy)}><span className="docs-color-engine-theory-pair" aria-hidden><i style={{ backgroundColor: safePrimary }} /><i style={{ backgroundColor: suggestion.color }} /></span><span><strong>{suggestion.label}</strong><small>{suggestion.strategy === "complementary" ? "Opposite hue · strongest contrast" : suggestion.strategy === "analogous" ? "Neighboring hue · calm pairing" : suggestion.strategy === "triadic" ? "Equal thirds · balanced energy" : "Two near-opposites · flexible contrast"}</small></span>{selected && <span className="docs-color-engine-check"><IconCheck size={15} aria-hidden /></span>}</Button>; })}<Button type="button" color="contrast" variant="soft" className="docs-color-engine-theory" aria-pressed={accentMode === "no-accent"} onClick={() => setAccentMode("no-accent")}><span className="docs-color-engine-theory-pair docs-color-engine-theory-pair-neutral" aria-hidden><i style={{ backgroundColor: safePrimary }} /><i /></span><span><strong>No Accent</strong><small>Use the generated neutral scale for accent roles</small></span>{accentMode === "no-accent" && <span className="docs-color-engine-check"><IconCheck size={15} aria-hidden /></span>}</Button></div>
        <div className="docs-color-engine-custom-row"><div><strong>Custom accent</strong><span>Replace the suggestion with an existing brand color.</span></div><Popover><PopoverTrigger asChild><Button type="button" color="contrast" variant="outline" aria-pressed={accentMode === "custom"} onClick={() => setAccentMode("custom")}><ColorTrigger color={safeAccent} label="Choose custom" /></Button></PopoverTrigger><PopoverContent size="lg" align="end" className="docs-color-engine-picker-popover"><ColorPicker mode="solid" value={customAccent} allowAlpha={false} appearance="flat" swatches={PRIMARY_PRESETS.map(item => item.value)} onValueChange={(_, detail) => setCustomAccent(rgbaToHexString(detail.activeColor, false))} /></PopoverContent></Popover></div>
        <div className="docs-color-engine-selection-preview"><div><strong>{accentMode === "no-accent" ? "Neutral accent roles" : "Generated accent scale"}</strong><span>{accentMode === "no-accent" ? "Accent tokens inherit the selected neutral scale" : "Mapped to Virtari accent tokens"}</span></div><PaletteStrip label="Accent" scale={theme.themes.light.accent} /><span className="docs-color-engine-ratio">On solid: {accentForeground.color} · {accentForeground.ratio}:1 · {accentForeground.aaa ? "AAA" : "AA"}</span></div>
      </>}

      {step === 2 && <>
        <header className="docs-color-engine-stage-head"><span>3 / 4</span><div><h2>Select a neutral palette</h2><p>Let Auto Gray match the active brand colors, choose a crafted palette, or import one from Gray Shade Maker.</p></div></header>
        <div className="docs-color-engine-neutral-options"><Button type="button" color="contrast" variant="soft" className="docs-color-engine-neutral-option" aria-pressed={neutralPreset === "auto"} onClick={() => setNeutralPreset("auto")}><span className="docs-color-engine-neutral-meta"><strong>Auto Gray</strong><small>{autoNeutral.description}</small></span><PaletteStrip label="Auto Gray" scale={generateVirtariTheme({ primary: safePrimary, accent: safeAccent, neutralAccent: accentMode === "no-accent", neutral: autoNeutral }).themes.light.neutral} />{neutralPreset === "auto" && <span className="docs-color-engine-check"><IconCheck size={15} aria-hidden /></span>}</Button>{NEUTRAL_PALETTE_PRESETS.map(preset => { const preview = generateVirtariTheme({ primary: safePrimary, accent: safeAccent, neutral: preset }).themes.light.neutral; const selected = neutralPreset === preset.id; return <Button key={preset.id} type="button" color="contrast" variant="soft" className="docs-color-engine-neutral-option" aria-pressed={selected} onClick={() => setNeutralPreset(preset.id)}><span className="docs-color-engine-neutral-meta"><strong>{preset.label}</strong><small>{preset.description}</small></span><PaletteStrip label={preset.label} scale={preview} />{selected && <span className="docs-color-engine-check"><IconCheck size={15} aria-hidden /></span>}</Button>; })}{importedNeutrals && <Button type="button" color="contrast" variant="soft" className="docs-color-engine-neutral-option" aria-pressed={neutralPreset === "imported"} onClick={() => setNeutralPreset("imported")}><span className="docs-color-engine-neutral-meta"><strong>Imported</strong><small>Your Gray Shade Maker palette</small></span><PaletteStrip label="Imported" scale={importedNeutrals.light ?? theme.themes.light.neutral} />{neutralPreset === "imported" && <span className="docs-color-engine-check"><IconCheck size={15} aria-hidden /></span>}</Button>}</div>
        <Accordion type="single" collapsible variant="filled" size="sm" color="neutral" iconType="plus-minus" headingLevel="h3" className="docs-color-engine-import"><AccordionItem value="gray-import"><AccordionTrigger>Import Gray Shade JSON</AccordionTrigger><AccordionContent><Stack gap="md"><TextareaField label="Palette JSON" description="Paste a Gray Shade Maker export with steps 1–12." error={importError || undefined} value={neutralJson} onChange={event => setNeutralJson(event.target.value)} rows={5} spellCheck={false} /><Cluster justify="end"><Button type="button" size="sm" color="contrast" variant="outline" disabled={!neutralJson.trim()} onClick={importNeutralScale}>Import palette</Button></Cluster></Stack></AccordionContent></AccordionItem></Accordion>
      </>}

      {step === 3 && <>
        <header className="docs-color-engine-stage-head"><span>4 / 4</span><div><h2>Export the token set</h2><p>Review the three roles, name the theme and download the format your project needs.</p></div></header>
        <InputField label="Theme name" value={name} onChange={event => setName(event.target.value)} />
        <div className="docs-color-engine-summary"><div><span>Primary</span><PaletteStrip label="Primary" scale={theme.themes.light.primary} /><code>{safePrimary}</code></div><div><span>Accent</span><PaletteStrip label="Accent" scale={theme.themes.light.accent} /><code>{accentMode === "no-accent" ? "Neutral" : safeAccent}</code></div><div><span>Neutral</span><PaletteStrip label="Neutral" scale={theme.themes.light.neutral} /><code>{neutralPreset}</code></div></div>
        <div className="docs-color-engine-downloads"><Button type="button" leftSection={<IconDownload size={17} aria-hidden />} onClick={() => downloadFile("virtari-theme.json", themeToJson(theme), "application/json")}>Download JSON</Button><Button type="button" color="contrast" variant="outline" leftSection={<IconDownload size={17} aria-hidden />} onClick={() => downloadFile("virtari-theme.css", themeToCss(theme), "text/css")}>Download CSS</Button></div>
        <p className="docs-color-engine-note">The CSS overrides Virtari color tokens for light, dark and dark OLED themes. Load it after the base token stylesheet.</p>
      </>}

      <footer className="docs-color-engine-navigation"><Button type="button" color="contrast" variant="outline" disabled={step === 0} leftSection={<IconArrowLeft size={17} aria-hidden />} onClick={() => setStep(value => Math.max(0, value - 1))}>Back</Button><Button type="button" size="sm" color="contrast" variant="ghost" className="docs-color-engine-reset" leftSection={<IconRefresh size={16} aria-hidden />} onClick={resetTheme}>Reset choices</Button>{step < 3 ? <Button type="button" rightSection={<IconArrowRight size={17} aria-hidden />} onClick={() => setStep(value => Math.min(3, value + 1))}>Continue</Button> : <span aria-hidden />}</footer>
    </section>
  </Stack>;
}
