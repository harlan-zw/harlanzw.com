export interface BuildWarning {
  code?: string
  id?: string
  ids?: string[]
  message: string
  names?: string[]
}

const NITRO_SERVER_COOKIE_HELPERS = new Set(['deleteCookie', 'parseCookies'])

export function isExpectedNitroBuildWarning(warning: BuildWarning): boolean {
  if (warning.code === 'CIRCULAR_DEPENDENCY' || warning.code === 'EVAL')
    return true

  if (warning.message.includes('Unsupported source map comment'))
    return true

  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
    const importedBy = (suffix: string) => warning.ids?.some(id => id.endsWith(suffix)) === true
    if (importedBy('/node_modules/@nuxt/nitro-server/dist/h3.mjs'))
      return warning.names?.includes('H3Event') === true
    // Nuxt 4.6.1's server runtime imports cookie helpers that a build without
    // cookie handling never calls.
    if (importedBy('/node_modules/@nuxt/nitro-server/dist/runtime/server.mjs'))
      return warning.names?.every(name => NITRO_SERVER_COOKIE_HELPERS.has(name)) === true
    return false
  }

  return warning.code === 'INVALID_ANNOTATION'
    && warning.id?.includes('/node_modules/.cache/nuxt/.nuxt/dist/server/_nuxt/') === true
    && warning.message.includes('annotation that Rollup cannot interpret')
}
