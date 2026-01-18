import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['content/**'],
  rules: {
    'no-use-before-define': 'off',
  },
})
