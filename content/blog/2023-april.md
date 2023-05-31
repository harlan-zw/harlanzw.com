---
title: "April 2023: Thai New Year and Nuxt SEO Module Bugs"
description: "What I got up to in April 2023, including traveling to Thailand and working through a bunch of bugs in my SEO modules."
publishedAt: '2023-05-31'
aside: false
status: unlisted
excerpt: 'What I got up to in April 2023, including traveling to Thailand and working through a bunch of bugs in my SEO modules.'
tags:
  - newsletter
---

::Alert
Welcome to my monthly newsletter series.
Each month I send an update of my journey working on open-source to my <a href="https://github.com/harlan-zw/" target="_blank">GitHub sponsors</a> community.
<br><br>
After the month is over, I post it publicly here.
::


## Personal Updates

### Travel

Because we managed to sneak into Thailand just before they expired the 45 day visa on entry, we could spend longer there.

In total we spent 38 days in Thailand, including all of April.

As you'll know from the [last update](/blog/2023-march), we started the month in Ko Chang.

For those interested and without turning this into a travel blog, this is the route we took after Ko Chang.
- Chanthaburi - A small town with charm, but not much to do.
- Pattaya - Gross city but caught up with some friends here to celebrate Thai New Year
- Krabi - Amazing rock formations, would highly recommend some mangrove canoeing. Overall too touristy and basic though.
- Phi Phi - Tiny scenic island, but again very touristy.
- Khao Sok - Jungle, caves, lakes, monkeys, waterfalls. One of my favourite places in Thailand.
- Chiang Mai - Super-chill and relaxed city. Great food, great people, great vibes.
- Pai - Quite touristy with a hippy vibe. But the surrounding nature is amazing.

<Expand>
<div class="grid grid-cols-2 gap-8 my-15">
<Image src="/april-mangrove.png" alt="Saw a monkey in the mangroves while kayaking" no-margin />
<Image src="/april-koa-sok.png" alt="The jungles of Khao Sok"  no-margin />
<Image src="/april-phi-phi.png" alt="Phi Phi Islands"  no-margin />
<Image src="/april-pi.png" alt="In the Pai hole"  no-margin />
</div>
</Expand>

#### Thai New Year 🇹🇭

We were lucky enough to be in Thailand for Thai New Year, also known as Songkran. It's a 3 day festival where everyone throws water at each other.

It was a lot of fun, but also a bit of a nightmare.
We were in Pattaya for the two days.
It was fun joining the kids and throwing ice-cold water at all the old gross expats.

We spent the next day in Krabi celebrating it as the locals do, with decked-out cars and baby powder.

<Image src="/april-songkran.png" alt="Slapped with endless baby powder mixed with dye."  no-margin />

## Numbers

- ⭐ 3779 GitHub stars (+199)

<Image src="/april-numbers.png" alt="My WakaTime numbers for April" />

<Image src="/april-fathom.png" alt="My April Fathom Traffic" />

## Work Updates / Financials

Time spent in front of a screen took a small hit, but still managed to get many hours in.

### Open-Source

My open-source time was mostly spent being reactive. Trying to solve many of the issues coming in to my Nuxt modules.

- ⌛ 70.75 hrs  (-17.25 hrs)
- 💸 $1,013 AUD (+$226) - Had a payout from the Windi CSS project as it was sunset.
- $14.32 AUD / hour (+$5.38 / hour) - Highest yet! Although this was mostly a one-off.

**Main projects**

- **34 hours [nuxt-og-image](https://github.com/harlan-zw/nuxt-og-image)**

More time spent wrestling WASM issues on different Nitro providers. I managed to get things
much more stable, although Netlify still has issues with PNG images.


- **16.5 hours [nuxt-simple-sitemap](https://github.com/harlan-zw/nuxt-simple-sitemap)**

The Nuxt Simple Sitemap logic got quite a bit more complex than I initially anticipated. The issues mainly related
to generated a sitemap at runtime while still honoring prerendered, discovered URLs.

Much of this time was on stabilising these improvements.
The feedback has been very positive to the fixes and the module overall.

- **6 hours [Nuxt](https://github.com/nuxt/nuxt)** 

Not too much on Nuxt, mainly some triaging and minor fixes.

### Freelancing

- ⌛ 2.25 hrs (-4.75 hrs)
- 💸 $225 AUD (-$420) 645
- $100 AUD / hour (-$7 / hour)

I tried to avoid freelance work this month.
I did have some work come in, in fact two organic leads.
But I decided to push this work back to May as I wanted to focus on my open-source work
and wasn't sure how my availability would be.

## May plans

In April I wanted to get Nuxt SEO Kit v2 out.
The blocker I came across was some of the modules not being stable enough (nuxt-og-image and nuxt-simple-sitemap).
These are now mostly resolved, although there is one outstanding issues for nuxt-og-image.

In starting to identify what changes are needed for v2 as well, I identified a bunch of scope that I hadn't considered.

So likely v2 of Nuxt SEO Kit will be a couple of months away still, but I will keep chipping away at it.

## Final thoughts

It was a really fun month in Thailand, I had a good balance of work and travelling.
It's never satisfying just working on bugs and issues, there's not much to show for it.

But this is the way open-source works it seems.
Periods of rapid development and then periods of slow but steady maintenance to get things stable.

And that's a wrap. Thanks for reading and thanks to my amazing sponsors.

Please get in touch if you feel like it, always happy to chat!
