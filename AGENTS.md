# harlanzw.com

Personal site and writing archive. Nuxt 4 on `compatibilityVersion: 5`, content-driven
through Comark, deployed as two Cloudflare Workers.

## Read first

- [`DESIGN.md`](DESIGN.md) — the visual filter. Tokens, shells, motion budgets, and an Avoid list. Read before any UI work.
- [`COPY.md`](COPY.md) — the verbal filter. The canonical strings, the register per context, and the banned language. Read before any user-visible string.
- [`README.md`](README.md) — what this is and how to run it.
- `docs/runbooks/` — operational procedures. Present tense, no status.
- [`docs/work/`](docs/work/README.md) — open briefs, one `EXECUTE-*.md` per initiative. `ls docs/work/` shows everything unfinished. The contract is in its README.

New Markdown at the repository root is an error. Identity and filters only.

## Rules

- **Two Workers ship this site.** `wrangler.jsonc` is the app, `wrangler.www.jsonc` is the
  `www` redirect. `pnpm deploy` builds once and deploys both. Deploying only the app leaves
  the redirect on an older build.
- **Content is the source of pages.** `app/pages/[...all].vue` renders everything from
  `content/`, where the numeric filename prefix sets order. Adding a production route means
  adding content, not a page component. `experimental.vue` is the one exception: an isolated
  canvas prototype with its own dark palette, and not a template for production routes.
- **`ssrStreaming` and Nuxt 5 compatibility are on ahead of the Nuxt 5 release.** A rendering
  bug here may be the compat flag, not the code. Check against `compatibilityVersion: 4`
  before blaming a component.
- **Sentry sends no personal fields.** `nuxtSentry.dataCollection: 'none'`. Never widen it to
  add debugging context.
- **Social links and site identity live in `shared/site.ts`.** Change them there, not per page.

## Traps

- **A check the check-in must never skip needs two edits.** Add the handler under
  `server/checks/`, then add its id to `REQUIRED_CHECKS` in `shared/checkin.ts`. A handler
  missing from that list can go absent and the run still reports full coverage.
- **`pnpm checkin` needs two tokens.** `CHECKIN_TOKEN` for the endpoint and
  `SENTRY_AUTH_TOKEN` with read access. Procedure: `docs/runbooks/checkin.md`.
- **Nitro build warnings are filtered, not silenced.** `isExpectedNitroBuildWarning` in
  `build/warnings.ts` drops the known ones so a real warning stays visible. Add a genuinely
  expected warning there rather than widening a `code` match.

## Consumers

- The `daily-checkin` Skill reads this site's check-in endpoint. A change to check ids or to
  the report shape changes what that Skill reports.
