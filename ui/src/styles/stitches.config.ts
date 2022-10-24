import { indigo, red, slate } from '@radix-ui/colors'
import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...indigo,
      ...slate,
      ...red,
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
})
