---
name: harlanzw.com
description: Reference faithful personal site with neutral surfaces, compact system type, and emerald accents
colors:
  primary: "#047857"
  neutral: "#18181b"
  accent: "#34d399"
typography:
  display:
    fontFamily: System UI
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: System UI
    fontSize: 1rem
    lineHeight: 1.75
  mono:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
rounded:
  sm: 6px
  md: 8px
  lg: 12px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "#065f46"
  card-default:
    backgroundColor: "{colors.neutral}"
    textColor: "#f4f4f5"
    rounded: "{rounded.sm}"
    padding: 16px
---

# Design: harlanzw.com

## Aesthetic Direction

- **Theme**: Legacy parity, updated on Nuxt UI primitives with light and dark modes
- **Mode**: Both
- **Vibe**: Personal, technical, airy, understated
- **Influences**: The production site’s neutral canvas, compact type, and emerald identity
- **Design principle**: We prioritize readable technical content over decorative impact.
- **Personality of motion**: Calm and responsive, 180 to 300ms ease out, with reduced motion respected.

## Color Decisions

| Role | Value | Why |
|------|-------|-----|
| Primary | `#047857` | Emerald preserves the site identity and gives white text AA contrast. |
| Neutral | `#18181b` | Tinted zinc keeps dark surfaces soft and legible. |
| Accent | `#34d399` | A brighter emerald supports hover and glow without competing with prose. |

- **Neutral tinting**: Surfaces stay neutral. Emerald is reserved for links, active states, and the logo.
- **60, 30, 10 split**: Neutral surfaces dominate, text and borders structure content, emerald is reserved for links and emphasis.

### Contrast and Accessibility

- **Body text contrast**: Semantic foreground values target at least WCAG AA against default surfaces.
- **Dark mode adjustments**: Dark surfaces use tinted charcoal, never pure black; muted text stays above AA for normal copy.
- **Known risks**: Dynamic Markdown content needs browser review for legacy inline colors.

## Typography

| Role | Font | Why |
|------|------|-----|
| Body | System UI | Matches the production reference and avoids an unnecessary web font request. |
| Display | System UI | Keeps the compact, familiar production hierarchy. |
| Mono | JetBrains Mono | Clear code punctuation and compact technical texture. |

- **Type system**: Compact 36px page headings with fixed rem body copy.
- **OpenType features**: Default features; tabular numerals where metrics appear.

## Icons

- **Collection**: Existing Iconify collections, rendered through Nuxt Icon.
- **Why**: Content already carries meaningful ecosystem icons that should survive the migration.
- **Color rule**: Icons inherit text color except meaningful brand marks.

## Component Rules

- Buttons use Nuxt UI variants and keep a 44px minimum tap target.
- Cards use subtle semantic backgrounds, one pixel borders, and small radii.
- Radius follows Nuxt UI’s semantic radius override.
- Focus states remain visible on every interactive element.
- Content errors explain what failed and retain a working navigation path.

## Spatial and Motion

- **Spacing system**: 4px base with 8, 16, 24, 32, and 48px steps.
- **Spacing philosophy**: Header spans 90rem. Page content and footer use a 72rem shell, with prose narrowed further.
- **Transition speed**: 180 to 300ms with ease out.
- **Animation style**: Subtle opacity and position changes; the experimental canvas keeps its intentional continuous motion.
- **Reduced motion**: Page movement is removed and the experiment pauses automatic animation.

## Responsive Strategy

- **Approach**: Mobile first at 375px, then 768px and wide desktop layouts.
- **Input method**: Interactive targets remain at least 44px; hover is supplementary.
- **Navigation adaptation**: Links wrap cleanly on small screens and remain horizontal when space allows.

## Voice and Tone

- **Button labels**: Direct verb phrases such as “Open project” and “Copy link”.
- **Error style**: State the failed resource, then offer a retry or direct source link.
- **Empty states**: Explain why content is absent and provide a useful next action.

## Avoid

- Purple or blue gradients that replace the existing emerald identity.
- Green tinted page canvases or oversized display type.
- Pure black page backgrounds.
- Decorative sections without real content.
- Colorful icon mixtures without semantic meaning.
- Continuous spatial motion when reduced motion is requested.
- Layout widths that force horizontal scrolling at 375px.

## Custom Utilities

| Class or token | What it does | When to use |
|----------------|--------------|-------------|
| `.page-shell` | Intrinsic 90rem centered content shell | Shared header, footer, and wide content pages |
| `.content-shell` | Intrinsic 72rem centered content shell | Page content and footer |
