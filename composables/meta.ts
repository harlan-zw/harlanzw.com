import { SameAs, SiteDescription, SiteImage, SiteLanguage, SiteLogo, SiteName, SiteUrl } from '~/logic'

export function useSiteMeta() {
  return {
    name: SiteName,
    description: SiteDescription,
    sameAs: SameAs,
    image: SiteImage,
    logo: SiteLogo,
    lang: SiteLanguage,
    host: SiteUrl,
  }
}
