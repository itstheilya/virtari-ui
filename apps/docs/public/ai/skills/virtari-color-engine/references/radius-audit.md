# Radius and shortcut audit — 2026-09-06

The previous implementation was not fully consistent. This audit inspected radius references across 753 package CSS/TS/TSX files, then exercised the affected geometry in the browser. Every referenced `--vds-radius-*` name has a definition. Defined tokens alone do not prove that a component uses the correct role, so the fixes below address actual rendered behavior.

## Virtari shape contract

These values are Virtari brand decisions, not universal accessibility requirements. Values below assume a 16px root font; finite rem-based roles follow root font sizing.

| Role | Sharp | Soft | Round | Pill |
| --- | ---: | ---: | ---: | ---: |
| Input, Select, Textarea | 2px | 12px | 16px | 16px |
| Horizontal segmented track | 2px | 12px | 16px | Capsule |
| Vertical segmented track | 2px | 12px | 16px | 16px |
| Button / Toggle | 4px | 20px | 24px | Capsule |
| Kbd keycap | 0px | 4px | 6px | 6px |
| Card / small surface | 4px | 20px | 24px | 24px |
| Dialog / Drawer | 4px | 28px | 32px | 32px |

CSS normalizes oversized corner radii against the element's actual dimensions; a short button can therefore look like a capsule even when its specified radius is finite. A checkbox is further capped at one quarter of its own size so a small checkbox cannot turn into a circle. Explicit pill variants, avatars, radios and slider handles intentionally retain capsule/circular geometry.

A shared language does not mean identical radii everywhere. Controls, actions, compact keycaps and surfaces have separate roles. Closely inset segments subtract track padding and border from their parent's corner. Nested Cards account for actual parent radius, intervening inset and an explicit minimum shape; independently spaced controls retain their own role. Underline tabs remain flat, boxed tabs have attached corners, and pill tabs are explicitly capsules.

## Concrete corrections

- Segmented tracks previously used an 8px cap unrelated to the 12px field role. They now share the control role; indicators and triggers agree on the inner corner. Vertical pill tracks remain finite to avoid tall capsules around short options.
- Boxed tabs had a fixed 0.5rem corner, bypassing Sharp mode. They now use a mode-aware capped role.
- Round fields were identical to Soft fields. Round now uses the next finite control step, 16px.
- Keycaps used the larger compact-action role. They now keep a smaller 4px Soft / 6px Round cap.
- Small checkboxes could become visually circular. Their radius now accounts for actual checkbox size.
- ReactFlow root-only aliases failed to follow a nested radius mode. Aliases now resolve at each mode boundary.
- Editor radius subtraction could become negative in Sharp mode. Each subtraction clamps at zero.
- TimeWheel used a fixed primitive radius. It now follows the date-control role.
- SegmentedControl now includes the Tabs styles it uses when imported independently.
- Tabs and SegmentedControl preserve explicit direction and DirectionProvider precedence while inheriting a live DOM ancestor direction when neither is supplied.
- Search used a hardcoded Mac glyph on Windows. Shortcut rendering and matching now use shared platform logic. `mod+k` is Control+K on Windows/Linux and Command+K on Apple platforms. The command demo has its own shortcut so it cannot compete with global search.
- Controlled CommandDialog had no primitive trigger to restore focus to. It now captures the actual opener and restores focus and caret after closing, while honoring consumer autofocus overrides.
- Sizing documentation no longer labels a component WCAG-compliant solely from its height.

## Verification

Browser fixtures are in `apps/docs/tests`:

- `radius-system.html`: rendered role values, checkbox shape, light/dark/OLED and bordered/tonal/elevated stability, nested mode resets, live mode switching, three sizes and LTR/RTL.
- `tabs-radius.html`: tab variants, segmented controls, indicator/trigger geometry, horizontal/vertical layouts, size ramps, nested and explicit direction behavior.
- `radius-secondary.html`: 128 assertions for Flow, TimeWheel and valid nonnegative Editor geometry across all 16 nested mode combinations.
- `platform-shortcuts.html`: platform formatting, shortcut metadata and matching, handler guards and keycap composition.
- `command-focus.html`: controlled command dialog focus and caret restoration and consumer autofocus overrides.
- Existing `card-radius.html`: actual nested inset, wrappers, explicit overrides, resize and transform stability.

These are source and Chromium checks, not a certification of every possible consumer composition, browser, screen reader or font. Native Safari and real macOS keyboard behavior remain separate device checks; Apple modifier selection is exercised through simulated platform inputs. Custom per-component radius overrides intentionally supersede the defaults.

## Reference principles

- [Material shape roles](https://github.com/material-components/material-components-android/blob/master/docs/theming/Shape.md): ordered shape roles allow customization while maintaining relative hierarchy.
- [W3C tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): tabs represent panels and carry keyboard/focus conventions; radio choices use their own semantics even when their appearance is shared.
- [MDN aria-keyshortcuts](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-keyshortcuts): shortcut metadata uses Control/Meta names and does not implement the shortcut by itself.
- [W3C target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): evaluate the complete target geometry and applicable exceptions, not a height token alone.
