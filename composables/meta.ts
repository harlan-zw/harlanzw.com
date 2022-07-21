import { SameAs, SiteDescription, SiteImage, SiteLogo, SiteName } from '~/logic'

export function useSiteMeta() {
  return {
    name: SiteName,
    description: SiteDescription,
    sameAs: SameAs,
    image: SiteImage,
    logo: SiteLogo,
  }
}
