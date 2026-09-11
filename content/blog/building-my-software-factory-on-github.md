---
title: "Building my software factory on GitHub"
description: "How I built a software factory around GitHub issues, AI agents and pull requests, and the work it still leaves for me."
publishedAt: '2026-09-11'
status: unlisted
aside: false
tags:
  - ai
  - open-source
  - github
newsletter: false
---

I wanted my weekends back.

For several weeks I'd been running the same health-check skills against my projects. Check Sentry. Look at what broke overnight. Work out which issues needed attention.

The procedures improved as I used them. Eventually I was changing them less, but I still had to open my laptop and start them.

That was the reason to build my software factory.

I call it Harlan GitHub Agent. It lives in [Harlan Agent Kit](https://github.com/harlan-zw/harlan-agent-kit), runs on my home server, Hogwild, and uses GitHub issues and pull requests to keep the work visible.

It produces PRs. I still review most of them.

## What I mean by a software factory

In my talk, *Zero To Software Factories: Chasing the AI Dragon*, I start with this map. The frame around it is me.

:ArticleFigure{src="/blog/ai-workflow/original-factory-map.webp" alt="Original factory map with Harlan owning the code, review, close off and monitoring loops" caption="The original loop map from slide 5. Human ownership surrounds the whole process." width="1696" height="716"}

The actual service adds a poller, SQLite journal and scheduler to keep work moving between agents and GitHub.

I ended up maintaining all of those pieces too.

:ArticleFigure{src="/blog/ai-workflow/original-factory-architecture.webp" href="https://dragon.harlanzw.com/factory/index.html?theme=dark&present=1" link-label="Explore the original diagram" alt="Original factory architecture connecting routines, GitHub state, the Hogwild service and GitHub publication" caption="The architecture shown in slide 6. Open the original to zoom, follow the guided views and inspect source references." width="1920" height="1080"}

This is the setup I prepared for the talk in September 2026. By the time you read it, I will probably have changed parts of it again.

If you're still dealing with broken agent output or conflicting edits, I'd start with [improving your development workflow with AI](/blog/improving-your-development-workflow-with-ai). Those problems follow you into a factory.

## Why GitHub?

My projects already had issues, branches, pull requests and CI on GitHub. That gave the factory somewhere to get work and somewhere to put the result.

It also left me a familiar place to inspect it. I can open a PR, read the diff, see the checks and decide what to do.

The service reads issues, PRs, reviews and check runs. A poller records what it sees in a SQLite journal. The scheduler turns that state into tasks and gives available agents work.

An agent takes one task in an isolated worktree. It might triage an issue, implement a change, review a PR or repair a finding. Those are different jobs, with different instructions.

The result returns through the publication gate. That part of the service owns the GitHub writes and rechecks the relevant commit before publishing a result.

That last check matters. While an agent is reviewing a PR, another commit can arrive. A review of the old code must not become a claim about the new code.

The [architecture snapshot used in the talk](https://github.com/harlan-zw/harlan-agent-kit/tree/ca1cb363a452ecadc03648df9613f38e4585560e/packages/harlan-github-agent) separates reading GitHub state, doing the work and publishing the result. GitHub gives me the shared record; the service handles the work between observations.

## Following one issue

An issue first needs enough information to act on. Triage checks the premise and decides whether it is ready for implementation, needs a specification, needs more information or should wait.

If it is ready, an agent gets a worktree and starts the task. For a bug, I want a reproduction and a failing test before the fix. The output should be a change someone can review.

A separate Review agent challenges that change. If it finds a defect the system may repair, a fresh Repair agent takes the finding. The new commit goes through review again.

I don't want the author marking its own homework. Separating the roles also gives the reviewer a smaller job: find what's wrong and show the evidence.

The review result names the commit it examined and records uncertainty. Here is the READY comment I used in the talk. Even at 95/100, it explicitly asks for a human merge decision.

:ArticleFigure{src="/blog/ai-workflow/ready-review.webp" alt="Agent review marked READY at 95 out of 100, stating that human merge approval is still required" caption="Original review screenshot from the slides. This is a separate example from the Stripe and Bing PRs." width="1830" height="624"}

### Routine changes and judgement

The factory policy shown in the talk permits selective auto-merge. The label delegates that authority for work that needs no judgement.

:ArticleFigure{src="/blog/ai-workflow/original-review-ideas.webp" alt="Original slide showing independent reviewers, selective auto-merge and a bounded review queue" caption="The review ideas from slide 33. Services and queue slots illustrate options; they are not a claim about current factory settings." width="1760" height="597"}

A high confidence score isn't permission. Neither is the fact that a previous version of the PR passed review. If the scope changes, the decision needs to change with it.

I still review most PRs. I also own the consequences of the ones I allow the service to merge.

## The boring handoff that broke everything

One of the more useful failures had very little to do with generated code.

The service triaged an issue, then looked up that triage session when implementation started. The lookup included the default branch's commit.

If main advanced in between, the lookup no longer matched. The issue hadn't changed. Its title and body were the same. Work still stopped with:

::expand

```text
The issue changed before work started.
```

::

Batch planning made the timing worse. By the time a task started, main had often moved. Re-triaging sent the same work around again.

The [fix in PR #183](https://github.com/harlan-zw/harlan-agent-kit/pull/183) keyed the triage session on the issue's own state, independently of the default branch tip.

Implementation needs a checkout of the code it will change. The triage decision needs to identify the issue it examined. An unrelated merge should not invalidate it.

I had modelled the application state incorrectly. No prompt was going to repair the lookup.

The controller also needed recovery for expired worker ownership and limits on repair rounds. An unattended service has to know what work is still owned, what can resume, and when to stop trying.

## Giving the agents somewhere to work

The service uses Worktrunk to give each task an isolated checkout. Main stays clean. Setup prepares the dependency graph and local state before the agent starts.

The pnpm store can be shared, but each checkout needs its own `node_modules` and generated files. Writable state belongs to the task too.

I use the same standing instructions and task skills across my interactive work and the factory. Those instructions cover things like error handling, tests, review evidence and how a task finishes.

That gives me one place to improve a procedure after a failure. It also gives me another thing to verify: which version of the instructions and tools is a worker actually using?

Shared instructions don't make untrusted input safe. Issues, comments and source files are still input to an agent. The service needs explicit authority for its actions, and an agent's proposed result still needs checking before publication.

I wouldn't treat a synced `AGENTS.md` as a security boundary.

## Hogwild 🐷

Hogwild runs the factory and my self-hosted GitHub Actions runners.

CI cost helped motivate the move, but putting runners on a machine introduced a different problem. Heavy builds competed for the same memory.

An earlier runner configuration recorded a Nuxt SEO deploy peaking at 10.7 GiB. Starting more containers didn't create more physical RAM.

I needed admission based on available capacity. The supervisor reserves memory before starting heavy work, releases it afterwards, and leaves room for waiting deploys.

A container's hard limit and a reservation do different jobs. The limit stops one job using too much. The reservation helps stop the host accepting too many jobs at once.

There is a [Hogwild status page](https://hogwild.harlanzw.com/) for seeing the machine's activity. The runner cost estimate in the talk compares that activity with equivalent hosted Linux runner charges. It doesn't subtract hardware or power, and included minutes or public repository allowances can change what I'd actually have paid.

I don't have a measured payback claim to make here. The machine gives me capacity I can manage, and another system I have to maintain.

## The queue needs a limit

The factory snapshot in the talk allowed four active agents, eight open PRs and three repair rounds per contributor commit.

Those are settings from that snapshot, not a recommended number of agents to run.

Once the queue is waiting on my review, more agents mostly add PRs for me to read.


Repair needs a limit for the same reason. An agent can keep attempting a problem without getting closer to a change I'd accept. I want the service to stop and surface the blocked work.

Cost has to include that failed work too. A cheap model request tells me very little about the cost of a completed task if it needs repeated attempts and repairs.

I left provider prices out of this article. They change quickly, and a subscription allowance isn't the same thing as API billing. The number I'd want to compare is what useful, reviewed work costs under the execution model I'm actually using.

## Work can arrive without me

Scheduled routines are the part that solved my original problem.

Sentry check-ins look for production errors. Daily check-ins combine runtime and usage signals. Their findings can become issues or proposed repairs, which feed back into GitHub for the factory to handle.

For the talk, I also prepared a clone of the MelbJS site with a feedback form that files GitHub issues. The plan was to invite feedback early, then inspect the issues, PRs and deployed site at the end.

An issue might need clarification or a PR might still be waiting for review. I wanted those states visible too.

I wasn't promising that every suggestion would ship during the talk.

There is even a Factory review routine that proposes changes to the factory itself. Those proposals join the work I need to judge.

## What I still do

I decide which projects the factory may work on. I set the constraints, review most changes and deal with the consequences when something goes wrong.

For Unhead, a technically correct change can still create an unwanted breaking change or affect an integration the agent hasn't considered. That judgement doesn't disappear because the checks are green.

The factory has taken over starting and following a lot of maintenance work. It has also given me controller bugs, runner capacity and agent instructions to maintain.

I wanted to stop opening my laptop just to tell an agent to check the same things again. Now those checks can start without me. Deciding what to do with the results is still my work.
