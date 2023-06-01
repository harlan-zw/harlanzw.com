---
title: "April 2023: Thai New Year and Nuxt SEO Module Progress"
description: "I spent all of April 2023 traveling within Thailand while working through a bunch of bugs in my Nuxt SEO modules."
publishedAt: '2023-04-31'
aside: false
excerpt: 'I spent all of April 2023 traveling within Thailand while working through a bunch of bugs in my Nuxt SEO modules.'
tags:
  - newsletter
---

## Personal Updates

### A Month In Thailand

We spent all of April in Thailand, 38 days total.
We got lucky to sneak into Thailand just before they removed the 45-day visa on entry.

As you'll know from the [last update](/blog/2023-march), we started the month in Ko Chang.

For those interested in our route afterward:
- Chanthaburi - A small town with charm, but not much to do.
- Pattaya - Gross city but caught up with some friends here to celebrate Thai New Year.
- Krabi - Amazing rock formations, would highly recommend the mangrove canoeing. Overall very touristy, wouldn't want to spend too long here.
- Phi Phi - Tiny scenic island, but again very touristy. Think buckets of cocktails for $4 AUD.
- Khao Sok - Jungle, caves, lakes, monkeys, waterfalls. One of my favourite places in Thailand.
- Chiang Mai - Super-chill and relaxed city. Great food, great people, great vibes.
- Pai - Quite touristy with a hippy vibe. But the surrounding nature is amazing.

<Expand>
<div class="md:grid grid-cols-2 gap-8 my-15">
<Image src="/april-mangrove.png" alt="Saw a monkey in the mangroves while kayaking" no-margin />
<Image src="/april-koa-sok.png" alt="The jungles of Khao Sok"  no-margin />
<Image src="/april-phi-phi.png" alt="Phi Phi Islands"  no-margin />
<Image src="/april-pi.png" alt="In the Pai hole"  no-margin />
</div>
</Expand>

### Thai New Year 🇹🇭

We were lucky enough to be in Thailand for Thai New Year, also known as Songkran. It's a 3 day festival where everyone throws water at each other.

Super wholesome activity, hanging out with the kids throwing ice-cold water on anyone passing by.

We were in Pattaya for the first two days, main victims were old gross expats.

The last day we spent in Krabi.
We were able to find where the locals were celebrating it.
Completely different vibe to the foreigners. 
They have with decked-out cars blasting the "Songkran" anthems, everyone dancing and smothering everyone in spicy, dyed
baby powder.

## Work Updates

### Nuxt SEO Kit v2 Module Progress

Moving towards the Nuxt SEO Kit v2 module,
I needed to solve some of the outstanding issues in the v2 of the modules I had published. 

Most of my time was spent on [nuxt-og-image](https://github.com/harlan-zw/nuxt-og-image).
It's quite a complicated module, working with a lot of tech that I haven't had much experience with.
Namely WASM and buffer encodings.

I think I went through at least 30 beta release versions trying to solve all the issues...
Definitely close to a stable release.

Other time went towards [nuxt-simple-sitemap](https://github.com/harlan-zw/nuxt-simple-sitemap).

The month before I decided to add support for i18n.
I18n complicates things quite a lot, but it wasn't an unreasonable feature request.
I have an integration working for the most common configurations,
but it does get quite complicated and there is more work to do.

The feedback has been positive to the fixes and the modules overall.

## Numbers / Financials

- ⭐ 3779 GitHub stars (+199)

<Image src="/april-numbers.png" alt="My WakaTime numbers for April" />

<Image src="/april-fathom.png" alt="My April Fathom Traffic" />

### Open-Source

- ⌛ 70.75 hrs  (-17.25 hrs)
- 💸 $1,013 AUD (+$226) - Had a payout from the Windi CSS project as it was sunset.
- $14.32 AUD / hour (+$5.38 / hour) - Highest yet! Although this was mostly a one-off.

**Main projects**

- **34 hours [nuxt-og-image](https://github.com/harlan-zw/nuxt-og-image)**
- **16.5 hours [nuxt-simple-sitemap](https://github.com/harlan-zw/nuxt-simple-sitemap)**
- **6 hours [Nuxt](https://github.com/nuxt/nuxt)** 

### Freelancing

- ⌛ 2.25 hrs (-4.75 hrs)
- 💸 $225 AUD (-$420) 645
- $100 AUD / hour (-$7 / hour)

I tried to avoid freelance work this month.
I did have some work come in, in fact, two organic leads.
But I decided to push this work back to May as I wanted to focus on my open-source work
and wasn't sure how my availability would be.

## May plans

In April, I wanted to get Nuxt SEO Kit v2 out.
The blocker I came across was some of the modules not being stable enough.
These blockers are now mostly resolved.

In starting to identify what changes are needed for v2 as well, I identified a bunch of scope that I hadn't considered.

So likely v2 of Nuxt SEO Kit will be a couple of months away still, but I will keep chipping away at it.

## Final thoughts

It was a really fun month in Thailand, I had a good balance of work and traveling.
It's never satisfying just working on bugs and issues, there's not much to show for it.

But this is the way open-source works it seems.
Periods of rapid development and then periods of slow but steady maintenance to get things stable.

And that's a wrap. Thanks for reading and thanks to my amazing sponsors.

Please get in touch if you feel like it, always happy to chat!
