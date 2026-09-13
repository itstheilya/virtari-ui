# @virtari-packages/primitives

## 1.1.0

### Minor Changes

- 800f0f5: Align segmented tracks with field radius roles, distinguish Round from Soft controls, and keep keycaps and small checkboxes appropriately bounded. Resolve nested Flow modes, clamp Editor radius subtraction and use a semantic TimeWheel role.

  Keep tab and segment indicators concentric with their tracks, bound vertical pill tracks, adapt boxed corners to radius modes, and honor explicit/provider/ancestor direction. Publish the styles required by standalone SegmentedControl consumers.

  Add shared platform-aware shortcut formatting and KbdShortcut. Match Windows/Linux Control and Apple Command labels with actual key bindings and ARIA metadata. Ignore handled, composing and repeated hotkey events by default; repeated activation can be opted into.

  Restore the actual opener's focus when a controlled CommandDialog closes, including an input that opened it with a shortcut. Preserve consumer autofocus callbacks and overrides.

### Patch Changes

- f2badbc: Add static package code rendering, accessible clipboard feedback and shared rendered-field metadata. Improve semantic text contrast, control composition, native form reset, keyboard behavior, nested surfaces and containment in reviewed packages.

  Center control text with shared browser font metrics and separate icon/text slots; preserve ordinary line-box fallback where text-box trimming is unsupported.

- 9b5353a: Establish the Virtari design language with tonal surface roles, purpose-based shape and spacing tokens, and consistent control typography. Remove global optical nudges, allow enlarged text to fit, and standardize logical icon slots across form controls. Existing component APIs and theme modes remain available; defaults intentionally change visually. InputIcon gains an optional logical side.
