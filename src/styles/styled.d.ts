import 'styled-components'

declare module 'styled-components' {
  export interface IThemeToast {
    colors: {
      success: {
        background: string
        border: string
        text: string
      }
      error: {
        background: string
        border: string
        text: string
      }
      info: {
        background: string
        border: string
        text: string
      }
      warning: {
        background: string
        border: string
        text: string
      }
      default: {
        background: string
        border: string
        text: string
      }
    }
  }
}
