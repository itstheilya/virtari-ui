# Nested surfaces and radius roles

Radius modes are scoped: sharp, soft, round and pill recompute semantic aliases at every data-radius boundary. An explicit soft container resets a surrounding sharp or pill theme. Field shells retain finite radii; pill mode rounds action affordances without making multiline fields capsule-shaped.

Default Card appearance consumes --vds-surface-bg, --vds-surface-border and --vds-surface-shadow. Nested default surfaces use a higher tonal background, with another step for deeper nesting. Explicit outline, soft and ghost variants retain their own appearances.

A Card inside another Card automatically receives a radius budget from its nearest containing Card. The budget is the parent's smallest corner radius minus the nearest actual layout edge inset, floored at the mode’s smallest shape role (xs), capped by the parent’s actual radius; the child's own mode radius remains a cap. Generous padding therefore retains a small soft corner instead of making nested surfaces unexpectedly square. This produces a uniform nested shape through CardContent slots and ordinary layout wrappers. It is not a promise that all four arcs are mathematically concentric when the layout uses unequal insets. Use the existing flush/inset channels for exact edge-specific leaf geometry.

Nested Cards use shared resize and filtered ancestor-attribute observers. Root Cards create no subscriptions. The observer uses layout offsets rather than transformed screen rectangles, so a hover scale or translation cannot distort the radius. It writes only when the value changes and does not run on scroll or pointer movement. Direct borderRadius styles remain an explicit escape hatch; the --card-radius token sets a cap within automatic nesting.

The generic radius-host channels are deliberately not made recursively self-referential. An inner host declaring its own host-r cannot simultaneously use an inset expression calculated from that same property without creating a cycle.

Open /tests/card-radius.html in the docs development server for 36 regression checks: all four modes, recursion, slots, layout wrappers, explicit overrides, live mode/padding changes, transform stability, and no radius override on root Cards.
