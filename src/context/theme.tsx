import {
  ThemeProvider as SThemeProvider,
  DefaultTheme,
} from 'styled-components'
import { ReactNode, useEffect, useState } from 'react'
import { lightTheme, darkTheme } from '@/styles/theme'

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [selectedTheme, setSelectedTheme] = useState<DefaultTheme>(() =>
    document.documentElement.classList.contains('dark')
      ? darkTheme
      : lightTheme,
  )

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

  return <SThemeProvider theme={selectedTheme}>{children}</SThemeProvider>
}
