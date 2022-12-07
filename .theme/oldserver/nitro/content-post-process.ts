import { NitroAppPlugin } from 'nitropack'

export const ContentPostProcess: NitroAppPlugin = (nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', async (content) => {

  })
}

export default ContentPostProcess
