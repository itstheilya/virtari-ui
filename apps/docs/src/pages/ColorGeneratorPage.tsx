import { useEffect, useMemo, useState } from "react";
import {
  generateVirtariTheme,
  parseNeutralImport,
  suggestAccents,
  themeToCss,
  themeToJson,
  type AccentStrategy,
  type ColorScale,
  type ThemeName,
  type VirtariColorTheme,
} from "virtari-color-engine";
import { Badge } from "@virtari-packages/react-badge";
import { Button } from "@virtari-packages/react-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@virtari-packages/react-card";
import { ColorPicker, rgbaToHexString } from "@virtari-packages/react-color-picker";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconDownload,
  IconRefresh,
  IconSparkles,
} from "@virtari-packages/react-icons";
import { Cluster, Grid, Stack } from "@virtari-packages/react-layout";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@virtari-packages/react-segmented-control";
import { Stepper, StepperStep } from "@virtari-packages/react-stepper";
import { InputField } from "@virtari-packages/react-input";
import { TextareaField } from "@virtari-packages/react-textarea";
import { toast } from "@virtari-packages/react-toast";
import { Section } from "../components";

const STORAGE_KEY = "virtari.color-engine.generator.v1";
const STYLE_ID = "virtari-custom-color-theme";
const DEFAULT_PRIMARY = "#6246EA";
const DEFAULT_ACCENT_STRATEGY: AccentStrategy = "analogous";

type NeutralPreset = "balanced" | "cool" | "warm" | "pure" | "imported";
type AccentMode = AccentStrategy | "custom";

type SavedGeneratorState = {
  name: string;
  primary: string;
  accentMode: AccentMode;
  customAccent: string;
  neutralPreset: NeutralPreset;
  importedNeutrals?: Partial<Record<ThemeName, ColorScale>>;
};

const NEUTRAL_PRESETS: Record<Exclude<NeutralPreset, "imported">, { label: string; hue: number; chroma: number }> = {
  balanced: { label: "Balanced", hue: 270, chroma: 0.012 },
  cool: { label: "Cool", hue: 245, chroma: 0.016 },
  warm: { label: "Warm", hue: 70, chroma: 0.014 },
  pure: { label: "Pure", hue: 0, chroma: 0 },
};

const COLOR_FAMILIES = ["neutral", "primary", "accent"] as const;

function readSavedState(): SavedGeneratorState {
  const fallback: SavedGeneratorState = {
    name: "My Virtari theme",
    primary: DEFAULT_PRIMARY,
    accentMode: DEFAULT_ACCENT_STRATEGY,
    customAccent: "#24B39B",
    neutralPreset: "balanced",
  };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as Partial<SavedGeneratorState>;
    return { ...fallback, ...saved };
  } catch {
    return fallback;
  }
}

function isHex(value: string) {
  return /^#[\da-f]{6}$/i.test(value.trim());
}

function scaleAt(scale: ColorScale, step: number) {
  return (scale as Record<string, string>)[String(step)];
}

function setThemeVariables(element: HTMLElement, theme: VirtariColorTheme, mode: ThemeName) {
  const palette = theme.themes[mode];
  for (const family of COLOR_FAMILIES) {
    for (let step = 1; step <= 12; step += 1) {
      element.style.setProperty(`--vds-color-${family}-${step}`, scaleAt(palette[family], step));
    }
  }
  element.style.setProperty("--vds-color-primary-contrast", palette.foreground.primary.color);
  element.style.setProperty("--vds-color-accent-contrast", palette.foreground.accent.color);
  element.style.setProperty("--vds-color-on-primary", palette.foreground.primary.color);
  element.style.setProperty("--vds-color-on-accent", palette.foreground.accent.color);
}

function clearThemeVariables(element: HTMLElement) {
  for (const family of COLOR_FAMILIES) {
    for (let step = 1; step <= 12; step += 1) {
      element.style.removeProperty(`--vds-color-${family}-${step}`);
    }
  }
  element.style.removeProperty("--vds-color-primary-contrast");
  element.style.removeProperty("--vds-color-accent-contrast");
  element.style.removeProperty("--vds-color-on-primary");
  element.style.removeProperty("--vds-color-on-accent");
}

function downloadFile(filename: string, contents: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportCss(theme: VirtariColorTheme) {
  return themeToCss(theme);
}

function PaletteStrip({ scale, label }: { scale: ColorScale; label: string }) {
  return (
    <div className="docs-color-engine-palette" aria-label={`${label} color scale`}>
      {Array.from({ length: 12 }, (_, index) => {
        const step = index + 1;
        const color = scaleAt(scale, step);
        return <span key={step} title={`${label} ${step}: ${color}`} style={{ background: color }} />;
      })}
    </div>
  );
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
  const safeAccent = accentMode === "custom"
    ? (isHex(customAccent) ? customAccent : suggestions[0].color)
    : (selectedSuggestion?.color ?? suggestions[0].color);
  const neutralOptions = neutralPreset === "imported"
    ? { neutralScales: importedNeutrals }
    : { neutral: NEUTRAL_PRESETS[neutralPreset] };
  const theme = useMemo(() => generateVirtariTheme({
    name,
    primary: safePrimary,
    accent: safeAccent,
    ...neutralOptions,
  }), [name, safePrimary, safeAccent, neutralPreset, importedNeutrals]);

  useEffect(() => {
    const state: SavedGeneratorState = {
      name,
      primary: safePrimary,
      accentMode,
      customAccent,
      neutralPreset,
      importedNeutrals,
    };
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage may be unavailable */ }

    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = exportCss(theme);

    const targets = [document.documentElement, document.querySelector<HTMLElement>(".docs-app")].filter(Boolean) as HTMLElement[];
    const apply = (target: HTMLElement) => {
      target.setAttribute("data-brand", "custom");
      setThemeVariables(target, theme, target.dataset.theme === "dark" ? "dark" : "light");
    };
    targets.forEach(apply);
    const observers = targets.map(target => {
      const observer = new MutationObserver(() => apply(target));
      observer.observe(target, { attributes: true, attributeFilter: ["data-theme"] });
      return observer;
    });
    return () => {
      observers.forEach(observer => observer.disconnect());
      targets.forEach(clearThemeVariables);
    };
  }, [theme, name, safePrimary, accentMode, customAccent, neutralPreset, importedNeutrals]);

  function importNeutralScale() {
    try {
      const parsed = parseNeutralImport(neutralJson);
      setImportedNeutrals(parsed);
      setNeutralPreset("imported");
      setImportError("");
      toast.success("Gray shades imported");
    } catch (error) {
      const message = error instanceof Error ? error.message : "This JSON cannot be imported.";
      setImportError(message);
    }
  }

  function resetTheme() {
    setStep(0);
    setName("My Virtari theme");
    setPrimary(DEFAULT_PRIMARY);
    setAccentMode(DEFAULT_ACCENT_STRATEGY);
    setCustomAccent("#24B39B");
    setNeutralPreset("balanced");
    setImportedNeutrals(undefined);
    setNeutralJson("");
    setImportError("");
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* storage may be unavailable */ }
    document.getElementById(STYLE_ID)?.remove();
    [document.documentElement, document.querySelector<HTMLElement>(".docs-app")]
      .filter(Boolean)
      .forEach(element => {
        const target = element as HTMLElement;
        clearThemeVariables(target);
        target.removeAttribute("data-brand");
      });
    toast.success("Generator reset");
  }

  const primaryForeground = theme.themes.light.foreground.primary;
  const accentForeground = theme.themes.light.foreground.accent;

  return (
    <Stack gap="xl" className="docs-color-engine">
      <Section
        title="Build a complete brand palette"
        description="Choose three inputs. Virtari generates accessible light and dark tokens, applies them here instantly, and keeps your draft on this device."
      >
        <Cluster justify="between" align="center" gap="md">
          <Stepper activeStep={step} size="sm" variant="soft" tone="primary" aria-label="Color generator progress" className="docs-color-engine-stepper">
            <StepperStep label="Primary" />
            <StepperStep label="Accent" />
            <StepperStep label="Gray" />
            <StepperStep label="Export" />
          </Stepper>
          <Button type="button" size="sm" color="contrast" variant="ghost" leftSection={<IconRefresh size={16} aria-hidden />} onClick={resetTheme}>
            Reset
          </Button>
        </Cluster>
      </Section>

      <div className="docs-color-engine-workspace">
        <Card size="lg" className="docs-color-engine-builder">
          {step === 0 && <>
            <CardHeader>
              <Badge size="sm" color="primary" variant="soft">Step 1 of 4</Badge>
              <CardTitle>Pick your primary</CardTitle>
              <CardDescription>Start with the color people already associate with your brand.</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorPicker
                mode="solid"
                value={safePrimary}
                allowAlpha={false}
                appearance="flat"
                swatches={["#6246EA", "#2563EB", "#0891B2", "#059669", "#EA580C", "#E11D48"]}
                onValueChange={(_, detail) => setPrimary(rgbaToHexString(detail.activeColor, false))}
              />
            </CardContent>
          </>}

          {step === 1 && <>
            <CardHeader>
              <Badge size="sm" color="accent" variant="soft">Step 2 of 4</Badge>
              <CardTitle>Choose an accent</CardTitle>
              <CardDescription>Use a color-theory suggestion or bring a second brand color.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="lg">
                <Grid minItemWidth="9rem" gap="sm" className="docs-color-engine-suggestions">
                  {suggestions.map(suggestion => (
                    <Button
                      key={suggestion.strategy}
                      type="button"
                      color="contrast"
                      variant={accentMode === suggestion.strategy ? "outline" : "ghost"}
                      aria-pressed={accentMode === suggestion.strategy}
                      className="docs-color-engine-choice"
                      leftSection={<span className="docs-color-engine-choice-swatch" style={{ background: suggestion.color }} />}
                      onClick={() => setAccentMode(suggestion.strategy)}
                    >
                      {suggestion.label}
                    </Button>
                  ))}
                </Grid>
                <SegmentedControl value={accentMode === "custom" ? "custom" : "suggested"} onValueChange={value => setAccentMode(value === "custom" ? "custom" : DEFAULT_ACCENT_STRATEGY)} fullWidth aria-label="Accent source">
                  <SegmentedControlItem value="suggested" icon={<IconSparkles size={16} />}>Suggested</SegmentedControlItem>
                  <SegmentedControlItem value="custom">Custom color</SegmentedControlItem>
                </SegmentedControl>
                {accentMode === "custom" && (
                  <ColorPicker mode="solid" value={customAccent} allowAlpha={false} appearance="flat" onValueChange={(_, detail) => setCustomAccent(rgbaToHexString(detail.activeColor, false))} />
                )}
              </Stack>
            </CardContent>
          </>}

          {step === 2 && <>
            <CardHeader>
              <Badge size="sm" color="neutral" variant="soft">Step 3 of 4</Badge>
              <CardTitle>Set the gray character</CardTitle>
              <CardDescription>Keep it neutral, tint it toward the brand, or import a Gray Shade Maker result.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="lg">
                <SegmentedControl
                  value={neutralPreset}
                  onValueChange={value => setNeutralPreset(value as NeutralPreset)}
                  orientation="vertical"
                  fullWidth
                  aria-label="Gray shade style"
                >
                  {Object.entries(NEUTRAL_PRESETS).map(([value, preset]) => (
                    <SegmentedControlItem key={value} value={value}>{preset.label}</SegmentedControlItem>
                  ))}
                  {importedNeutrals && <SegmentedControlItem value="imported">Imported</SegmentedControlItem>}
                </SegmentedControl>
                <TextareaField
                  label="Import Gray Shade JSON"
                  description="Paste a Gray Shade Maker export with light or dark steps 1–12."
                  error={importError || undefined}
                  value={neutralJson}
                  onChange={event => setNeutralJson(event.target.value)}
                  rows={6}
                  placeholder={'{ "light": { "1": "oklch(...)" } }'}
                  spellCheck={false}
                />
                <Cluster justify="end">
                  <Button type="button" size="sm" color="contrast" variant="soft" disabled={!neutralJson.trim()} onClick={importNeutralScale}>
                    Import shades
                  </Button>
                </Cluster>
              </Stack>
            </CardContent>
          </>}

          {step === 3 && <>
            <CardHeader>
              <Badge size="sm" color="success" variant="soft" leftSection={<IconCheck size={14} aria-hidden />}>Ready</Badge>
              <CardTitle>Export your theme</CardTitle>
              <CardDescription>Both files match Virtari’s 12-step token structure and include light and dark modes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="lg">
                <InputField label="Theme name" value={name} onChange={event => setName(event.target.value)} />
                <Grid minItemWidth="12rem" gap="sm">
                  <Button type="button" leftSection={<IconDownload size={17} aria-hidden />} onClick={() => downloadFile("virtari-theme.json", themeToJson(theme), "application/json")}>
                    Download JSON
                  </Button>
                  <Button type="button" color="contrast" variant="outline" leftSection={<IconDownload size={17} aria-hidden />} onClick={() => downloadFile("virtari-theme.css", exportCss(theme), "text/css")}>
                    Download CSS
                  </Button>
                </Grid>
                <p className="docs-color-engine-note">Your draft is saved locally. Add the CSS after Virtari tokens, then set <code>data-brand=&quot;custom&quot;</code> on the themed container.</p>
              </Stack>
            </CardContent>
          </>}

          <div className="docs-color-engine-navigation">
            <Button type="button" color="contrast" variant="ghost" disabled={step === 0} leftSection={<IconArrowLeft size={17} aria-hidden />} onClick={() => setStep(value => Math.max(0, value - 1))}>
              Back
            </Button>
            {step < 3 && (
              <Button type="button" rightSection={<IconArrowRight size={17} aria-hidden />} onClick={() => setStep(value => Math.min(3, value + 1))}>
                Continue
              </Button>
            )}
          </div>
        </Card>

        <Card size="lg" variant="soft" className="docs-color-engine-preview" aria-live="polite">
          <CardHeader>
            <Cluster justify="between" align="center" gap="sm">
              <Stack gap="xs">
                <CardTitle>Live preview</CardTitle>
                <CardDescription>Applied to this documentation in real time.</CardDescription>
              </Stack>
              <Badge size="sm" color="success" dot>Live</Badge>
            </Cluster>
          </CardHeader>
          <CardContent>
            <Stack gap="lg">
              <div className="docs-color-engine-hero">
                <Badge color="accent" variant="solid">New</Badge>
                <h3>A palette that already knows its roles.</h3>
                <p>Surfaces, borders, focus, actions, and readable foregrounds update together.</p>
                <Cluster gap="sm">
                  <Button type="button">Primary action</Button>
                  <Button type="button" color="accent" variant="soft">Accent action</Button>
                </Cluster>
              </div>

              <Stack gap="sm">
                <PaletteStrip label="Primary" scale={theme.themes.light.primary} />
                <PaletteStrip label="Accent" scale={theme.themes.light.accent} />
                <PaletteStrip label="Gray" scale={theme.themes.light.neutral} />
              </Stack>

              <Grid minItemWidth="9rem" gap="sm">
                <div className="docs-color-engine-contrast" style={{ background: theme.themes.light.primary["9"], color: primaryForeground.color }}>
                  <strong>Primary</strong>
                  <span>{primaryForeground.color} · {primaryForeground.ratio}:1</span>
                  <Badge size="xs" color={primaryForeground.aaa ? "success" : "warning"} variant="solid">{primaryForeground.aaa ? "AAA" : "AA"}</Badge>
                </div>
                <div className="docs-color-engine-contrast" style={{ background: theme.themes.light.accent["9"], color: accentForeground.color }}>
                  <strong>Accent</strong>
                  <span>{accentForeground.color} · {accentForeground.ratio}:1</span>
                  <Badge size="xs" color={accentForeground.aaa ? "success" : "warning"} variant="solid">{accentForeground.aaa ? "AAA" : "AA"}</Badge>
                </div>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </Stack>
  );
}
