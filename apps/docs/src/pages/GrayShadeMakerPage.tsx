import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Button } from "@virtari-packages/react-button";
import { IconCheck, IconCopy, IconDownload, IconRefresh } from "@virtari-packages/react-icons";
import { Input } from "@virtari-packages/react-input";
import { Cluster, Stack } from "@virtari-packages/react-layout";
import { Slider } from "@virtari-packages/react-slider";
import { Switch } from "@virtari-packages/react-switch";
import { toast } from "@virtari-packages/react-toast";
import {
  chooseForeground,
  generateNeutralScale,
  oklchToRgb,
  parseOklch,
  rgbToHex,
  type ColorScale,
  type ColorStep,
} from "virtari-color-engine";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "virtari.color-engine.gray-shade-maker.v2";
const DEFAULT_SETTINGS = { hue: 270, chroma: 0.012, oled: false };

type GraySettings = typeof DEFAULT_SETTINGS;

const GRAY_PRESETS = [
  { id: "pure", label: "Pure", description: "Strictly colorless", hue: 0, chroma: 0 },
  { id: "slate", label: "Slate", description: "Cool and technical", hue: 245, chroma: 0.016 },
  { id: "balanced", label: "Balanced", description: "Quiet and versatile", hue: 270, chroma: 0.012 },
  { id: "blue", label: "Blue gray", description: "Crisp product surfaces", hue: 220, chroma: 0.018 },
  { id: "stone", label: "Stone", description: "Soft and editorial", hue: 70, chroma: 0.014 },
  { id: "taupe", label: "Taupe", description: "Warm premium tone", hue: 45, chroma: 0.018 },
] as const;

interface NeutralPaletteDocument {
  schema: "https://virtari.iamilya.com/schemas/neutral-palette.v1.json";
  kind: "virtari-neutral-scale";
  generatedAt: string;
  settings: GraySettings;
  themes: { light: { neutral: ColorScale }; dark: { neutral: ColorScale } };
}

function readSettings(): GraySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<GraySettings> | null;
    if (!value) return DEFAULT_SETTINGS;
    return {
      hue: typeof value.hue === "number" ? Math.min(360, Math.max(0, value.hue)) : DEFAULT_SETTINGS.hue,
      chroma: typeof value.chroma === "number" ? Math.min(0.04, Math.max(0, value.chroma)) : DEFAULT_SETTINGS.chroma,
      oled: typeof value.oled === "boolean" ? value.oled : DEFAULT_SETTINGS.oled,
    };
  } catch { return DEFAULT_SETTINGS; }
}

function scaleEntries(scale: ColorScale) {
  return Array.from({ length: 12 }, (_, index) => {
    const step = `${index + 1}` as ColorStep;
    const value = scale[step];
    const hex = rgbToHex(oklchToRgb(parseOklch(value)));
    return { step, value, hex, foreground: chooseForeground(hex).color };
  });
}

function createDocument(settings: GraySettings, light: ColorScale, dark: ColorScale): NeutralPaletteDocument {
  return { schema: "https://virtari.iamilya.com/schemas/neutral-palette.v1.json", kind: "virtari-neutral-scale", generatedAt: new Date().toISOString(), settings, themes: { light: { neutral: light }, dark: { neutral: dark } } };
}

function serializeCss(light: ColorScale, dark: ColorScale) {
  const declarations = (scale: ColorScale) => Array.from({ length: 12 }, (_, index) => `  --vds-color-neutral-${index + 1}: ${scale[`${index + 1}` as ColorStep]};`).join("\n");
  return `:root,\n[data-theme="light"] {\n${declarations(light)}\n}\n\n[data-theme="dark"],\n[data-theme="dark-oled"] {\n${declarations(dark)}\n}\n`;
}

function downloadText(contents: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function PaletteStrip({ scale, label }: { scale: ColorScale; label: string }) {
  return <span className="gray-maker-palette" aria-label={`${label} neutral palette`}>{scaleEntries(scale).map(entry => <i key={entry.step} style={{ backgroundColor: entry.value }} title={`${entry.step}: ${entry.value}`} />)}</span>;
}

export function GrayShadeMakerPage() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const text = (english: string, persian: string) => fa ? persian : english;
  const [settings, setSettings] = useState<GraySettings>(readSettings);
  const light = useMemo(() => generateNeutralScale("light", settings), [settings]);
  const dark = useMemo(() => generateNeutralScale("dark", settings), [settings]);
  const activePreset = GRAY_PRESETS.find(preset => preset.hue === settings.hue && preset.chroma === settings.chroma)?.id;

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
  }, [settings]);

  const update = (next: Partial<GraySettings>) => setSettings(current => ({ ...current, ...next }));
  const serialize = () => JSON.stringify(createDocument(settings, light, dark), null, 2);

  const copyPalette = async () => {
    try {
      await navigator.clipboard.writeText(serialize());
      toast.success(text("JSON copied", "JSON کپی شد"), text("The light and dark scales are on your clipboard.", "طیف روشن و تیره در کلیپ‌بورد شماست."));
    } catch { toast.error(text("Copy unavailable", "کپی ممکن نیست"), text("Download the JSON instead.", "به‌جای آن JSON را دریافت کنید.")); }
  };

  const copySwatch = async (value: string, step: string) => {
    try { await navigator.clipboard.writeText(value); toast.success(text(`Step ${step} copied`, `مرحلهٔ ${step} کپی شد`), value); }
    catch { toast.error(text("Copy unavailable", "کپی ممکن نیست")); }
  };

  return <Stack gap="xl" className="gray-maker">
    <div className="gray-maker-intro">
      <p className="docs-prose">{text("Build a neutral foundation in OKLCH. Start from a tested palette, refine its temperature, then export matching light and dark tokens.", "یک پایهٔ خنثی در OKLCH بسازید. از یک پالت آزموده شروع کنید، دمای آن را تنظیم کنید و توکن‌های هماهنگ روشن و تیره تحویل بگیرید.")}</p>
      <Cluster gap="sm" className="gray-maker-actions">
        <Button type="button" size="sm" color="contrast" variant="outline" leftSection={<IconRefresh size={16} aria-hidden />} onClick={() => setSettings(DEFAULT_SETTINGS)}>{text("Reset settings", "بازنشانی تنظیمات")}</Button>
        <Button type="button" size="sm" color="contrast" variant="outline" leftSection={<IconDownload size={16} aria-hidden />} onClick={() => downloadText(serializeCss(light, dark), "virtari-neutral-scale.css", "text/css;charset=utf-8")}>{text("Download CSS", "دریافت CSS")}</Button>
        <Button type="button" size="sm" leftSection={<IconDownload size={16} aria-hidden />} onClick={() => downloadText(serialize(), "virtari-neutral-scale.json", "application/json;charset=utf-8")}>{text("Download JSON", "دریافت JSON")}</Button>
      </Cluster>
    </div>

    <section className="gray-maker-section" aria-labelledby="gray-maker-presets">
      <div className="gray-maker-section-head"><div><h2 id="gray-maker-presets">{text("Choose a starting palette", "انتخاب پالت پایه")}</h2><p>{text("Each option is a complete 12-step neutral scale, not a single gray.", "هر گزینه یک طیف خنثی کامل ۱۲ مرحله‌ای است، نه یک خاکستری منفرد.")}</p></div></div>
      <div className="gray-maker-presets">{GRAY_PRESETS.map(preset => {
        const preview = generateNeutralScale("light", { hue: preset.hue, chroma: preset.chroma, oled: settings.oled });
        return <Button key={preset.id} type="button" color="contrast" variant="outline" className="gray-maker-preset" aria-pressed={activePreset === preset.id} onClick={() => update({ hue: preset.hue, chroma: preset.chroma })}><span><strong>{preset.label}</strong><small>{preset.description}</small></span><PaletteStrip scale={preview} label={preset.label} />{activePreset === preset.id && <IconCheck size={17} aria-hidden />}</Button>;
      })}</div>
    </section>

    <div className="gray-maker-workspace">
      <section className="gray-maker-section gray-maker-controls" aria-labelledby="gray-maker-tune">
        <div className="gray-maker-section-head"><div><h2 id="gray-maker-tune">{text("Fine tune", "تنظیم دقیق")}</h2><p>{text("Small changes are enough for a neutral palette.", "برای یک پالت خنثی، تغییرهای کوچک کافی‌اند.")}</p></div></div>
        <Stack gap="lg">
          <div className="gray-maker-control">
            <Cluster justify="between" align="center" gap="sm"><label htmlFor="gray-maker-hue">{text("Temperature", "دمای رنگ")}</label><Input id="gray-maker-hue" className="gray-maker-number" size="sm" type="number" inputMode="numeric" min={0} max={360} step={1} value={settings.hue} aria-label={text("Neutral hue in degrees", "هیو رنگ خنثی به درجه")} onChange={event => { const value = event.currentTarget.valueAsNumber; if (Number.isFinite(value)) update({ hue: Math.min(360, Math.max(0, value)) }); }} /></Cluster>
            <Slider aria-label={text("Neutral temperature", "دمای رنگ خنثی")} value={[settings.hue]} min={0} max={360} step={1} onValueChange={([value]) => update({ hue: value })} />
            <div className="gray-maker-scale-labels" aria-hidden><span>{text("Warm", "گرم")}</span><span>{text("Cool", "سرد")}</span><span>{text("Warm", "گرم")}</span></div>
          </div>
          <div className="gray-maker-control">
            <Cluster justify="between" align="center" gap="sm"><label htmlFor="gray-maker-chroma">{text("Tint strength", "شدت ته‌رنگ")}</label><Input id="gray-maker-chroma" className="gray-maker-number" size="sm" type="number" inputMode="decimal" min={0} max={0.04} step={0.001} value={settings.chroma} aria-label={text("Neutral chroma", "کروما رنگ خنثی")} onChange={event => { const value = event.currentTarget.valueAsNumber; if (Number.isFinite(value)) update({ chroma: Math.min(0.04, Math.max(0, value)) }); }} /></Cluster>
            <Slider aria-label={text("Neutral tint strength", "شدت ته‌رنگ خنثی")} value={[settings.chroma]} min={0} max={0.04} step={0.001} onValueChange={([value]) => update({ chroma: Number(value.toFixed(3)) })} />
            <div className="gray-maker-scale-labels" aria-hidden><span>{text("Pure", "خالص")}</span><span>{text("Balanced", "متعادل")}</span><span>{text("Tinted", "ته‌رنگ‌دار")}</span></div>
          </div>
          <div className="gray-maker-switch-row"><div><label htmlFor="gray-maker-oled">{text("OLED dark canvas", "زمینهٔ تیرهٔ OLED")}</label><p>{text("Use true black for dark step 1.", "برای مرحلهٔ اول تم تیره از مشکی خالص استفاده می‌کند.")}</p></div><Switch id="gray-maker-oled" checked={settings.oled} onCheckedChange={oled => update({ oled })} /></div>
        </Stack>
      </section>

      <section className="gray-maker-section gray-maker-preview" aria-labelledby="gray-maker-result">
        <div className="gray-maker-section-head"><div><h2 id="gray-maker-result">{text("Generated scale", "طیف ساخته‌شده")}</h2><p>{text("Select a swatch to copy its gamut-safe OKLCH value.", "برای کپی مقدار امن OKLCH، یک نمونه را انتخاب کنید.")}</p></div></div>
        <Stack gap="xl"><ScalePreview title={text("Light", "روشن")} note={text("Canvas → boundary → solid → text", "زمینه ← مرز ← سطح پر ← متن")} scale={light} onCopy={copySwatch} /><ScalePreview title={text("Dark", "تیره")} note={settings.oled ? text("True black canvas", "زمینهٔ مشکی خالص") : text("Raised dark canvas", "زمینهٔ تیرهٔ ملایم")} scale={dark} onCopy={copySwatch} /></Stack>
      </section>
    </div>

    <div className="gray-maker-footer"><div><strong>{text("24 neutral tokens", "۲۴ توکن خنثی")}</strong><span>{text("Light and dark · Virtari JSON and CSS", "روشن و تیره · JSON و CSS ویرتاری")}</span></div><Button type="button" color="contrast" variant="outline" leftSection={<IconCopy size={16} aria-hidden />} onClick={copyPalette}>{text("Copy JSON", "کپی JSON")}</Button></div>
  </Stack>;
}

function ScalePreview({ title, note, scale, onCopy }: { title: string; note: string; scale: ColorScale; onCopy: (value: string, step: string) => void }) {
  return <section className="gray-maker-scale" aria-label={`${title} neutral scale`}><div className="gray-maker-scale-heading"><strong>{title}</strong><span>{note}</span></div><div className="gray-maker-swatches">{scaleEntries(scale).map(entry => <Button key={entry.step} type="button" variant="solid" color="contrast" className="gray-maker-swatch" aria-label={`Copy ${title.toLowerCase()} neutral ${entry.step}: ${entry.value}`} title={entry.value} style={{ backgroundColor: entry.value, color: entry.foreground } as CSSProperties} onClick={() => onCopy(entry.value, entry.step)}><span className="gray-maker-swatch-step">{entry.step}</span><span className="gray-maker-swatch-hex" dir="ltr">{entry.hex}</span></Button>)}</div></section>;
}
