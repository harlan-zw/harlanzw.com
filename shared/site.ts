export const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/harlan_zw',
    icon: 'i-simple-icons-x',
    label: 'Visit Harlan on X',
    identity: true,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/harlan-zw',
    icon: 'i-line-md-github',
    label: 'Visit Harlan on GitHub',
    identity: true,
  },
  {
    name: 'Discord',
    href: 'https://discord.com/invite/5jDAMswWwX',
    icon: 'i-line-md-discord',
    label: 'Join Harlan\'s Discord',
    identity: false,
  },
] as const

export const site = {
  name: 'Harlan Wilton',
  url: 'https://harlanzw.com',
  image: '/cover.png',
  logo: '/harlan-wilton.jpeg',
  language: 'en-AU',
  tagline: 'Open Source Developer',
  description: 'Open source developer, contributing to the Vue, Nuxt, and Vite ecosystems.',
  sameAs: socialLinks.filter(link => link.identity).map(link => link.href),
} as const
