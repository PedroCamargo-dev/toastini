import { ReactNode, useEffect } from 'react'
import '@/styles/styles.css'

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains('dark') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches &&
          !document.documentElement.classList.contains('light'))

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
  }, [])

  return <>{children}</>
}
