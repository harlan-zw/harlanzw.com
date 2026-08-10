import antfu from '@antfu/eslint-config'
import harlanzw from 'eslint-plugin-harlanzw'

export default antfu({
  ignores: [
    '.data/**',
    'content/**',
    'worker-configuration.d.ts',
  ],
  rules: {
    'node/prefer-global/buffer': 'off',
    'node/prefer-global/process': 'off',
  },
}, ...harlanzw())
