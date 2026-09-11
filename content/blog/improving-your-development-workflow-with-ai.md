---
title: "Improving your development workflow with AI"
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

This became the basis of my talk, *Zero To Software Factories: Chasing the AI Dragon*. It's tempting to look at someone running a room full of agents and start there. I've ended up [building my own software factory on GitHub](/blog/building-my-software-factory-on-github), but most of the useful changes happened before that.

They came from three questions.

## Can I trust my agent's code?

On 28 August I merged an agent-written Stripe integration into Nuxt SEO. It touched 23 files. The checks were green and the description said the agent had implemented and verified it.

I merged it without reading the code.

That's an uncomfortable place to start a talk about engineering, but it's an honest one. An agent can produce a convincing description much faster than I can check every claim in it.

### Where did the error go?

One recurring problem was silent error handling. An older version of my admin code turned a failed Stripe balance request into `null`:

```ts
const balance = await stripe.balance.retrieve().catch(() => null)
```

The request failed, but the cause disappeared. Whatever happened next had to work with `null`.

For the talk, I used a simplified payment example to make the consequence easier to see:

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

That gave the agent better instructions. It could still write the same bad code.

So I added a lint rule. It catches shapes like `.catch(() => null)` and empty catch blocks. A hook runs lint after edits so the agent gets feedback while it is still working.

The limits matter here. My rule allows comment-only catches, including the illustrated one above. It can reject a code pattern. It can't decide whether a payment failure reached the right person.

### Give failure a shape

My TypeScript preferences borrow from Effect, without requiring Effect as a dependency. Expected failures become tagged values that the caller must handle. Unexpected infrastructure failures remain errors.

For a payment, that means distinguishing a card decline from a service failure. The caller needs to know whether to ask the customer for another payment method or report a problem.

I also want the original error attached to request context, with sensitive fields redacted before they leave the application. Nuxt SEO has shared logging rules for names, redaction and where events go. That gives each handler something consistent to use.

Then there is production. Sentry can surface an exception, but some broken journeys never throw. A user may retry several times and give up.

Logs and usage signals can help find those cases. A drop in completed payments is a reason to investigate. It doesn't tell you whether the cause is a bug, confusing UI or something else.

Fixing the catch was one part of the work. I also needed to improve the instructions, the checks, the return values and what I could see after deployment.

### More tests didn't give me more confidence

Agents are very happy to write tests. Some of mine checked that a file contained a string, or that the source had the structure the agent had just written.

Those tests gave me more code to maintain. They didn't tell me much about whether the feature worked.

My testing skill now asks for concrete input, a call to an exported function, and an observable result. For a bug fix, I want to see the test fail before the fix.

I also use gitignored scratch tests. An agent can write a probe to understand a problem, run it, then throw it away. If it captures behaviour that needs protecting, it belongs in the maintained suite.

There is no useful target number of tests here. I want a test that would notice the defect it claims to prevent.

## Do my agents work effectively in parallel?

Asking four agents to work at once is easy. Giving them four usable environments took more effort.

A branch alone doesn't give an agent a separate directory. A worktree does. Each task gets its own checkout, while the primary checkout stays clean on main.

I use [Worktrunk](https://github.com/max-sixty/worktrunk) to manage that setup. Before a task starts, the checkout needs its dependencies, local configuration and writable state ready.

Otherwise, the agent spends the first part of the task fixing its environment. Sometimes it changes application code to compensate for an environment that was wrong to begin with.

### Share the package store

The useful distinction is between sharing package files and sharing an installed application.

[pnpm's package layout](https://pnpm.io/symlinked-node-modules-structure) lets worktrees share package data while keeping a separate dependency graph in each checkout. Each task gets its own `node_modules`. Nuxt generates `.nuxt` inside that task's checkout too, because generated files can contain paths specific to it.

Local databases need their own writable state. Sharing a database between two tasks makes it much harder to know what either agent actually tested.

There are less interesting details that still make a difference. I use [Portless](https://github.com/vercel-labs/portless) for stable local preview names, and named browser pages for each task. I also built a JetBrains worktree plugin so I could see the checkouts in my IDE.

If isolation makes the work awkward to inspect, I'll eventually work around it. The setup has to be usable for me too.

### Separate checkouts still meet at the same files

Worktrees didn't fix my architecture.

Independent features still passed through shared configuration and registration points. Two tasks could work perfectly well in isolation, then arrive with competing edits to the same block.

I had a real pair of Nuxt SEO PRs that both rewrote the sitemap-failure handling in one crawl job. They needed an explicit landing order and a rebase.

Sometimes that's unavoidable. If it keeps happening, I look at the boundary. Can the feature own its configuration? Can the shared module expose a smaller interface? Are the tasks actually independent?

For related work, stacked PRs can make the dependency explicit. For repeated mechanical edits, I use Ripast to preview and apply structured renames and moves, then check the result. Repeating a more detailed prompt wasn't fixing broken refactors in large Vue files.

The same applies to context. `VISION.md` explains what the product is trying to do. `GLOSSARY.md` keeps the names consistent. `DESIGN.md` gives agents shared UI decisions to follow.

Two agents can use different files and still make incompatible product decisions. Separate directories won't catch that.

## Can I keep up with what they produce?

Eventually the agents could produce work faster than I could land it.

Some of the delay was CI. I had to look at how much setup each PR repeated, which checks needed to run first, and which runs were already obsolete.

Lint and type checks can reject a change before an expensive build starts. [GitHub Actions concurrency](https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency) can cancel superseded checks for the same PR. A deployment that needs to finish requires a different policy.

A smaller PR gate is also a tradeoff. Moving checks until after merge means some failures reach main before you discover them. I need to know what I'm giving up and how those failures get reported.

Caching needs the same scrutiny. I removed pnpm caching from one CI setup because it was slower there. A shared package store on my machine and downloading an archive on a hosted runner have different costs.

But faster CI only solves part of it. My attention is still finite.

### Make the review worth reading

I want an agent review to try to disprove the change. Check the premise, follow the failure cases, and show what was actually verified.

For a UI change, a browser screenshot is useful. For a bug fix, the failing test matters. For a change crossing several boundaries, a small diagram can save me reading the whole repository to understand it.

A confidence score helps only if it says what remains untested. It doesn't authorize a merge.

With Unhead, I still need to think about framework integrations, breaking changes and bundle overhead. An agent may correctly implement its task while missing a reason I don't want the change at all.

That puts a practical limit on how much work I should start. If review is full, another running agent can just produce another waiting PR.

## Start with the problem you keep having

If you keep correcting the same mistake, write down the rule. If the mistake has a detectable shape, make a check. If two agents keep editing the same block, look at the task split and the architecture.

You can do any of that with one agent and a normal development workflow.

I built the factory when I wanted trusted maintenance work to start without opening my laptop. I still have to decide what is worth doing and what should ship.
