import { renderHook } from '@testing-library/react'
import { useContainerToasts } from '@/hooks/useContainerToasts'
import { toastManager } from '@/lib/core'
import { IToast } from '@/interfaces'

jest.mock('@/lib/core', () => ({
  toastManager: {
    subscribe: jest.fn().mockImplementation(() => jest.fn()),
  },
}))

describe('useContainerToasts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() =>
      useContainerToasts({ limit: undefined }),
    )
    expect(result.current.mounted).toBe(true)
    expect(result.current.toasts).toEqual([])
    expect(result.current.groupedToasts).toEqual({
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    })
  })

  it('should subscribe to toastManager on mount and unsubscribe on unmount', () => {
    const unsubscribeMock = jest.fn()
    const subscribeSpy = jest
      .spyOn(toastManager, 'subscribe')
      .mockReturnValue(unsubscribeMock)

    const { unmount } = renderHook(() =>
      useContainerToasts({ limit: undefined }),
    )

    expect(subscribeSpy).toHaveBeenCalledTimes(1)
    expect(subscribeSpy).toHaveBeenCalledWith(expect.any(Function))

    unmount()
    expect(unsubscribeMock).toHaveBeenCalledTimes(1)
  })

  it('should limit the number of visible toasts if limit is provided', () => {
    const mockToasts: IToast[] = [
      { id: '1', description: 'Toast 1', position: 'top-left' },
      { id: '2', description: 'Toast 2', position: 'top-right' },
      { id: '3', description: 'Toast 3', position: 'bottom-left' },
    ]
    ;(toastManager.subscribe as jest.Mock).mockImplementation((callback) => {
      callback(mockToasts)
      return jest.fn()
    })

    const { result } = renderHook(() => useContainerToasts({ limit: 2 }))
    expect(result.current.toasts).toEqual(mockToasts)
    expect(result.current.groupedToasts).toEqual({
      'top-left': [{ id: '1', description: 'Toast 1', position: 'top-left' }],
      'top-center': [],
      'top-right': [{ id: '2', description: 'Toast 2', position: 'top-right' }],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    })
  })

  it('should group toasts by position', () => {
    const mockToasts: IToast[] = [
      { id: '1', description: 'Toast 1', position: 'top-left' },
      { id: '2', description: 'Toast 2', position: 'top-left' },
      { id: '3', description: 'Toast 3', position: 'bottom-right' },
    ]
    ;(toastManager.subscribe as jest.Mock).mockImplementation((callback) => {
      callback(mockToasts)
      return jest.fn()
    })

    const { result } = renderHook(() =>
      useContainerToasts({ limit: undefined }),
    )
    expect(result.current.groupedToasts).toEqual({
      'top-left': [
        { id: '1', description: 'Toast 1', position: 'top-left' },
        { id: '2', description: 'Toast 2', position: 'top-left' },
      ],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [
        { id: '3', description: 'Toast 3', position: 'bottom-right' },
      ],
    })
  })
})
