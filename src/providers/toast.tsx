import { ReactNode, useEffect } from 'react'

interface ToastProviderProps {
  children: ReactNode
  theme?: 'light' | 'dark'
}

export const ToastProvider = ({ children, theme }: ToastProviderProps) => {
  useEffect(() => {
    const updateTheme = () => {
      let isDarkMode: boolean

      if (theme === 'dark') {
        isDarkMode = true
      } else if (theme === 'light') {
        isDarkMode = false
      } else {
        isDarkMode =
          document.documentElement.classList.contains('dark') ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches &&
            !document.documentElement.classList.contains('light'))
      }

      document.documentElement.setAttribute(
        'data-theme',
        isDarkMode ? 'dark' : 'light',
      )
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

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = () => updateTheme()
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [theme])

  return <>{children}</>
}
