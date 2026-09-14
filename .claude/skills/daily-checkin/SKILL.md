---
name: daily-checkin
description: Check production content, the homepage, and unresolved Sentry issues for harlanzw.com.
---

Run `node scripts/checkin.mjs` from this checkout.
Load `CHECKIN_TOKEN`, `CHECKIN_DEPLOYMENT`, and `SENTRY_AUTH_TOKEN` from the repository environment.
Use the expected production deployment SHA from deployment evidence, not the local branch HEAD.
Never print tokens. Never send email or change provider state during collection.

Read both `severity` and `coverage` in the report.
Missing credentials, failed reads, stale reports, and missing checks require follow-up. They never establish health.
Report collection cost and every unavailable check. Preserve failures when coverage is incomplete.

For unresolved Sentry issues, follow the installed `sentry-checkin` skill's triage and repair procedure.
Inspect all returned issue IDs. Keep existing expected-error policy and verify repairs through pull requests.
Do not resolve issues merely because a check completed.

Add site checks in `server/checks/*.ts` using the public check-in API.
Maintain required IDs independently in `shared/checkin.ts`.
Keep provider administration credentials in this external runner.
