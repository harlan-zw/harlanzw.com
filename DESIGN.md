---
name: harlanzw.com
description: Technical editorial personal site with tinted neutral surfaces, Overused Grotesk, and restrained emerald accents
colors:
  primary: "#047857"
  neutral: "#18181b"
  accent: "#34d399"
typography:
  display:
    fontFamily: Overused Grotesk
    fontSize: 3rem
    fontWeight: 700
    lineHeight: "1.08"
  body:
    fontFamily: Overused Grotesk
    fontSize: 1rem
    lineHeight: "1.6"
  mono:
    fontFamily: Commit Mono
    fontSize: 0.875rem
rounded:
  sm: 4px
  md: 6px
  lg: 8px
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
  focus-ring:
    backgroundColor: "{colors.accent}"
    width: 3px
  card-default:
    backgroundColor: "{colors.neutral}"
    textColor: "#f4f4f5"
    rounded: "{rounded.lg}"
    padding: 20px
---

# Design: harlanzw.com

## Aesthetic Direction

- **Theme**: Technical editorial with Nuxt UI primitives
- **Mode**: Light and dark
- **Vibe**: Personal, precise, airy, and understated
- **Influences**: Developer documentation, independent publishing, and the
  existing emerald identity
- **Design principle**: We prioritize readable technical content over
  decorative impact.
- **Motion**: Calm feedback between 100ms and 300ms, with reduced motion respected.

## Color Decisions

| Role | Value | Purpose |
| ------ | ------- | --------- |
| Primary | `#047857` | Links, focus, active navigation, and primary actions |
| Neutral | `#18181b` | Tinted dark surfaces and the neutral scale |
| Accent | `#34d399` | Dark mode emphasis and restrained highlights |

- Neutral surfaces dominate every page.
- Emerald identifies interaction and emphasis.
- Large surfaces avoid pure black and green tinting.
- Semantic `--ui-*` tokens control every shared surface.

### Contrast and Accessibility

- Normal text targets WCAG AA in both color modes.
- Small text never falls below 14px.
- Body copy starts at 16px.
- Controls provide at least a 44px target.
- Focus indicators use the primary token and remain visible.
- Status uses text or icons with color.

## Typography

| Role | Font | Purpose |
| ------ | ------ | --------- |
| Display | Overused Grotesk | Compact, expressive page hierarchy |
| Body | Overused Grotesk | Familiar technical reading texture |
| Mono | Commit Mono | Code, status values, and technical metadata |

- Page titles use a tight display rhythm and balanced wrapping.
- Prose uses a 72 character measure and 1.75 line height.
- Body paragraphs use improved wrapping as progressive enhancement.
- Uppercase labels use 14px type and restrained tracking.
- Code disables decorative type behavior through the mono family.

## Icons

- Nuxt Icon renders interface and ecosystem icons.
- Lucide supplies interface actions.
- Brand collections supply product marks.
- Icons inherit text color unless brand identity requires color.
- Decorative icons stay outside the accessible reading order.

## Component Rules

- Buttons use Nuxt UI variants and visible primary backgrounds.
- Every button provides press feedback within 150ms.
- Dropdowns scale from their trigger origin.
- Project cards use borders, quiet elevation, and transform-only hover
  motion.
- Blog entries use divided rows instead of boxed cards.
- Alerts explain the state and remove empty dependent sections.
- Inline links use underlines or borders with visible focus.
- Loading states match the final content shape.

## Spatial and Motion

- The spacing scale uses 4, 8, 12, 16, 24, 32, 48, 64, and 96px.
- The header uses a 90rem page shell.
- General content uses a 72rem content shell.
- Technical prose narrows to 72 characters.
- Frequent interactions finish within 150ms.
- Page entrance motion finishes within 300ms.
- Spatial motion only changes transform and opacity.
- Reduced motion removes spatial transitions.

## Responsive Strategy

- Layouts start at 375px and add structure when content allows.
- Header navigation becomes a menu below 768px.
- Project cards use intrinsic grid tracks.
- Blog columns split only when both columns remain readable.
- Talks use one column on mobile and two groups on desktop.
- Safe area padding protects the footer on mobile devices.
- No route may create horizontal page overflow.

## Voice and Tone

- Labels use direct, familiar words.
- Errors name the unavailable resource and explain the cause.
- Empty states hide headings that would introduce absent content.
- Interface copy stays concise and technical.

## Avoid

- Purple or blue hero gradients
- Green page canvases
- Pure black page backgrounds
- Decorative sections without real content
- Nested cards
- Layout changing hover effects
- Motion that ignores reduced motion
- Text below 14px
- Horizontal scrolling at 375px

## Design Decisions

- Home uses a modest vertical inset. Remaining space follows the flexible
  page shell.
- Blog entries use stable divided rows. Hover never starts a text marquee.
- Project categories create hierarchy. Cards remain equal because every
  project is actionable.
- Sponsors hide empty groups when data is unavailable.
- Talks become parallel groups on desktop and a single sequence on mobile.
- The experimental route keeps its isolated dark canvas and embedded rendering palette.
- The Open Graph image uses fixed raster dimensions with zinc and emerald
  palette tokens.

## Custom Utilities

| Class | Purpose | Use |
| ------- | --------- | ----- |
| `.page-shell` | Centers content within 90rem | Header and wide site chrome |
| `.content-shell` | Centers content within 72rem | Main content and footer |
| `.skip-link` | Reveals keyboard navigation on focus | Before header |
| `.talk-directory` | Aligns talk groups responsively | Talks container |
