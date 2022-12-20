import { defineTheme } from 'pinceau'

export default defineTheme({
  color: {
    text: {
      dark: '#374151',
      light: '#d6d3d1',
    },
    primary: {
      darkest: {
        value: '#0d9488',
      },
      darker: {
        value: '#11998e',
      },
      dark: {
        value: '#10b981',
      },
      light: {
        value: '#38ef7d',
      },
      lightest: {
        value: '#23e75e',
      },
    },
  },
  docus: {
    page: {
      maxWidth: '90rem'
    },
    header: { height: '104px' },
    footer: { height: '80px' },
  },
  prose: {
    ul: {
      listStyleType: 'none',
      padding: 0
    },
    a: {
      fontWeight: '400',
      borderStyle: 'none',
    },
    h1: {
      fontSize: '2.25rem',
      fontWeight: '600',
      marginBottom: '0.88em',
      marginTop: '0',
      lineHeight: '1.5'
    },
    h2: {
      fontSize: '1.5em',
      fontWeight: 700,
      lineHeight: 1.3333333,
      marginBottom: '1em',
      marginTop: '2em',
    },
    p: {
      margin: '1rem 0',
    }
  },
  // typography: {
  //   colors: {
  //     primary: {
  //       50: '{colors.primary.50}',
  //       100: '{colors.primary.100}',
  //       200: '{colors.primary.200}',
  //       300: '{colors.primary.300}',
  //       400: '{colors.primary.400}',
  //       500: '{colors.primary.500}',
  //       600: '{colors.primary.600}',
  //       700: '{colors.primary.700}',
  //       800: '{colors.primary.800}',
  //       900: '{colors.primary.900}'
  //     },
  //     secondary: {
  //       50: '{colors.gray.50}',
  //       100: '{colors.gray.100}',
  //       200: '{colors.gray.200}',
  //       300: '{colors.gray.300}',
  //       400: '{colors.gray.400}',
  //       500: '{colors.gray.500}',
  //       600: '{colors.gray.600}',
  //       700: '{colors.gray.700}',
  //       800: '{colors.gray.800}',
  //       900: '{colors.gray.900}'
  //     }
  //   }
  // },
  backdrop: {
    filter: 'blur(2px)',
  }
})
