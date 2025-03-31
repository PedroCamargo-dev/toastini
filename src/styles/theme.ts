import { IThemeToast } from 'styled-components'

export const lightTheme: IThemeToast = {
  colors: {
    success: {
      background: 'rgb(240 253 244)',
      border: 'rgb(187 247 208)',
      text: 'rgb(22 163 74)',
    },
    error: {
      background: 'rgb(254 242 242)',
      border: 'rgb(254 202 202)',
      text: 'rgb(220 38 38)',
    },
    info: {
      background: 'rgb(239 246 255)',
      border: 'rgb(191 219 254)',
      text: 'rgb(37 99 235)',
    },
    warning: {
      background: 'rgb(255 251 235)',
      border: 'rgb(253 230 138)',
      text: 'rgb(217 119 6)',
    },
    default: {
      background: 'rgb(249 250 251)',
      border: 'rgb(229 231 235)',
      text: 'rgb(17 24 39)',
    },
  },
}

export const darkTheme: IThemeToast = {
  colors: {
    success: {
      background: 'rgba(5, 150, 105, 0.3)',
      border: 'rgb(22 163 74)',
      text: 'rgb(187 247 208)',
    },
    error: {
      background: 'rgba(220, 38, 38, 0.3)',
      border: 'rgb(153 27 27)',
      text: 'rgb(254 202 202)',
    },
    info: {
      background: 'rgba(37, 99, 235, 0.3)',
      border: 'rgb(30 64 175)',
      text: 'rgb(191 219 254)',
    },
    warning: {
      background: 'rgba(217, 119, 6, 0.3)',
      border: 'rgb(120 53 15)',
      text: 'rgb(253 230 138)',
    },
    default: {
      background: 'rgba(17, 24, 39, 0.3)',
      border: 'rgb(31 41 55)',
      text: 'rgb(229 231 235)',
    },
  },
}
