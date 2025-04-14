import { render } from '@testing-library/react'
import { ToastProvider } from '@/providers'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

describe('ToastProvider', () => {
  it('sets the theme to dark when theme prop is "dark"', () => {
    render(
      <ToastProvider theme="dark">
        <div />
      </ToastProvider>,
    )
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('sets the theme to light when theme prop is "light"', () => {
    render(
      <ToastProvider theme="light">
        <div />
      </ToastProvider>,
    )
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('defaults to system preference when theme prop is not provided', () => {
    const matchMediaMock = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))
    window.matchMedia = matchMediaMock

    render(
      <ToastProvider>
        <div />
      </ToastProvider>,
    )

    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    expect(document.documentElement.getAttribute('data-theme')).toBe(systemPref)
    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
  })

  it('updates theme when system preference changes', () => {
    const listeners: Record<string, EventListener> = {}

    let currentMatch = true
    const mediaQueryList = {
      get matches() {
        return currentMatch
      },
      set matches(value: boolean) {
        currentMatch = value
      },
      addEventListener: (
        event: string,
        listener: EventListenerOrEventListenerObject,
      ) => {
        listeners[event] = listener as EventListener
      },
      removeEventListener: jest.fn(),
    }

    window.matchMedia = jest.fn().mockImplementation(() => mediaQueryList)

    render(
      <ToastProvider>
        <div />
      </ToastProvider>,
    )

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    mediaQueryList.matches = false
    listeners.change(new Event('change'))

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('triggers updateTheme when document class changes via MutationObserver', () => {
    const observeMock = jest.fn()
    const disconnectMock = jest.fn()

    class MutationObserverMock {
      callback: MutationCallback

      constructor(callback: MutationCallback) {
        this.callback = callback
      }

      observe = observeMock
      disconnect = disconnectMock
      takeRecords = () => []

      trigger() {
        const mutation: MutationRecord = {
          type: 'attributes',
          target: document.documentElement,
          attributeName: 'class',
          oldValue: null,
          addedNodes: document.createDocumentFragment().childNodes,
          removedNodes: document.createDocumentFragment().childNodes,
          nextSibling: null,
          previousSibling: null,
          attributeNamespace: null,
        }
        this.callback([mutation], this as unknown as MutationObserver)
      }
    }

    globalThis.MutationObserver =
      MutationObserverMock as unknown as typeof MutationObserver

    render(
      <ToastProvider>
        <div />
      </ToastProvider>,
    )

    const instance = (MutationObserverMock as unknown as jest.Mock).mock
      ?.instances?.[0]

    if (instance) {
      document.documentElement.classList.add('light')
      instance.trigger()
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')

      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      instance.trigger()
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

      expect(observeMock).toHaveBeenCalled()
    }
  })

  it('cleans up MutationObserver and media query listener on unmount', () => {
    const disconnectMock = jest.fn()
    const removeEventListenerMock = jest.fn()

    class MutationObserverMock {
      disconnect = disconnectMock
      observe = jest.fn()
    }

    globalThis.MutationObserver =
      MutationObserverMock as unknown as typeof MutationObserver

    const mediaQueryList = {
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
    }

    window.matchMedia = jest.fn().mockImplementation(() => mediaQueryList)

    const { unmount } = render(
      <ToastProvider>
        <div />
      </ToastProvider>,
    )

    unmount()

    expect(disconnectMock).toHaveBeenCalled()
    expect(removeEventListenerMock).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    )
  })
})
