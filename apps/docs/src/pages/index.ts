export { DesignGuidelinesPage } from "./DesignGuidelinesPage";
export { BrandingPage } from "./BrandingPage";
export { IntroductionPage } from "./IntroductionPage";
export { SourceInstallationPage } from "./SourceInstallationPage";
export { ButtonPage } from "./ButtonPage";
export { ButtonGroupPage } from "./ButtonGroupPage";
export { BadgePage } from "./BadgePage";
export { InputPage } from "./InputPage";
export { NumberInputPage } from "./NumberInputPage";
export { OtpInputPage } from "./OtpInputPage";
export { SwitchPage } from "./SwitchPage";
export { CheckboxPage } from "./CheckboxPage";
export { TogglePage } from "./TogglePage";
export { AvatarPage } from "./AvatarPage";
export { TabsPage } from "./TabsPage";
export { SelectPage } from "./SelectPage";
export { DialogPage } from "./DialogPage";
export { DrawerPage } from "./DrawerPage";
export { ColorsPage } from "./ColorsPage";
export { GrayShadeMakerPage } from "./GrayShadeMakerPage";
export { ColorGeneratorPage } from "./ColorGeneratorPage";
export { TypographyPage } from "./TypographyPage";
export { SizingPage } from "./SizingPage";
export { TooltipPage } from "./TooltipPage";
export { PopoverPage } from "./PopoverPage";
export { DropdownMenuPage } from "./DropdownMenuPage";
export { AlertDialogPage } from "./AlertDialogPage";
export { ToastPage } from "./ToastPage";
export { RadioGroupPage } from "./RadioGroupPage";
export { LabelPage } from "./LabelPage";
export { SeparatorPage } from "./SeparatorPage";
export { SliderPage } from "./SliderPage";
export { ProgressPage } from "./ProgressPage";
export { ScrollAreaPage } from "./ScrollAreaPage";
export { AccordionPage } from "./AccordionPage";
export { CollapsiblePage } from "./CollapsiblePage";
export { TextareaPage } from "./TextareaPage";
export { EditorPage } from "./EditorPage";
export { YooptaEditorPage } from "./YooptaEditorPage";
export { BreadcrumbPage } from "./BreadcrumbPage";
export { SkeletonPage } from "./SkeletonPage";
export { SpinnerPage } from "./SpinnerPage";
export { CardPage } from "./CardPage";
export { KbdPage } from "./KbdPage";
export { ChipPage } from "./ChipPage";
export { ColorPickerPage } from "./ColorPickerPage";
export { CompositionPage } from "./CompositionPage";
export { LayoutPage } from "./LayoutPage";
export { HeaderPage } from "./HeaderPage";
export { NavPage } from "./NavPage";
export { SidebarPage } from "./SidebarPage";
export { DatePickerPage } from "./DatePickerPage";
export { DataTablePage } from "./DataTablePage";
export { DataTableUsersPage } from "./DataTableUsersPage";
export { DataTableProductsPage } from "./DataTableProductsPage";
export { DataTableOrdersPage } from "./DataTableOrdersPage";
export { TablePage } from "./TablePage";
export { UtilitiesPage } from "./UtilitiesPage";
export { TokensReferencePage } from "./TokensReferencePage";
export { AiIntegrationPage } from "./AiIntegrationPage";
export { RTLPage } from "./RTLPage";
export { IconsPage } from "./IconsPage";
export { HeadingPage } from "./HeadingPage";
export { TextPage } from "./TextPage";
export { FlagPage } from "./FlagPage";
export { PhoneInputPage } from "./PhoneInputPage";
export { LanguagePickerPage } from "./LanguagePickerPage";
export { BottomNavPage } from "./BottomNavPage";
export { PaginationPage } from "./PaginationPage";
export { FormPage } from "./FormPage";
export { FileUploadPage } from "./FileUploadPage";
export { CommandPage } from "./CommandPage";
export { EmptyStatePage } from "./EmptyStatePage";
export { FieldsetPage } from "./FieldsetPage";
export { StepperPage } from "./StepperPage";
export { TimelinePage } from "./TimelinePage";
export { TagInputPage } from "./TagInputPage";
export { CodePage } from "./CodePage";
export { CarouselPage } from "./CarouselPage";
export { FlowPage } from "./FlowPage";

export const PAGE_META: Record<string, { title: string; description: string }> = {
  "tokens-reference": { title: "Token reference", description: "Every source variable, expression and scoped definition, searchable by category." },
  "ai-integration": { title: "AI integration", description: "Focused Agent Skills, a local MCP server and source-backed examples." },
  guidelines: { title: "Design guidelines", description: "Practical patterns for understandable forms, clear actions and predictable keyboard use." },
  brand: { title: "Brand", description: "Virtari marks, app icons and loading states." },
  introduction: { title: "Introduction", description: "Overview of the Virtari Design System." },
  installation: { title: "Source installation", description: "Add one component or the complete Virtari system as editable project source." },
  sizing: { title: "Sizing", description: "Unified size system, height ramp, WCAG compliance." },
  colors: { title: "Colors", description: "OKLCH color palette and semantic token reference." },
  "gray-shade-maker": { title: "Gray Shade Maker", description: "Build a perceptual neutral scale and export it in Virtari's portable token format." },
  "color-generator": { title: "Color Generator", description: "Turn brand colors and neutral shades into an accessible, live Virtari theme." },
  typography: { title: "Typography", description: "Font scale, weights, and font family tokens." },
  button: { title: "Button", description: "Five appearance variants, eight sizes, icon slots, loading and deliberate motion options." },
  "button-group": {
    title: "Button Group",
    description:
      "Segmented row of buttons sharing one color × variant × size via context. Attached or spaced, horizontal or vertical, with RTL-correct collapsed radii.",
  },
  badge: {
    title: "Badge",
    description:
      "7 colors × 5 variants × 4 sizes — pill or square, optional dot, icons, removable chip, and asChild routing.",
  },
  input: { title: "Input", description: "Text input — 7 sizes aligned with Button." },
  "number-input": {
    title: "Number Input",
    description: "Numeric stepper with min/max/step support and field metadata.",
  },
  "otp-input": {
    title: "OTP Input",
    description:
      "One-time code input with SMS autofill hints, paste distribution, digit normalization, and keyboard navigation.",
  },
  textarea: { title: "Textarea", description: "Native multiline text input with labeled fields and character counters." },
  editor: {
    title: "Rich Text Editor",
    description:
      "Lexical-powered editor with a lean core preset, optional productivity layers, slash commands, tables, markdown/html output, and token-driven styling.",
  },
  "yoopta-editor": {
    title: "Block Editor (Yoopta)",
    description:
      "Notion-style block editor — Yoopta-Editor wrapped with Virtari tokens. Slash menu, floating toolbar, drag-and-drop blocks, 20 plugins (paragraph, headings, lists, callout, code, table, image, video, embed, math, mention, emoji, accordion, tabs, steps, carousel, TOC).",
  },
  select: { title: "Select", description: "Dropdown selector with groups and search." },
  checkbox: { title: "Checkbox", description: "Multi-select with indeterminate state." },
  "radio-group": {
    title: "Radio Group",
    description:
      "Single-choice primitive with 3 sizes, error state, cards (row + icon-grid), segmented button group, and pill filters.",
  },
  switch: { title: "Switch", description: "Toggle control for binary states." },
  toggle: { title: "Toggle", description: "Pressable toggle button." },
  slider: { title: "Slider", description: "Range input for numeric values." },
  label: { title: "Label", description: "Accessible form label." },
  separator: { title: "Separator", description: "Visual divider line." },
  avatar: { title: "Avatar", description: "Profile image with fallback initials." },
  tabs: { title: "Tabs", description: "Tabbed navigation panels." },
  dialog: { title: "Dialog", description: "Modal dialog with overlay." },
  drawer: {
    title: "Drawer",
    description: "Named stages, edge offsets, indicator placement, and touch-friendly drag behavior.",
  },
  "alert-dialog": { title: "Alert Dialog", description: "Confirmation dialog for destructive actions." },
  "dropdown-menu": { title: "Dropdown Menu", description: "Action menu with items and groups." },
  popover: { title: "Popover", description: "Positioned popup content." },
  tooltip: { title: "Tooltip", description: "Info popup on hover or focus." },
  toast: { title: "Toast", description: "Notification messages." },
  progress: { title: "Progress", description: "Loading and progress bar." },
  accordion: { title: "Accordion", description: "Collapsible content sections." },
  collapsible: { title: "Collapsible", description: "Show/hide content toggle." },
  "scroll-area": { title: "Scroll Area", description: "Custom scrollbar container." },
  card: { title: "Card", description: "Content container with header and footer." },
  skeleton: { title: "Skeleton", description: "Loading placeholder." },
  spinner: { title: "Spinner", description: "Loading indicator." },
  kbd: { title: "Kbd", description: "Keyboard shortcut badge." },
  chip: {
    title: "Chip",
    description:
      "Compact pill for tags, filters, and metadata — 6 variants, 3 appearances, 3 sizes, with icon/avatar slot and removable action.",
  },
  "color-picker": {
    title: "Color Picker",
    description:
      "Professional solid and gradient picker â€” CSS code mode, stop editing, alpha, eyedropper support, and full HEX/RGB/HSL/HSB conversion.",
  },
  heading: {
    title: "Heading",
    description:
      "Semantic h1–h6 with decoupled visual size — 9-step display scale, weight, tone, and balance/truncate wrap.",
  },
  text: {
    title: "Text",
    description:
      "Paragraph and inline copy — 9-step size scale, semantic tones, alignment, leading override, and truncate.",
  },
  composition: {
    title: "Composition",
    description: "Layout primitives — Stack, Cluster, Grid, Sidebar, Center.",
  },
  utilities: {
    title: "Utilities",
    description:
      "Opt-in CSS utility classes for spacing, flex, grid, sizing, position, and z-index — all token-driven, logical-property-first, with sm/md/lg/xl/2xl responsive variants.",
  },
  icons: {
    title: "Icons",
    description:
      "Tabler Icons (MIT) — outline + filled, re-exported from @virtari-packages/react-icons. Searchable, copyable, with live size and stroke controls.",
  },
  rtl: {
    title: "RTL",
    description:
      "Right-to-left support and Vazirmatn typography — every component audited for logical properties and direction-aware animations.",
  },
  layout: {
    title: "Page Layout",
    description:
      "Section → Row → Col — semantic page-structure primitives tied to the Layout token system.",
  },
  header: {
    title: "Header",
    description:
      "Three-row header primitive — top / main / bottom. Per-row sticky modes (always / smart / collapse), transparent, center, and coordinated offset stacking.",
  },
  nav: {
    title: "Navigation",
    description:
      "One Nav, many shapes — sidebar, menubar, mega menu. W3C disclosure pattern, inline or popover submenus via Floating UI, auto aria-current, four variants.",
  },
  sidebar: {
    title: "Sidebar",
    description:
      "App-chrome sidebar — full-height or below-header modes, rail collapse, controlled / uncontrolled state, context-wired trigger, and full RTL via logical properties.",
  },
  breadcrumb: {
    title: "Breadcrumb",
    description:
      "Semantic <nav> + <ol> with aria-current, schema.org JSON-LD, overflow collapse, four separator presets, and full RTL support.",
  },
  "date-picker": {
    title: "Date Picker",
    description:
      "Date, range, time, and calendar primitives — Persian, Islamic, Gregorian + full RTL.",
  },
  "data-table": {
    title: "Data Table",
    description:
      "Excel-like resize, virtualization (10k+ rows), pinning, grouping, inline edit, server-side — built on TanStack.",
  },
  "data-table-users": {
    title: "Users — Data Table showcase",
    description:
      "Production-grade users table — view switch, search, filter bar + drawer, customize columns, bulk actions, refresh, export, add — composed entirely from the design-system primitives.",
  },
  "data-table-products": {
    title: "Products — Data Table showcase",
    description:
      "Product catalog showcase — per-column filters, category grouping, bulk archive, customize columns, and table/board view modes.",
  },
  "data-table-orders": {
    title: "Orders — Data Table showcase",
    description:
      "Server-side orders showcase — simulated latency, date-range filter drawer, grouping by status, bulk refund/cancel, and export.",
  },
  table: {
    title: "Table",
    description:
      "Semantic HTML table — 4 variants, 3 row styles, 3 sizes, density, sortable headers, sticky header/columns, selection, and full RTL.",
  },
  flag: {
    title: "Flag",
    description:
      "271 country flags vendored from flag-icons (MIT) — tree-shakable named components plus a dynamic <Flag code>. Includes sub-regions like gb-eng and es-ct.",
  },
  "phone-input": {
    title: "Phone Input",
    description:
      "Tel input with country picker, dial-code prefix, format-as-you-type, Persian/Arabic digit normalization, full ARIA, and autofill hints — composed on top of <Input> + <Combobox>.",
  },
  "language-picker": {
    title: "Language Picker",
    description:
      "Locale selector with flag · native · English display. 240 languages with curated BCP-47 → flag mapping for accurate header switchers.",
  },
  "bottom-nav": {
    title: "Bottom Navigation",
    description:
      "Mobile-first tab bar — material / iOS / floating / underline variants, centre FAB, badges, safe-area insets, auto-hide on scroll, and an animated sliding indicator. All CSS-variable driven with full RTL.",
  },
  pagination: {
    title: "Pagination",
    description:
      "Headless, controlled pagination — compound parts (Root / Info / PageSize / Prev / Pages / Next) with ellipsis windowing, three sizes, RTL-aware chevrons, and a drop-in adapter for DataTable.",
  },
  form: {
    title: "Form",
    description:
      "react-hook-form + zod wrapper — Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage. Auto-wires id + aria-describedby + aria-invalid across any input in the system.",
  },
  "file-upload": {
    title: "File Upload",
    description:
      "Compound dropzone + file list built on react-dropzone — drag/drop, click-to-browse, image previews with URL cleanup, per-item progress, validation (MIME / size / count), and Controller-friendly for react-form.",
  },
  command: {
    title: "Command Palette",
    description:
      "cmdk wrapper — inline palette or Cmd+K dialog, grouped results, keyboard shortcuts rendered via Kbd, async search, and full RTL. Bundles the useHotkey hook from @virtari-packages/utils.",
  },
  "empty-state": {
    title: "Empty State",
    description:
      "Zero-data messaging pattern — icon, title, description, and actions slots. Two orientations, three sizes, fully composable.",
  },
  fieldset: {
    title: "Fieldset",
    description:
      "Semantic form section grouping — native <fieldset> + <legend> with token-driven border, invalid and disabled cascade states.",
  },
  stepper: {
    title: "Stepper",
    description:
      "Multi-step progress indicator with variants, semantic tones, connector styles, and motion presets.",
  },
  timeline: {
    title: "Timeline",
    description:
      "Sequential event display — compound indicator, connector, content, and time slots. Grid-based layout with status colors and RTL support.",
  },
  flow: {
    title: "React Flow",
    description:
      "Workflow builder primitives â€” token-aware React Flow surface, custom node shell, layered layout helpers, labeled edges, and save/restore utilities.",
  },
  "segmented-control": {
    title: "Segmented Control",
    description:
      "Standalone toggle button group — radio semantics, three sizes, full-width option, icon support, and keyboard navigation.",
  },
  "tag-input": {
    title: "Tag Input",
    description:
      "Multi-value text input — Enter or comma to add, Backspace to remove, paste splitting, max-tags limit, custom validation, and chip rendering.",
  },
  code: {
    title: "Code",
    description:
      "Read-only code, a live editor, and inline snippets with shared syntax colors, line highlighting, diff cues, and clipboard feedback.",
  },
  carousel: {
    title: "Carousel",
    description:
      "Swiper.js wrapped with Virtari tokens — 7 colors, 5 nav variants, 4 sizes, navigation, pagination (bullets / bars / fraction / progressbar), autoplay, scrollbar, lazy, zoom, parallax, thumbs, virtual, grid, effects (fade / cube / coverflow / flip / cards / creative), full RTL, and reduced-motion safe.",
  },
};
