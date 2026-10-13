# Markdown negotiation

Agents that send `Accept: text/markdown` get a page's Markdown from a [Cloudflare](https://cloudflare.com) zone rule, not from the Worker.
The rule is a URL Rewrite Rule in ruleset `e1502ab83c894acd8aea2bd7d688b91f`, phase `http_request_transform`.
That phase runs before the cache.
The rule rewrites a page path to its static `.md` asset, which the prerender writes beside each page.

The rule matches `/`, `/blog`, `/projects`, `/talks`, and every `/blog/*` path.
It skips `/blog/ai-workflow/*` and any path that ends in `.md` or `/`.
A new post needs no rule change, because its `/blog/<slug>` path already matches.
A new top-level page needs the rule extended in the zone.

The HTML and the Markdown share one URL, so both send `Vary: Accept`.
The `/*.md` rule in `_headers` covers the Markdown.
A `prerender:done` hook in `nuxt.config.ts` gives each prerendered page its own exact-path rule.
A `/blog/*` glob would also match `/blog/<slug>.md`, and Cloudflare would join the two values into `Accept, Accept`.

Check a page after a deploy:

```bash
curl -sI -H 'Accept: text/markdown' https://harlanzw.com/blog/ai-in-open-source | rg -i 'content-type|vary'
curl -sI https://harlanzw.com/blog/ai-in-open-source | rg -i 'content-type|vary'
```

Each command prints one `content-type` and one `vary: Accept`.
