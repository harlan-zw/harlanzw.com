# harlanzw.com

Harlan Wilton's personal site and writing archive. Built with [Nuxt 4](https://nuxt.com), [Nuxt Content](https://content.nuxt.com), [Nuxt UI](https://ui.nuxt.com), and the current [Nuxt SEO](https://nuxtseo.com) stack.

The site enables Nuxt 5 compatibility behavior and SSR streaming ahead of the Nuxt 5 release.

The interactive canvas prototype lives at `/experimental`. The production routes remain content-driven and include generated RSS, Atom, and JSON feeds.

## Development

Requires [Node.js](https://nodejs.org) 24 or newer and [pnpm](https://pnpm.io) 11.

```bash
pnpm install
pnpm dev
```

Before submitting changes:

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
```
