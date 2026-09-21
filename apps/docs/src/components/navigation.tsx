import type { ReactNode } from "react";
import { IconBook2, IconRuler, IconPalette, IconTypography, IconIcons, IconLayoutBoard, IconLayout, IconLayoutNavbar, IconCompass, IconLayoutBottombar, IconLayoutSidebar, IconTool, IconLanguage, IconClick, IconCursorText, IconNumbers, IconForms, IconSelector, IconSquareCheck, IconCircleDot, IconToggleLeft, IconToggleRight, IconAdjustmentsHorizontal, IconCalendar, IconLayoutList, IconCode, IconTag, IconUserCircle, IconCards, IconHeading, IconLetterT, IconSeparatorHorizontal, IconKeyboard, IconProgress, IconSquareRounded, IconLoader2, IconMessage2, IconAlertCircle, IconMenu, IconBell, IconChevronRight, IconLayoutGrid, IconChevronDown, IconArrowsVertical, IconTable, IconPackage, IconBuildingStore, IconTableRow, IconUpload, IconTerminal2, IconGitBranch, IconCircle } from "@virtari-packages/react-icons";

const navIconProps = { size: 16, stroke: 1.75 } as const;

const ICONS: Record<string, ReactNode> = {
  introduction: <IconBook2 {...navIconProps} />,
  installation: <IconPackage {...navIconProps} />,
  guidelines: <IconBook2 {...navIconProps} />,
  brand: <IconPalette {...navIconProps} />,

  sizing: <IconRuler {...navIconProps} />,
  colors: <IconPalette {...navIconProps} />,
  "gray-shade-maker": <IconPalette {...navIconProps} />,
  "color-generator": <IconPalette {...navIconProps} />,
  typography: <IconTypography {...navIconProps} />,
  icons: <IconIcons {...navIconProps} />,
  composition: <IconLayoutBoard {...navIconProps} />,
  layout: <IconLayout {...navIconProps} />,
  header: <IconLayoutNavbar {...navIconProps} />,
  nav: <IconCompass {...navIconProps} />,
  "bottom-nav": <IconLayoutBottombar {...navIconProps} />,
  sidebar: <IconLayoutSidebar {...navIconProps} />,
  utilities: <IconTool {...navIconProps} />,
  "tokens-reference": <IconRuler {...navIconProps} />,
  "ai-integration": <IconTerminal2 {...navIconProps} />,
  rtl: <IconLanguage {...navIconProps} />,

  button: <IconClick {...navIconProps} />,
  "button-group": <IconClick {...navIconProps} />,
  input: <IconCursorText {...navIconProps} />,
  "number-input": <IconNumbers {...navIconProps} />,
  "otp-input": <IconNumbers {...navIconProps} />,
  textarea: <IconForms {...navIconProps} />,
  select: <IconSelector {...navIconProps} />,
  checkbox: <IconSquareCheck {...navIconProps} />,
  "radio-group": <IconCircleDot {...navIconProps} />,
  switch: <IconToggleLeft {...navIconProps} />,
  toggle: <IconToggleRight {...navIconProps} />,
  slider: <IconAdjustmentsHorizontal {...navIconProps} />,
  "date-picker": <IconCalendar {...navIconProps} />,
  editor: <IconCursorText {...navIconProps} />,
  "yoopta-editor": <IconLayoutList {...navIconProps} />,
  code: <IconCode {...navIconProps} />,
  label: <IconTag {...navIconProps} />,

  avatar: <IconUserCircle {...navIconProps} />,
  badge: <IconTag {...navIconProps} />,
  chip: <IconTag {...navIconProps} />,
  "color-picker": <IconPalette {...navIconProps} />,
  card: <IconCards {...navIconProps} />,
  heading: <IconHeading {...navIconProps} />,
  text: <IconLetterT {...navIconProps} />,
  separator: <IconSeparatorHorizontal {...navIconProps} />,
  kbd: <IconKeyboard {...navIconProps} />,
  progress: <IconProgress {...navIconProps} />,
  skeleton: <IconSquareRounded {...navIconProps} />,
  spinner: <IconLoader2 {...navIconProps} />,

  dialog: <IconMessage2 {...navIconProps} />,
  drawer: <IconLayoutSidebar {...navIconProps} />,
  "alert-dialog": <IconAlertCircle {...navIconProps} />,
  "dropdown-menu": <IconMenu {...navIconProps} />,
  popover: <IconMessage2 {...navIconProps} />,
  tooltip: <IconMessage2 {...navIconProps} />,
  toast: <IconBell {...navIconProps} />,

  breadcrumb: <IconChevronRight {...navIconProps} />,
  tabs: <IconLayoutGrid {...navIconProps} />,
  accordion: <IconLayoutList {...navIconProps} />,
  collapsible: <IconChevronDown {...navIconProps} />,
  "scroll-area": <IconArrowsVertical {...navIconProps} />,
  carousel: <IconCards {...navIconProps} />,
  "data-table": <IconTable {...navIconProps} />,
  "data-table-users": <IconUserCircle {...navIconProps} />,
  "data-table-products": <IconPackage {...navIconProps} />,
  "data-table-orders": <IconBuildingStore {...navIconProps} />,
  table: <IconTableRow {...navIconProps} />,
  pagination: <IconNumbers {...navIconProps} />,
  form: <IconForms {...navIconProps} />,
  "file-upload": <IconUpload {...navIconProps} />,
  command: <IconTerminal2 {...navIconProps} />,
  "empty-state": <IconSquareRounded {...navIconProps} />,
  fieldset: <IconForms {...navIconProps} />,
  stepper: <IconProgress {...navIconProps} />,
  timeline: <IconArrowsVertical {...navIconProps} />,
  "tag-input": <IconTag {...navIconProps} />,
  flow: <IconGitBranch {...navIconProps} />,
};

const FALLBACK_ICON = <IconCircle {...navIconProps} />;

/* ────────────────────────────────
 * Nav data — each group carries an i18n key for the header and a list of
 * page paths. Item labels come from the `nav` translation namespace at
 * render time so switching locale flips the whole tree.
 * ──────────────────────────────── */
export type NavGroupData = { groupKey: string; items: string[] };

export const NAV_ITEMS: NavGroupData[] = [
  { groupKey: "groups.overview", items: ["introduction", "installation", "guidelines"] },
  {
    groupKey: "groups.foundations",
    items: [
      "brand",
      "sizing",
      "colors",
      "gray-shade-maker",
      "color-generator",
      "typography",
      "icons",
      "composition",
      "layout",
      "rtl",
    ],
  },
  { groupKey: "groups.utilities", items: ["utilities", "tokens-reference", "ai-integration"] },
  {
    groupKey: "groups.formControls",
    items: [
      "form",
      "button",
      "button-group",
      "input",
      "number-input",
      "otp-input",
      "textarea",
      "editor",
      "yoopta-editor",
      "code",
      "select",
      "checkbox",
      "radio-group",
      "switch",
      "toggle",
      "slider",
      "color-picker",
      "date-picker",
      "phone-input",
      "language-picker",
      "file-upload",
      "label",
      "fieldset",
      "tag-input",
    ],
  },
  {
    groupKey: "groups.display",
    items: [
      "avatar",
      "badge",
      "chip",
      "flag",
      "card",
      "heading",
      "text",
      "separator",
      "kbd",
      "progress",
      "skeleton",
      "spinner",
      "empty-state",
    ],
  },
  {
    groupKey: "groups.overlays",
    items: [
      "dialog",
      "drawer",
      "alert-dialog",
      "dropdown-menu",
      "popover",
      "tooltip",
      "toast",
      "command",
    ],
  },
  {
    groupKey: "groups.navigation",
    items: ["header", "nav", "bottom-nav", "sidebar", "breadcrumb"],
  },
  {
    groupKey: "groups.layout",
    items: ["tabs", "accordion", "collapsible", "scroll-area", "stepper", "timeline", "flow", "carousel"],
  },
  {
    groupKey: "groups.data",
    items: [
      "table",
      "pagination",
      "data-table",
      "data-table-users",
      "data-table-products",
      "data-table-orders",
    ],
  },
];


export const DOC_PATHS = NAV_ITEMS.flatMap(group => group.items);
export function getPageIcon(path: string) { return ICONS[path] ?? FALLBACK_ICON; }

const INSTALL_ALIASES: Record<string, string> = {
  composition: "layout",
  colors: "virtari-tokens",
  "gray-shade-maker": "virtari-color-engine",
  "color-generator": "virtari-color-engine",
  heading: "text",
  sizing: "virtari-tokens",
  typography: "virtari-tokens",
  utilities: "virtari-utilities",
  "tokens-reference": "virtari-tokens",
};

const NON_INSTALLABLE_PATHS = new Set([
  "introduction",
  "installation",
  "guidelines",
  "brand",
  "rtl",
  "ai-integration",
  "data-table-users",
  "data-table-products",
  "data-table-orders",
]);

export function getInstallItem(path: string) {
  if (NON_INSTALLABLE_PATHS.has(path)) return undefined;
  return INSTALL_ALIASES[path] ?? path;
}
