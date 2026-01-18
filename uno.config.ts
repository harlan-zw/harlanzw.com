import { defineConfig, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography({
      cssExtend: {
        maxWidth: '100%',
        lineHeight: '1.3',
        img: {
          height: 'auto',
        },
        a: {
          color: 'inherit',
          fontWeight: '400',
          textDecoration: 'none',
        },
        h1: {
          color: '#374151', // gray-800
          fontWeight: '600',
          fontFamily: '"Work Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          lineHeight: '1.3',
        },
        h2: {
          color: '#374151',
          fontFamily: '"Work Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
        h3: {
          color: '#374151',
          fontFamily: '"Work Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
        h4: {
          color: '#374151',
          fontWeight: '600',
          fontSize: '1.5rem',
          lineHeight: '2rem',
          fontFamily: '"Work Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          textDecoration: 'underline',
        },
        blockquote: {
          fontWeight: '400',
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: {
    'bg-clip-text': 'bg-clip-text text-transparent',
  },
  theme: {
    colors: {
      gray: {
        800: '#374151',
      },
    },
    animation: {
      keyframes: {
        fadeIn: '{0%{opacity:0}100%{opacity:1}}',
      },
      durations: {
        fadeIn: '200ms',
      },
      timingFns: {
        fadeIn: 'ease-in',
      },
      counts: {
        fadeIn: '1',
      },
    },
    fontFamily: {
      sans: '"Work Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      header: '"Work Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
  },
})
