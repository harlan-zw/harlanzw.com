---
title: "Optimizing your development workflow with AI"
description: "What I changed when AI agents wrote broken code, shared the same files, and produced more pull requests than I could review."
publishedAt: '2026-09-11'
status: unlisted
aside: false
tags:
  - ai
  - development
newsletter: false
---

I use AI heavily across my open-source projects and Nuxt SEO Pro. For a while, my workflow was pretty simple. Give an agent a task, let it work on main, commit everything and push.

Fast. Also a good way to send bugs to people using your product.

I knew pull requests would help. But adopting them brought more work: separate environments, conflicts, reviews I had to remember to start, and CI that couldn't keep up.

Every improvement let the agents do more. Then something else became the problem.

It's tempting to look at someone running a room full of agents and start there. I've ended up [building my own software factory on GitHub](/blog/building-my-software-factory-on-github), but most of the useful changes happened before that.

They came from three questions.

## Can I trust my agent's code?

On 28 August I merged an agent-written Stripe integration into Nuxt SEO. It touched 23 files. The checks were green and the description said the agent had implemented and verified it.

I merged it without reading the code.

:ArticleFigure{src="/blog/ai-workflow/stripe-pr.webp" display-width="760" alt="Merged Stripe integration PR 636, showing 23 changed files and the agent disclosure" caption="The PR I merged on 28 August. The payment failure below is a separate teaching example." width="1792" height="1492"}

The description looked convincing. Checking every claim would have taken me longer than the agent spent writing it.

### Where did the error go?

One recurring problem was silent error handling. An older version of my admin code turned a failed Stripe balance request into `null`:

```ts
const balance = await stripe.balance.retrieve()
  .catch(() => null)
```

The request failed, but the cause disappeared. Whatever happened next had to work with `null`.

Take this simplified payment handler:

```ts
try {
  await stripe.paymentIntents.confirm(paymentIntentId)
}
catch {
  // Payment failed, let the user try again.
}
```

This is an illustration, not the code from that merged PR. The comment sounds reasonable. It doesn't tell the caller what failed or leave anything useful to investigate.

There is another detail hiding in this tiny example. A resolved confirmation request can still require customer authentication. The caller needs to inspect the PaymentIntent status. [Stripe's confirmation documentation](https://docs.stripe.com/api/payment_intents/confirm) describes those transitions.

I started by writing down a standing rule: no silent catches. Expected failures should have an explicit result. Unexpected failures should propagate or be reported with enough context to investigate.

The next agent could still write the same bad code.

So I added a lint rule. It catches shapes like `.catch(() => null)` and empty catch blocks. A hook runs lint after edits so the agent gets feedback while it is still working.

The limits matter here. My rule allows comment-only catches, including the illustrated one above. It can reject a code pattern. It can't decide whether a payment failure reached the right person.

### Give failure a shape

My TypeScript preferences borrow from Effect, without requiring Effect as a dependency. Expected failures become tagged values that the caller must handle. Unexpected infrastructure failures remain errors.

For a payment, that means distinguishing a card decline from a service failure. The caller needs to know whether to ask the customer for another payment method or report a problem.

Here is the same handler with explicit results for a declined card and a rate limit.

:::ArticleDisclosure{summary="Show the complete error handling"}

Illustrative excerpt. The request-bound logger, Stripe client and result helpers are set up outside this block.
The PaymentIntent already exists with its payment method configured. A returned payment still needs its status handled.

::expand{width="960"}

```ts
try {
  const payment = await stripe.paymentIntents.confirm(paymentIntentId)
  // The caller must still check the returned payment status.
  // A successful request can require customer authentication.
  log.context({ paymentStatus: payment.status })
  return ok(payment)
}
catch (error) {
  log.level('error')
  log.context({ paymentStatus: 'failed' })
  // A declined card becomes a result the caller can handle.
  if (error instanceof Stripe.errors.StripeCardError) {
    log.warn('payment.declined', error)
    return err({ _tag: 'PaymentDeclined' as const, code: error.code })
  }
  // Keep retry information when Stripe provides it.
  if (error instanceof Stripe.errors.StripeRateLimitError) {
    log.warn('payment.rate_limited', error)
    return err({ _tag: 'RateLimited' as const, retryAfter: error.headers?.['retry-after'] })
  }
  // Record unexpected failures, then let them propagate.
  log.error('payment.failed', error)
  throw error
}
```

::

:::

I want sensitive fields redacted before errors leave the application. Nuxt SEO has shared logging rules for names, redaction and where events go. That gives each handler something consistent to use.

Then there is production. Sentry can surface an exception, but some broken journeys never throw. A user may retry several times and give up.

Logs and usage signals can help find those cases. A drop in completed payments is a reason to investigate. It doesn't tell you whether the cause is a bug, confusing UI or something else.

By this point, fixing a catch had taken me from an instruction file to production monitoring.

### More tests didn't give me more confidence

Agents are very happy to write tests. Some of mine checked that a file contained a string, or that the source had the structure the agent had just written.

Those tests gave me more code to maintain. They didn't tell me much about whether the feature worked.

My testing skill now asks for concrete input, a call to an exported function, and an observable result. For a bug fix, I want to see the test fail before the fix.

I also use gitignored scratch tests. An agent can write a probe to understand a problem, run it, then throw it away. If it captures behaviour that needs protecting, it belongs in the maintained suite.

A rank-check bug in Nuxt SEO made that distinction painfully concrete. The data provider's spending limit stopped a request. My code treated the missing result as a missing ranking and emailed a customer about a drop that hadn't been measured.

This regression test starts with a keyword at position 21. When the fetch returns nothing, the saved position must stay at 21. This is an excerpt from the test, with its fixture helpers left out:

```ts
const db = await seed(21)

const outcome = await recordRankCheck(db, {
  keywordId: KEYWORD,
  siteUrl: 'https://ranknm.example',
  competitorDomains: [],
  fetchSerp: async () => undefined,
  now: NOW,
})

expect(outcome).toEqual({ _tag: 'not_measured' })
expect(await snapshots(db)).toEqual([
  { day: '2026-08-27', position: 21 },
])
```

Checking for a string in the source wouldn't have caught that email. This test checks what the application writes.

## Do my agents work effectively in parallel?

Asking four agents to work at once is easy. Giving them four usable environments took more effort.

A branch alone doesn't give an agent a separate directory. A worktree does. Each task gets its own checkout, while the primary checkout stays clean on main.

:ArticleFigure{src="/blog/ai-workflow/original-worktrees.webp" display-width="1100" alt="Worktree diagram showing four agents, shared package files and private task state" caption="Each agent gets a checkout and private task state. Branches and preview names are illustrative." width="1808" height="649"}

I use [Worktrunk](https://github.com/max-sixty/worktrunk) to manage that setup. Before a task starts, the checkout needs its dependencies, local configuration and writable state ready.

For example, I can start a task from the current main branch like this:

```sh
wt switch --create fix/payment-errors --base origin/main
pnpm install --frozen-lockfile
pnpm exec nuxt prepare
```

Worktrunk creates the checkout. The next two commands prepare that checkout's dependencies and Nuxt files. Project-specific setup still has to provide local configuration and a private database.

Otherwise, the agent spends the first part of the task fixing its environment. Sometimes it changes application code to compensate for an environment that was wrong to begin with.

### Share the package store

The useful distinction is between sharing package files and sharing an installed application.

[pnpm's package layout](https://pnpm.io/symlinked-node-modules-structure) lets worktrees share package data while keeping a separate dependency graph in each checkout. Each task gets its own `node_modules`. Nuxt generates `.nuxt` inside that task's checkout too, because generated files can contain paths specific to it.

Local databases need their own writable state. Sharing a database between two tasks makes it much harder to know what either agent actually tested.

There are less interesting details that still make a difference. I use [Portless](https://github.com/vercel-labs/portless) for stable local preview names, and named browser pages for each task. I also built a JetBrains worktree plugin so I could see the checkouts in my IDE.

I needed the separate checkouts to be easy to find, otherwise I'd work around the setup.

:ArticleFigure{src="/blog/ai-workflow/worktree-ide.webp" display-width="700" alt="JetBrains worktree panel listing task branches and their latest activity" caption="My JetBrains worktree panel. The 86 entries are worktrees, not concurrent agents." width="1282" height="1042"}

### Separate checkouts still meet at the same files

Worktrees didn't fix my architecture.

Independent features still passed through shared configuration and registration points. Two tasks could work perfectly well in isolation, then arrive with competing edits to the same block.

I had a real pair of Nuxt SEO PRs that both rewrote the sitemap-failure handling in one crawl job. They needed an explicit landing order and a rebase.

[PR #728](https://github.com/harlan-zw/nuxtseo.com/pull/728) added a retry flag. [PR #733](https://github.com/harlan-zw/nuxtseo.com/pull/733) changed the event name on the same line. These shortened excerpts show the overlap:

::expand{width="1100"}

```diff
# PR #728
- logWarn('crawl_audit.degraded', error, { stage, ...context })
+ logWarn('crawl_audit.degraded', error, { stage, ...context, retryable: sitemap.retryable })

# PR #733
- logWarn('crawl_audit.degraded', error, { stage, ...context, retryable: sitemap.retryable })
+ logWarn('crawl_audit.target_site_refused', error, { stage, ...context, retryable: sitemap.retryable })
```

::

Sometimes that's unavoidable. If it keeps happening, I look at the boundary. Can the feature own its configuration? Can the shared module expose a smaller interface? Are the tasks actually independent?

For related work, stacked PRs can make the dependency explicit. For repeated mechanical edits, I use Ripast to preview and apply structured renames and moves, then check the result. Repeating a more detailed prompt wasn't fixing broken refactors in large Vue files.

The same applies to context. `VISION.md` explains what the product is trying to do. `GLOSSARY.md` keeps the names consistent. `DESIGN.md` gives agents shared UI decisions to follow.

Two agents can use different files and still make incompatible product decisions. Separate directories won't catch that.

## Can I keep up with what they produce?

Eventually the agents could produce work faster than I could land it. You can see the current workload below: agents doing work, PRs still open, and CI jobs running or waiting.

:ArticleLiveStats

Some of the delay was CI. I was paying for repeated setup and waiting for checks on commits I had already replaced.

:ArticleFigure{src="/blog/ai-workflow/original-ci-ideas.webp" display-width="1100" alt="CI diagram showing fast PR checks, cheap checks first, superseded runs and scratch tests" caption="Four ways to reduce CI waiting. A smaller PR gate moves some failure detection until after merge." width="1760" height="560"}

Lint and type checks can reject a change before an expensive build starts. [GitHub Actions concurrency](https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency) can cancel superseded checks for the same PR. A deployment that needs to finish requires a different policy.

For a PR-only validation workflow, this is enough to cancel an older run when a new commit arrives:

```yaml
name: Validate
on: pull_request

concurrency:
  group: validate-${{ github.event.pull_request.number }}
  cancel-in-progress: true

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      # Checkout and install dependencies first.
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build
```

This is a configuration excerpt. Checkout and dependency setup depend on the project. The order means a failed lint step stops the job before the build starts.

A smaller PR gate is also a tradeoff. Moving checks until after merge means some failures reach main before you discover them. I need to know what I'm giving up and how those failures get reported.

Caching needs the same scrutiny. I removed pnpm caching from one CI setup because it was slower there. A shared package store on my machine and downloading an archive on a hosted runner have different costs.

But faster CI only solves part of it. My attention is still finite.

### Make the review worth reading

I want an agent review to try to disprove the change. Check the premise, follow the failure cases, and show what was actually verified.

This review comment shows the actual navigation the agent checked in two layouts. It also leaves a request error visible in one screenshot.

:ArticleFigure{src="/blog/ai-workflow/browser-check.webp" display-width="1000" alt="Browser verification comment with fleet and one-site navigation screenshots" caption="The one-site screenshot contains a request error. The comment shows what the agent checked and what still needs attention." width="1784" height="1038"}

A diagram helps when the change crosses several boundaries. This PR shows where the Bing data comes from and where credentials enter the request.

:ArticleFigure{src="/blog/ai-workflow/bing-flow.webp" display-width="1000" alt="Bing PR diagram connecting views, Site credentials, bounded requests and the public Bing API" caption="The Bing integration PR. The diagram gives the reviewer a route through the change." width="1626" height="864"}

A confidence score helps only if it says what remains untested. It doesn't authorize a merge.

With Unhead, I still need to think about framework integrations, breaking changes and bundle overhead. An agent may correctly implement its task while missing a reason I don't want the change at all.

If review is full, another running agent can just produce another waiting PR.

:ArticleFigure{src="/blog/ai-workflow/original-review-ideas.webp" display-width="1000" alt="Review diagram showing independent reviewers, selective auto-merge and a bounded review queue" caption="Independent review, selective auto-merge and a bounded queue. The services and queue slots are illustrative." width="1760" height="597"}

## Start with the problem you keep having

If you keep correcting the same mistake, write down the rule. If the mistake has a detectable shape, make a check. If two agents keep editing the same block, look at the task split and the architecture.

You can do any of that with one agent and a normal development workflow.

I built the factory when I wanted trusted maintenance work to start without opening my laptop. I still have to decide what is worth doing and what should ship.
