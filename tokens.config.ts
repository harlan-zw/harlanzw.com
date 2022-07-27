import { defineTokens } from '@nuxtjs/design-tokens'

const defaultPalette = {
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
}

const melonPalette = {
  darkest: {
    value: '#5D2A42',
  },
  darker: {
    value: '#FB6376',
  },
  dark: {
    value: '#FB6376',
  },
  light: {
    value: '#FCB1A6',
  },
  lightest: {
    value: '#FFDCCC',
  },
}

const bluePalette = {
  darkest: {
    value: '#161925',
  },
  darker: {
    value: '#23395B',
  },
  dark: {
    value: '#23395B',
  },
  light: {
    value: '#406E8E',
  },
  lightest: {
    value: '#8EA8C3',
  },
}

export default defineTokens({
  colors: {
    primary: defaultPalette,
  },
})
