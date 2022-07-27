import { defineTokens, palette } from '@nuxtjs/design-tokens'

const defaultPalette = {
  darkest: {
    value: '#33e47f10'
  },
  dark: {
    value: '#11998e'
  },
  light: {
    value: '#38ef7d'
  },
  lightest: {
    value: '#23e75e'
  }
}

const melonPalette = {
  darkest: {
    value: '#5D2A42'
  },
  dark: {
    value: '#FB6376'
  },
  light: {
    value: '#FCB1A6'
  },
  lightest: {
    value: '#FFDCCC'
  }
}

const bluePalette = {
  darkest: {
    value: '#161925'
  },
  dark: {
    value: '#23395B'
  },
  light: {
    value: '#406E8E'
  },
  lightest: {
    value: '#8EA8C3'
  }
}

export default defineTokens({
  colors: {
    primary: defaultPalette
  }
})
