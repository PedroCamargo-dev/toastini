import {
  ThemeProvider as SThemeProvider,
  DefaultTheme,
} from 'styled-components'
import { ReactNode, useEffect, useState } from 'react'
import { lightTheme, darkTheme } from '@/styles/theme'

interface ToastProviderProps {
  children: ReactNode
  customTheme?: Partial<DefaultTheme>
}

export const ToastProvider = ({
  children,
  customTheme,
}: ToastProviderProps) => {
  const [selectedTheme, setSelectedTheme] = useState<DefaultTheme>(lightTheme)

  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setSelectedTheme((prevTheme) => {
        if (isDarkMode) {
          return prevTheme !== darkTheme ? darkTheme : prevTheme
        } else {
          return prevTheme !== lightTheme ? lightTheme : prevTheme
        }
      })
    }

    updateTheme()

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          updateTheme()
          break
        }
      }
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  const mergedTheme: DefaultTheme = {
    ...selectedTheme,
    colors: {
      ...selectedTheme.colors,
      ...(customTheme?.colors || {}),
    },
  }

  return <SThemeProvider theme={mergedTheme}>{children}</SThemeProvider>
}
