import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  plugins: [
    require('windicss/plugin/forms'),
    typography({
      // Turns text color to light, when dark mode enabled. Default = false
      dark: true,
    }),
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 200ms ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      fontFamily: {
        sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        header: 'Dosis, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            lineHeight: 1.3,
            a: {
              textDecoration: 'none',
            },
            h1: {
              color: theme('colors.gray.800'),
              fontWeight: '600',
              fontFamily: theme('fontFamily.header'),
              lineHeight: 1.3,
            },
            h2: {
              color: theme('colors.gray.800'),
              fontFamily: theme('fontFamily.header'),
            },
            h3: {
              color: theme('colors.gray.800'),
              fontFamily: theme('fontFamily.header'),
            },
            h4: {
              color: theme('colors.gray.800'),
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              fontFamily: theme('fontFamily.header'),
              textDecoration: 'underline',
            },
            blockquote: {
              fontWeight: '400',
            },
          },
        },
        xl: {
          css: {
            h1: {
              lineHeight: 1.3,
            },
          },
        },
      }),
    },
  },
})
