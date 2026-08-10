export interface BuildWarning {
  code?: string
  id?: string
  ids?: string[]
  message: string
  names?: string[]
}

export function isExpectedNitroBuildWarning(warning: BuildWarning): boolean {
  if (warning.code === 'CIRCULAR_DEPENDENCY' || warning.code === 'EVAL')
    return true

  if (warning.message.includes('Unsupported source map comment'))
    return true

  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
    return warning.ids?.some(id => id.endsWith('/node_modules/@nuxt/nitro-server/dist/h3.mjs')) === true
      && warning.names?.includes('H3Event') === true
  }

  return warning.code === 'INVALID_ANNOTATION'
    && warning.id?.includes('/node_modules/.cache/nuxt/.nuxt/dist/server/_nuxt/') === true
    && warning.message.includes('annotation that Rollup cannot interpret')
}
