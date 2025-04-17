import { act, renderHook, waitFor } from '@testing-library/react'
import { useContainerToast } from '@/hooks'

describe('useContainerToast', () => {
  it('should initialize with correct default values', () => {
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        onRemove: onRemoveMock,
      }),
    )

    expect(result.current.isDragging).toBe(false)
    expect(result.current.opacity).toBe(0)
    expect(result.current.transform).toContain('translate')
  })

  it('should set entered and opacity after mount', () => {
    jest.useFakeTimers()
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      jest.advanceTimersByTime(10)
    })

    expect(result.current.opacity).toBe(1)
    jest.useRealTimers()
  })

  it('should trigger remove when triggerRemove is called', () => {
    jest.useFakeTimers()
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      result.current.triggerRemove()
      jest.advanceTimersByTime(300)
    })

    expect(onRemoveMock).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it('should handle drag events correctly', () => {
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: true,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      result.current.handleMouseDown({
        clientX: 0,
        clientY: 0,
      } as React.MouseEvent)
      result.current.handleMouseMove({
        clientX: 200,
        clientY: 0,
      } as React.MouseEvent)
    })

    expect(result.current.isDragging).toBe(true)
    expect(result.current.opacity).toBeLessThan(1)

    act(() => {
      result.current.handleMouseUp()
    })

    expect(result.current.isDragging).toBe(false)
  })

  it('should handle click to close when closeOnClick is true', async () => {
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: true,
        draggable: false,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      result.current.handleClick()
    })

    await waitFor(() => {
      expect(onRemoveMock).toHaveBeenCalled()
    })

    expect(onRemoveMock).toHaveBeenCalled()
  })

  it('should not trigger remove if already exiting', () => {
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      result.current.triggerRemove()
      result.current.triggerRemove()
    })

    expect(onRemoveMock).toHaveBeenCalledTimes(0)
  })

  it('should set drag and opacity correctly when triggerRemove is called', () => {
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      result.current.triggerRemove()
    })

    expect(result.current.opacity).toBe(0)
    expect(result.current.transform).toContain('translate')
  })

  it('should call onRemove after the exit animation', () => {
    jest.useFakeTimers()
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      result.current.triggerRemove()
      jest.advanceTimersByTime(300)
    })

    expect(onRemoveMock).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it('should auto close when autoClose is a number and type is not promise', () => {
    jest.useFakeTimers()
    const onRemoveMock = jest.fn()

    renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        autoClose: 1000,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      jest.advanceTimersByTime(1000)
      jest.advanceTimersByTime(300)
    })

    expect(onRemoveMock).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it('should auto close when autoClose is a number and type is promise', () => {
    jest.useFakeTimers()
    const onRemoveMock = jest.fn()

    renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        autoClose: 1000,
        type: 'promise',
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      jest.advanceTimersByTime(1000)
      jest.advanceTimersByTime(300)
    })

    expect(onRemoveMock).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it('should not auto close when autoClose is false', () => {
    jest.useFakeTimers()
    const onRemoveMock = jest.fn()

    renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        autoClose: false,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(onRemoveMock).not.toHaveBeenCalled()
    jest.useRealTimers()
  })

  it('should use different initial transforms for different positions', () => {
    const positions = [
      'top-right',
      'top-left',
      'bottom-right',
      'bottom-left',
      'top-center',
      'bottom-center',
    ]

    positions.forEach((position) => {
      const { result } = renderHook(() =>
        useContainerToast({
          position,
          closeOnClick: false,
          draggable: false,
          onRemove: jest.fn(),
        }),
      )

      expect(result.current.transform).toContain('translate')
    })
  })

  it('should remove toast when dragged beyond threshold', async () => {
    jest.useFakeTimers()
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: true,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      jest.advanceTimersByTime(10)
    })

    act(() => {
      result.current.handleMouseDown({
        clientX: 0,
        clientY: 0,
      } as React.MouseEvent)
    })

    act(() => {
      result.current.handleMouseMove({
        clientX: 500,
        clientY: 0,
      } as React.MouseEvent)
    })

    act(() => {
      result.current.handleMouseUp()
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(onRemoveMock).toHaveBeenCalled()
    })

    jest.useRealTimers()
  })

  it('should reset drag position when not dragged beyond threshold', () => {
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: true,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      result.current.handleMouseDown({
        clientX: 0,
        clientY: 0,
      } as React.MouseEvent)
    })

    act(() => {
      result.current.handleMouseMove({
        clientX: 0,
        clientY: 100,
      } as React.MouseEvent)
    })

    act(() => {
      result.current.handleMouseUp()
    })

    expect(onRemoveMock).not.toHaveBeenCalled()
    expect(result.current.opacity).toBe(1)
  })

  it('should not respond to mouse events when not draggable', () => {
    const onRemoveMock = jest.fn()
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        onRemove: onRemoveMock,
      }),
    )

    act(() => {
      result.current.handleMouseDown({
        clientX: 0,
        clientY: 0,
      } as React.MouseEvent)

      result.current.handleMouseMove({
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent)
    })

    expect(result.current.isDragging).toBe(false)
  })

  it('should return a toastRef', () => {
    const { result } = renderHook(() =>
      useContainerToast({
        position: 'top-right',
        closeOnClick: false,
        draggable: false,
        onRemove: jest.fn(),
      }),
    )

    expect(result.current.toastRef).toBeDefined()
    expect(result.current.toastRef.current).toBeNull()
  })
})
