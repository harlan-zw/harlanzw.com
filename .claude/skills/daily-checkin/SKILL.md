---
name: daily-checkin
description: Check production content, the homepage, and unresolved Sentry issues for harlanzw.com.
---

Before running `pnpm checkin`, load the private agent credentials:

```sh
set -a
. "$HOME/.config/harlan-checkin/harlanzw.com.env"
set +a
```

Load `SENTRY_AUTH_TOKEN` from the repository environment.
Set `CHECKIN_DEPLOYMENT` from the active Worker deployment evidence.
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

The module discovers external checks in `checks/external` during preparation.
Keep required external IDs in `shared/checkin-external.ts`.
