---
title: "Fighting GitHub CI bills with my own homelab"
description: "Moving GitHub Actions onto Hogwild, with live runner cost estimates, memory limits and the homelab maintenance that followed."
publishedAt: '2026-09-11'
status: unlisted
aside: false
tags:
  - github-actions
  - homelab
  - development
newsletter: false
---

Getting agents to write more code gave me more CI to run.

Every proposed fix needed checks. Review found something, another commit arrived, and the checks ran again. Multiply that by several projects and a service that keeps working after I've closed my laptop.

I wanted that work off my GitHub bill. I also wanted it off my desktop.

So I bought a small computer, named it Hogwild, and gave myself a second job maintaining it.

## What the runners would have cost

This reads the completed job totals from Hogwild. The amount updates as the runner records more work.

:ArticleRunnerSavings

I call this estimated hosted cost avoided because I haven't reconciled it against an invoice. It prices the recorded runtime at GitHub's standard Linux x64 rate. A job on GitHub's machine may take a different amount of time.

The history also includes earlier self-hosted runner work, before the move to Hogwild. It isn't all work this new machine completed.

[GitHub includes hosted minutes for private repositories, and standard hosted runners are free for public repositories](https://docs.github.com/en/billing/concepts/product-billing/github-actions). My open-source projects already benefit from that. Private project builds were the reason to move more work home.

The calculation rounds each job up to a whole minute before adding the total. Two jobs lasting 61 seconds each count as four minutes. Rounding their combined runtime would count three.

Here's the equivalent TypeScript for the calculation used by the runner's job history:

```ts
function billableMinutes(
  startedAt: number,
  completedAt: number,
) {
  return Math.ceil((completedAt - startedAt) / 60_000)
}

const hostedCostUsd = jobs.reduce((total, job) => {
  const { startedAt, completedAt } = job
  return total + billableMinutes(startedAt, completedAt)
}, 0) * 0.006
```

The [US$0.006 rate](https://docs.github.com/en/billing/reference/actions-runner-pricing) is for GitHub's standard two-core Linux x64 runner, checked in September 2026. This gives me a consistent comparison. It doesn't tell me when the computer pays for itself.

## The computer

Hogwild is a Minisforum MS-02 Ultra with an Intel Core Ultra 9 285HX. I bought a 2 TB Kingston KC3000 SSD and 32 GB of Crucial DDR5 RAM for it.

:ArticleHogwildHardware

Those are my purchase figures in Australian dollars. The runner estimate above is in US dollars. I haven't measured electricity use well enough to add a credible running cost.

The machine also runs [my GitHub agent](/blog/building-my-software-factory-on-github), the [Hogwild status page](https://hogwild.harlanzw.com/), and services like Jellyfin. Charging the entire purchase to CI would be a choice, too.

## What about electricity?

I don't have a wall-meter reading for Hogwild yet. CPU utilisation can't tell me what the whole machine draws.

[ServeTheHome measured roughly 19–21 W at idle and 145 W under sustained load](https://www.servethehome.com/minisforum-ms-02-ultra-review-intel-new-home-lab-king/4/) on an MS-02 Ultra. My services, operating system and network cards can change that. I've used 50 W average as a scenario, rather than treating an idle measurement as a day of CI.

At 50 W, running around the clock uses 438 kWh a year. I use 28.2¢/kWh as a local benchmark, the simple average of the [five Victorian Default Offer residential flat tariffs for 2026–27](https://www.esc.vic.gov.au/sites/default/files/documents/Victorian%20Default%20Offer%202026-27%20Price%20Determination.pdf), including GST. That puts electricity at about A$124 a year.

This is a tariff benchmark, rather than a measured average of Melbourne household bills. It excludes the daily supply charge I already pay to connect my house.

:ArticleRunnerProjection

The projection uses the last seven complete days of runner activity. Today's partial total stays out of the average. Seven days is a short sample, so a busy release week can make the result look much better than a quiet month.

The chart charges the full A$2,773 purchase to CI, converts hosted charges to AUD, then adds five years of electricity. It also subtracts an allowance for included GitHub minutes. The controls let you change the allowance and exclude work that would already run free on GitHub.

I wouldn't buy the machine on this projection alone. I want to see a few months of work and a measured power average before calling it my actual saving.

## One container, one job

The runner supervisor watches the configured repositories for queued work. A signed `workflow_job` webhook can wake it early; polling catches work if that notification doesn't arrive.

Before it registers a runner, it checks whether the host has capacity. Then it creates a just-in-time runner in a fresh container. The runner takes one job and exits.

The job container runs as a non-root user. It gets no Docker socket or host filesystem mounts. The supervisor creates the registration configuration on the host and passes it through standard input.

That leaves the workflow change fairly small. A job selects one of the labels my supervisor serves:

```yaml
jobs:
  test:
    runs-on: [self-hosted, harlan-desktop-ci]
    steps:
      - uses: actions/checkout@v4
      - run: corepack enable
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:run
```

That's a shortened example, assuming the runner image already has the project's Node version. The `harlan-desktop-ci` label survived the move. I haven't renamed it yet.

Fresh containers help keep one job's files out of the next job. I still have to maintain the runner image and decide which repositories may execute code on my hardware.

## The first budget was RAM

An earlier desktop runner measurement put a Nuxt SEO deploy at 10.7 GiB of memory. A few builds arriving together could consume the host before CPU became the problem.

The supervisor now reserves memory before starting a job. A reservation spends part of the host's available capacity. A container limit caps how much that individual job can use.

Here is a row from Hogwild's runner configuration, wrapped for reading:

```text
repository:          harlan-zw/nuxtseo.com
labels:              harlan-desktop-deploy,nuxtseo-deploy
warm runners:        0
maximum runners:     1
CPUs:                12
memory reservation:  13g
memory limit:        16g
memory plus swap:    20g
```

The reservation and limit deliberately differ. The supervisor budgets 13 GiB before accepting the deploy, while the container has room to exceed that estimate.

I also give waiting deploys the next available capacity. Otherwise a steady stream of smaller checks can keep taking the space a deploy needs.

Getting the limits wrong produces misleading failures. A [gscdump.com](https://gscdump.com) cold build measured 7.82 GiB, close enough to its old 8 GiB limit that the container could kill it mid-bundle. The same commit passed on the desktop, where the job had more memory.

I had to fix the runner configuration before another code change could tell me anything useful.

## Giving an agent the right keys

Hogwild runs an agent that reads public issue text. It also runs a supervisor that can create containers. I don't want those to share an account with the same permissions.

The account split gives the agent ordinary user access. A separate admin account owns host administration and Docker access.

[PR #250 in Harlan Agent Kit](https://github.com/harlan-zw/harlan-agent-kit/pull/250) adds a Hogwild skill and an `hw` command to make that distinction explicit. The proposed commands include:

```sh
hw status
hw logs runner -n 100
hw runners
```

For commands on the machine, the caller must choose an account:

```sh
hw run agent whoami
hw run admin whoami
```

The agent route refuses `sudo`. The useful part of that PR is the account map: a failed privileged command should send administrative work to the admin account. It shouldn't become a reason to give the agent more permissions.

That is still a proposed change as I write this. The pull request has the implementation and review history.

The live figures in this article use a separate read path. Hogwild's collector reads local services and returns a small summary to this site's server, authenticated with a dedicated token. The browser gets the summary. It never gets the agent's dashboard password.

For the homepage's latest work, the server checks each reference against GitHub without authentication before exposing a title or link. Private work stays out of that list.

## I own the failures now

On 10 September, a build stalled fetching a font from `fonts.gstatic.com`. Docker was trying a DNS server that the firewall blocked. The delay then collided with the HTTP client's timeout.

There was nothing wrong with the font import. There was something wrong with my network.

Runner updates are another small tax. The runner version in the image can fall behind GitHub's version, leaving each fresh runner to download an update before doing useful work. Updating the image removes that repeated setup.

Even restarting the supervisor needs care. It drains running jobs before stopping. I have to leave it time to finish, or decide that interrupting those builds is worth it.

I still use GitHub-hosted runners where they make sense. Hogwild gives the private builds somewhere else to run, and I can see their memory use and cost comparison on a page I control.

I still need to put a meter on Hogwild. That will replace the largest electricity assumption in the chart.
