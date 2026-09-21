import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Button } from "@virtari-packages/react-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@virtari-packages/react-card";
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

const STORAGE_KEY = "virtari.color-engine.gray-shade-maker.v1";
const DEFAULT_SETTINGS = { hue: 270, chroma: 0.012, oled: false };

type GraySettings = typeof DEFAULT_SETTINGS;

interface NeutralPaletteDocument {
  schema: "https://virtari.iamilya.com/schemas/neutral-palette.v1.json";
  kind: "virtari-neutral-scale";
  generatedAt: string;
  settings: GraySettings;
  themes: {
    light: { neutral: ColorScale };
    dark: { neutral: ColorScale };
  };
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
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function scaleEntries(scale: ColorScale) {
  return Array.from({ length: 12 }, (_, index) => {
    const step = `${index + 1}` as ColorStep;
    const value = scale[step];
    const parsed = parseOklch(value);
    const hex = rgbToHex(oklchToRgb(parsed));
    return { step, value, hex, foreground: chooseForeground(hex).color };
  });
}

function createDocument(settings: GraySettings, light: ColorScale, dark: ColorScale): NeutralPaletteDocument {
  return {
    schema: "https://virtari.iamilya.com/schemas/neutral-palette.v1.json",
    kind: "virtari-neutral-scale",
    generatedAt: new Date().toISOString(),
    settings,
    themes: { light: { neutral: light }, dark: { neutral: dark } },
  };
}

function downloadText(contents: string, filename: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: "application/json;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function GrayShadeMakerPage() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const text = (english: string, persian: string) => fa ? persian : english;
  const [settings, setSettings] = useState<GraySettings>(readSettings);

  const light = useMemo(
    () => generateNeutralScale("light", settings),
    [settings],
  );
  const dark = useMemo(
    () => generateNeutralScale("dark", settings),
    [settings],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const update = (next: Partial<GraySettings>) => setSettings(current => ({ ...current, ...next }));
  const serialize = () => JSON.stringify(createDocument(settings, light, dark), null, 2);

  const copyPalette = async () => {
    try {
      await navigator.clipboard.writeText(serialize());
      toast.success(text("JSON copied", "JSON کپی شد"), text("The complete light and dark scale is on your clipboard.", "طیف کامل روشن و تیره در کلیپ‌بورد شماست."));
    } catch {
      toast.error(text("Copy unavailable", "کپی ممکن نیست"), text("Use Download JSON instead.", "به‌جای آن از دریافت JSON استفاده کنید."));
    }
  };

  const copySwatch = async (value: string, step: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(text(`Step ${step} copied`, `مرحلهٔ ${step} کپی شد`), value);
    } catch {
      toast.error(text("Copy unavailable", "کپی ممکن نیست"));
    }
  };

  return (
    <Stack gap="xl" className="gray-maker">
      <div className="gray-maker-intro">
        <p className="docs-prose">
          {text(
            "Shape a quiet neutral foundation in OKLCH. Tune its temperature and tint once, then export matching light and dark scales.",
            "یک پایهٔ خنثی و آرام در OKLCH بسازید. دما و ته‌رنگ را یک‌بار تنظیم کنید و طیف هماهنگ روشن و تیره تحویل بگیرید.",
          )}
        </p>
        <span className="gray-maker-saved"><IconCheck size={14} aria-hidden="true" />{text("Saved locally", "ذخیره‌شده روی دستگاه")}</span>
      </div>

      <div className="gray-maker-workspace">
        <Card className="gray-maker-controls" size="sm">
          <CardHeader>
            <CardTitle>{text("Tune the neutral", "تنظیم رنگ خنثی")}</CardTitle>
            <CardDescription>{text("Small chroma values keep the scale neutral while hue controls its temperature.", "مقدار کم کروما، طیف را خنثی نگه می‌دارد و هیو دمای آن را تعیین می‌کند.")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="lg">
              <div className="gray-maker-control">
                <Cluster justify="between" align="center" gap="sm">
                  <label htmlFor="gray-maker-hue">{text("Hue", "هیو")}</label>
                  <Input
                    id="gray-maker-hue"
                    className="gray-maker-number"
                    size="sm"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={360}
                    step={1}
                    value={settings.hue}
                    aria-label={text("Neutral hue in degrees", "هیو رنگ خنثی به درجه")}
                    onChange={event => {
                      const value = event.currentTarget.valueAsNumber;
                      if (Number.isFinite(value)) update({ hue: Math.min(360, Math.max(0, value)) });
                    }}
                  />
                </Cluster>
                <Slider
                  aria-label={text("Neutral hue", "هیو رنگ خنثی")}
                  value={[settings.hue]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={([value]) => update({ hue: value })}
                />
                <div className="gray-maker-scale-labels" aria-hidden="true"><span>0°</span><span>180°</span><span>360°</span></div>
              </div>

              <div className="gray-maker-control">
                <Cluster justify="between" align="center" gap="sm">
                  <label htmlFor="gray-maker-chroma">{text("Tint strength", "شدت ته‌رنگ")}</label>
                  <Input
                    id="gray-maker-chroma"
                    className="gray-maker-number"
                    size="sm"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={0.04}
                    step={0.001}
                    value={settings.chroma}
                    aria-label={text("Neutral chroma", "کروما رنگ خنثی")}
                    onChange={event => {
                      const value = event.currentTarget.valueAsNumber;
                      if (Number.isFinite(value)) update({ chroma: Math.min(0.04, Math.max(0, value)) });
                    }}
                  />
                </Cluster>
                <Slider
                  aria-label={text("Neutral tint strength", "شدت ته‌رنگ خنثی")}
                  value={[settings.chroma]}
                  min={0}
                  max={0.04}
                  step={0.001}
                  onValueChange={([value]) => update({ chroma: Number(value.toFixed(3)) })}
                />
                <div className="gray-maker-scale-labels" aria-hidden="true"><span>{text("Pure", "خالص")}</span><span>{text("Balanced", "متعادل")}</span><span>{text("Tinted", "ته‌رنگ‌دار")}</span></div>
              </div>

              <div className="gray-maker-switch-row">
                <div>
                  <label htmlFor="gray-maker-oled">{text("OLED dark canvas", "زمینهٔ تیرهٔ OLED")}</label>
                  <p>{text("Use true black for dark step 1.", "برای مرحلهٔ اول تم تیره از مشکی خالص استفاده می‌کند.")}</p>
                </div>
                <Switch id="gray-maker-oled" checked={settings.oled} onCheckedChange={oled => update({ oled })} />
              </div>
            </Stack>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              color="contrast"
              variant="ghost"
              size="sm"
              leftSection={<IconRefresh size={16} aria-hidden="true" />}
              onClick={() => setSettings(DEFAULT_SETTINGS)}
            >
              {text("Reset", "بازنشانی")}
            </Button>
          </CardFooter>
        </Card>

        <Card className="gray-maker-preview" size="sm" variant="soft">
          <CardHeader>
            <CardTitle>{text("Live scale", "طیف زنده")}</CardTitle>
            <CardDescription>{text("Select any swatch to copy its gamut-safe OKLCH value.", "برای کپی مقدار امن OKLCH، هر نمونه را انتخاب کنید.")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="xl">
              <ScalePreview
                title={text("Light", "روشن")}
                note={text("Canvas → boundaries → solid → text", "زمینه ← مرزها ← سطح پر ← متن")}
                scale={light}
                onCopy={copySwatch}
              />
              <ScalePreview
                title={text("Dark", "تیره")}
                note={settings.oled ? text("True black OLED canvas", "زمینهٔ OLED با مشکی خالص") : text("Raised dark canvas", "زمینهٔ تیرهٔ ملایم")}
                scale={dark}
                onCopy={copySwatch}
              />
            </Stack>
          </CardContent>
        </Card>
      </div>

      <Card className="gray-maker-export" variant="outline" size="sm">
        <CardContent>
          <div className="gray-maker-export-content">
            <div>
              <h3>{text("Ready to use", "آمادهٔ استفاده")}</h3>
              <p>{text("24 neutral tokens · light and dark · portable Virtari JSON", "۲۴ توکن خنثی · روشن و تیره · JSON قابل‌انتقال ویرتاری")}</p>
            </div>
            <Cluster gap="sm">
              <Button type="button" color="contrast" variant="outline" leftSection={<IconCopy size={16} aria-hidden="true" />} onClick={copyPalette}>
                {text("Copy JSON", "کپی JSON")}
              </Button>
              <Button type="button" leftSection={<IconDownload size={16} aria-hidden="true" />} onClick={() => downloadText(serialize(), "virtari-neutral-scale.json")}>
                {text("Download JSON", "دریافت JSON")}
              </Button>
            </Cluster>
          </div>
        </CardContent>
      </Card>
    </Stack>
  );
}

function ScalePreview({
  title,
  note,
  scale,
  onCopy,
}: {
  title: string;
  note: string;
  scale: ColorScale;
  onCopy: (value: string, step: string) => void;
}) {
  return (
    <section className="gray-maker-scale" aria-label={`${title} neutral scale`}>
      <div className="gray-maker-scale-heading">
        <strong>{title}</strong>
        <span>{note}</span>
      </div>
      <div className="gray-maker-swatches">
        {scaleEntries(scale).map(entry => (
          <Button
            key={entry.step}
            type="button"
            variant="ghost"
            color="contrast"
            className="gray-maker-swatch"
            aria-label={`Copy ${title.toLowerCase()} neutral ${entry.step}: ${entry.value}`}
            title={entry.value}
            style={{ background: entry.value, color: entry.foreground } as CSSProperties}
            onClick={() => onCopy(entry.value, entry.step)}
          >
            <span className="gray-maker-swatch-step">{entry.step}</span>
            <span className="gray-maker-swatch-hex" dir="ltr">{entry.hex}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}
