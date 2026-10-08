export interface HeaderLink {
  title: string
  to: string
  icon: string
}

export const headerNavigation: HeaderLink[] = [
  { title: 'Blog', to: '/blog/', icon: 'i-lucide-notebook-text' },
  { title: 'Projects', to: '/projects/', icon: 'i-lucide-lightbulb' },
  { title: 'Sponsors', to: '/sponsors/', icon: 'i-lucide-heart' },
  { title: 'Talks', to: '/talks/', icon: 'i-lucide-presentation' },
]
