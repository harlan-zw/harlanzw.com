import { NitroAppPlugin } from 'nitropack'
import { ProjectIcons } from './content/project-icons'

export const ContentPostProcess: NitroAppPlugin = (nitroApp) => {
  console.log('nitro plugin 2')
  nitroApp.hooks.hook('content:file:afterParse', async (content) => {
    const plugins = [
      ProjectIcons,
    ]
    for(const plugin of plugins) {
      content = await plugin(content)
    }
  })
}

export default ContentPostProcess
