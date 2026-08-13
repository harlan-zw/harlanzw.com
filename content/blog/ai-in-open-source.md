---
title: "How I use AI in open source"
description: "My policy for AI-written code, pull request descriptions and automated reviews across the projects I maintain."
publishedAt: '2026-08-13'
aside: false
tags:
  - ai
  - open-source
newsletter: false
---

AI is here, and it is rightfully carving out how open source works.

Being an engineer means adapting to the underlying technology, so I'll be using AI heavily in my open-source work.

There's already enough AI slop in open source. AI-generated PR descriptions generally suck.

I don't want to add to it. [Daniel Roe's post on using AI in open source](https://roe.dev/blog/using-ai-in-open-source) helped me settle my policy on working with AI in open source.

## The Rules

- AI never speaks for me. Every public action says it came from an agent.
- Agents may act autonomously only in selected repositories I own (`harlan-zw/*`) or am the only core contributor.
- Other open-source projects including [Nuxt](https://github.com/nuxt/nuxt) will never receive an agent generated PR.
- [AI-written pull request descriptions](https://github.com/harlan-zw/harlan-agent-kit/blob/main/harlan-agent-kit/skills/pr/SKILL.md) stay concise, link to this page and include the disclosure below.
- [Automated reviews](https://github.com/harlan-zw/harlan-agent-kit/blob/main/harlan-agent-kit/skills/adversarial-review/SKILL.md) use one labelled bot comment. It names the reviewed commit and any uncertainty.
- Agents never approve or merge pull requests.
- Fixes use normal commits. Agents never hide or rewrite history.
- Anything ambiguous comes back to me.

### Sites I own

- The [PR owner agent](https://github.com/harlan-zw/harlan-agent-kit/blob/main/harlan-agent-kit/skills/pr-owner/SKILL.md) watches the deployment and runs relevant smoke tests against production.
- Agents may [repair post-merge CI](https://github.com/harlan-zw/harlan-agent-kit/blob/main/harlan-agent-kit/skills/pr-owner/SKILL.md) on the default branch.

## Workflow: Issue Triaging

On selected projects, Harlan Agent Kit [checks new issues](https://github.com/harlan-zw/harlan-agent-kit/blob/main/harlan-agent-kit/skills/issue-triage/SKILL.md) before touching code. It tries to reproduce the problem, checks for duplicates and decides whether there is enough information to act.

If the issue looks valid, the agent starts in an isolated worktree. It writes a regression test, fixes the problem and [opens a pull request](https://github.com/harlan-zw/harlan-agent-kit/blob/main/harlan-agent-kit/skills/pr/SKILL.md). Anything ambiguous comes back to me.

## Workflow: Opening Pull Requests

On projects I maintain myself, I use AI to help write code and pull request descriptions. The descriptions are [tuned for my preferences](https://github.com/harlan-zw/harlan-agent-kit/blob/main/harlan-agent-kit/skills/pr/SKILL.md#step-3-build-pr-content): explain why the change exists, capture useful context and cut the noise.

When Harlan Agent Kit drafts or edits a description, the pull request links back to this page and includes this:

> 🤖 AI disclosure: [Harlan Agent Kit](https://github.com/harlan-zw/harlan-agent-kit) modified this description. [My AI open-source policy](https://harlanzw.com/blog/ai-in-open-source).

The description still needs to help someone review the change. AI involvement is no excuse for a wall of text or claims that nobody checked.

## Workflow: Adversarial Review

When I or someone else opens a pull request on a selected project, my agent runs an [adversarial review](https://github.com/harlan-zw/harlan-agent-kit/blob/main/harlan-agent-kit/skills/adversarial-review/SKILL.md). Codex and Claude Code try to disprove the change. They read the full diff, look for missing tests and follow failures instead of stopping at the first green check.

If the agent finds a real problem and has permission to fix it, it pushes a normal commit. The history stays visible.

The final status is posted as one bot comment. It names the exact commit reviewed, says what remains uncertain and starts with:

> 🤖 Bot review: [Harlan Agent Kit](https://github.com/harlan-zw/harlan-agent-kit) posted this comment. It is not Harlan's personal review or approval. [My AI open-source policy](https://harlanzw.com/blog/ai-in-open-source).

Later runs update the same comment instead of adding more noise. The bot never approves or merges a pull request. That decision stays with a human.

## Misbehaving AI

AI does not like following instructions, so I know it will get this wrong eventually.

AI can write a convincing explanation for broken code. A passing test can miss the thing that matters. A confident review can still be wrong.

I still own the systems I choose to run and the changes they make to my projects.

If a bot gets something wrong, email me or open an issue. I'll work out what failed and make the process better.
