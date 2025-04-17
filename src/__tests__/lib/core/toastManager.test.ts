import { toastManager } from '@/lib/core'

describe('ToastManager', () => {
  beforeEach(() => {
    toastManager.removeAll()
  })

  it('should subscribe and notify listeners', () => {
    const listener = jest.fn()
    toastManager.subscribe(listener)

    expect(listener).toHaveBeenCalledWith([])
  })

  it('should unsubscribe listeners', () => {
    const listener = jest.fn()
    const unsubscribe = toastManager.subscribe(listener)

    unsubscribe()
    toastManager.show({ title: 'Test Toast' })

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should add a toast and notify listeners', () => {
    const listener = jest.fn()
    toastManager.subscribe(listener)

    const toast = { title: 'Test Toast' }
    toastManager.show(toast)

    expect(listener).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Test Toast' }),
      ]),
    )
  })

  it('should remove a toast and notify listeners', () => {
    const listener = jest.fn()
    toastManager.subscribe(listener)

    const id = toastManager.show({ title: 'Test Toast' })
    toastManager.remove(id)

    expect(listener).toHaveBeenCalledWith([])
  })

  it('should remove all toasts and notify listeners', () => {
    const listener = jest.fn()
    toastManager.subscribe(listener)

    toastManager.show({ title: 'Toast 1' })
    toastManager.show({ title: 'Toast 2' })
    toastManager.removeAll()

    expect(listener).toHaveBeenCalledWith([])
  })

  it('should call onClose when a toast is removed', () => {
    const onClose = jest.fn()
    const id = toastManager.show({ title: 'Test Toast', onClose })

    toastManager.remove(id)

    expect(onClose).toHaveBeenCalled()
  })

  it('should auto-close a toast after the specified timeout', async () => {
    jest.useFakeTimers()
    const listener = jest.fn()
    toastManager.subscribe(listener)

    toastManager.show({
      title: 'Auto-close Toast',
      autoClose: 1000,
    })

    jest.advanceTimersByTime(1000)

    expect(listener).toHaveBeenCalledWith([])
    jest.useRealTimers()
  })

  it('should not auto-close a toast if autoClose is false', () => {
    jest.useFakeTimers()
    const listener = jest.fn()
    toastManager.subscribe(listener)

    toastManager.show({ title: 'Persistent Toast', autoClose: false })

    jest.advanceTimersByTime(5000)

    expect(listener).toHaveBeenCalledTimes(2)
    jest.useRealTimers()
  })

  it('should return all current toasts', () => {
    toastManager.show({ description: 'Toast 1' })
    toastManager.show({ description: 'Toast 2' })

    const toasts = toastManager.getToasts()

    expect(toasts).toHaveLength(2)
    expect(toasts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ description: 'Toast 1' }),
        expect.objectContaining({ description: 'Toast 2' }),
      ]),
    )
  })

  it('should update a toast and notify listeners', () => {
    const listener = jest.fn()
    toastManager.subscribe(listener)

    const id = toastManager.show({ title: 'Test Toast' })
    toastManager.update(id, { title: 'Updated Toast' })

    expect(listener).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Updated Toast' }),
      ]),
    )
  })

  it('should not update a toast if the ID does not exist', () => {
    const listener = jest.fn()
    toastManager.subscribe(listener)

    const id = 'non-existent-id'
    toastManager.update(id, { title: 'Updated Toast' })

    expect(listener).toHaveBeenCalledWith([])
  })
})
