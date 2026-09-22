---
scope: every user-facing string: the home page, blog and project copy, meta tags, feed metadata, social cards, error and fallback states
owns: the words. DESIGN.md owns the visual system and defers voice to this file; VISION.md would own what may be claimed, and this repository has none
---

# Copy

The canonical source for this site's verbal identity. Pages, meta tags and feed metadata pull
from here; when a canonical string changes, change it in `shared/site.ts` or the page's front
matter and record it here. A string that contradicts this file is a bug, the same as a hex value
that bypasses a token.

This is a personal site, so the voice is one person's, not a company's. That makes the register
table shorter than a product's and the canonical assets more important, because the same
sentence describes the same person in four places.

## Canonical assets

These exact strings. Do not paraphrase them per page.

| Asset | String | Where it goes |
| --- | --- | --- |
| Name | `Harlan Wilton` | everywhere. Never Harlan Zw, harlan-zw outside a handle or repository path |
| Tagline | Open Source Developer | `shared/site.ts` `tagline`, the home page `title`, the OG image title |
| Site description | Open source developer, contributing to the Vue, Nuxt, and Vite ecosystems. | `shared/site.ts` `description`, which feeds the site-wide `<meta name="description">` and the feeds |
| Home description | Independently funded open-source developer at Nuxt & UnJS. | the home page `description` and its OG image description, which must match each other exactly |

**Two descriptions, on purpose.** The site description is the ambient one a search result shows
for any page. The home description is the sharper claim the home page and its social card make.
They are allowed to differ; they are not allowed to drift within themselves, which is what the
OG image did. See Open questions.

**The home page body is a third form and is not drift.** It reads "Independently funded
open-source at Nuxt & UnJS" because Nuxt and UnJS are links carrying their own logos, so the
sentence is built from components rather than written as a string. Same claim, different
surface. Do not rewrite it to match the meta description, and do not copy its shorter wording
back into a plain-text field.

**Hyphenation.** `open-source` when it modifies a noun ("open-source developer"), `open source`
when it is the noun ("contributing to open source"). The tagline is title case and takes no
hyphen.

**Spelling.** Prose uses Australian spelling; the blog posts already do. Interface chrome uses
the American spelling where it mirrors an API name, which is why the switch label is "Toggle
color mode" and not "colour". Do not unify them without reading the Open questions entry.

## Register by context

| Context | Register | Example |
| --- | --- | --- |
| Home and page headings | Declarative, no hedging | "Open Source Developer" |
| Meta and feed descriptions | One sentence, states the claim | "Independently funded open-source developer at Nuxt & UnJS." |
| Errors and degraded states | Name the resource, then the cause | "Project metadata unavailable" / "The GitHub metadata service could not be reached." |
| Partial failure | Say what still works, with the count | "Some GitHub metadata is unavailable" / "3 projects are showing local fallback details." |
| UI chrome and labels | Direct, familiar words | "Toggle color mode" (`app/utils/color-mode.ts`) |

## Copy principles

These are the four rules `DESIGN.md` used to carry, plus what the code already does.

1. **Name the unavailable resource.** An error says what is missing and why. "Something went
   wrong" names nothing and is the fallback of last resort, never a written string.
2. **A degraded state says what still works.** Partial failure is not failure. Give the count and
   what the reader still gets.
3. **An empty state hides the heading that would introduce absent content.** Do not render
   "Sponsors" above nothing.
4. **Interface copy stays concise and technical.** The reader is a developer. Say the thing.
5. **Write the claim, not the hedge.** This is a personal site and the first person is available.
   Use it rather than describing yourself in the abstract.

## Banned language

Harlan's global writing rules already apply here and are not repeated: no em dashes, never the
"it's not X, it's Y" pattern, Simplified Technical English in error and interface copy. See
`~/.claude/CLAUDE.md`.

| Never | Use instead | Why |
| --- | --- | --- |
| Something went wrong | name the resource and the cause | It tells the reader nothing they can act on, and principle 1 exists to prevent it |
| passionate, journey, excited to share | state what was built | Personal-brand filler; the work is the claim |
| Harlan Zw | Harlan Wilton | `harlan-zw` is a handle and a repository path, never a name in prose |

## Open questions

Wording calls this file does not settle. Add one here, resolve it, fold the answer into the
section above, then delete it from this list.

1. **Australian prose, American chrome.** Blog posts write "colour"; the colour-mode switch
   label writes "color", following `colorMode` and the CSS property. That split is defensible and
   nobody has decided it. Either ratify it as the rule above states it, or pick one spelling and
   change the label.
2. **The site description and the home description name different ecosystems.** One says "the
   Vue, Nuxt, and Vite ecosystems", the other "Nuxt & UnJS". Both are true and they point at
   different things. Decide whether the ambient description should match the sharper one, or
   whether the broader list is deliberate for search results. Until then both stay recorded
   above, and neither may be paraphrased.
