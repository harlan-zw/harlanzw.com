import antfu from '@antfu/eslint-config'
import { harlanzw } from 'eslint-plugin-harlanzw'

export default antfu(
  {},
  // `base` carries the shared ignore set and node-globals overrides that used to
  // be inlined here. `.data/**` and `worker-configuration.d.ts` come from that
  // set; `content/**` is repo specific, so it goes through `ignores`.
  ...harlanzw({
    base: { type: 'app', ignores: ['content/**'] },
  }),
)
