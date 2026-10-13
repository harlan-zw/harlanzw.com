# Markdown negotiation

Agents that send `Accept: text/markdown` get a page's Markdown from a [Cloudflare](https://cloudflare.com) zone rule, not from the Worker.
The rule is a URL Rewrite Rule in ruleset `e1502ab83c894acd8aea2bd7d688b91f`, phase `http_request_transform`.
That phase runs before the cache.
The rule rewrites a page path to its static `.md` asset, which the prerender writes beside each page.

The rule requires one `Accept` header with a clear Markdown request.
It accepts `text/markdown`, regardless of letter case, with an optional quality of exactly `1`.
It also accepts an unweighted list that starts with `text/markdown`.
Weighted or ambiguous lists keep the normal HTML path.
The static fast path does not parse general quality preferences.

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

If the request prefers HTML or excludes Markdown, it must receive HTML:

```bash
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' -H 'Accept: text/html;q=1, text/markdown;q=0.2' https://harlanzw.com/
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' -H 'Accept: text/markdown;q=0, text/html;q=1' https://harlanzw.com/
```

Both commands must print `200 text/html`.
