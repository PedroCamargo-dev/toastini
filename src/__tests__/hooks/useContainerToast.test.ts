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
})
