import { IToast } from '@/interfaces'
import { toast } from '@/lib/toast'
import { toastManager } from '@/lib/core/toastManager'

jest.mock('@/lib/core/toastManager', () => ({
  toastManager: {
    show: jest.fn(),
    remove: jest.fn(),
    removeAll: jest.fn(),
  },
}))

describe('toast', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call toastManager.show with the correct parameters for show', () => {
    const toastData: Omit<IToast, 'id'> = { title: 'Test Toast', type: 'info' }
    toast.show(toastData)

    expect(toastManager.show).toHaveBeenCalledWith(toastData)
  })

  it('should call toastManager.show with type "success" for success', () => {
    toast.success('Success Toast', { autoClose: 3000 })

    expect(toastManager.show).toHaveBeenCalledWith({
      title: 'Success Toast',
      type: 'success',
      autoClose: 3000,
    })
  })

  it('should call toastManager.show with type "error" for error', () => {
    toast.error('Error Toast', { autoClose: 5000 })

    expect(toastManager.show).toHaveBeenCalledWith({
      title: 'Error Toast',
      type: 'error',
      autoClose: 5000,
    })
  })

  it('should call toastManager.show with type "info" for info', () => {
    toast.info('Info Toast', { autoClose: 2000 })

    expect(toastManager.show).toHaveBeenCalledWith({
      title: 'Info Toast',
      type: 'info',
      autoClose: 2000,
    })
  })

  it('should call toastManager.show with type "warning" for warning', () => {
    toast.warning('Warning Toast', { autoClose: 4000 })

    expect(toastManager.show).toHaveBeenCalledWith({
      title: 'Warning Toast',
      type: 'warning',
      autoClose: 4000,
    })
  })

  it('should call toastManager.show with type "default" for default', () => {
    toast.default('Default Toast', { autoClose: 1000 })

    expect(toastManager.show).toHaveBeenCalledWith({
      title: 'Default Toast',
      type: 'default',
      autoClose: 1000,
    })
  })

  it('should call toastManager.remove with the correct id for remove', () => {
    const toastId = '123'
    toast.remove(toastId)

    expect(toastManager.remove).toHaveBeenCalledWith(toastId)
  })

  it('should call toastManager.removeAll for removeAll', () => {
    toast.removeAll()

    expect(toastManager.removeAll).toHaveBeenCalled()
  })

  it('should call toastManager.update with success info when promise resolves', async () => {
    ;(toastManager as jest.Mocked<typeof toastManager>).update = jest.fn()

    const promise = Promise.resolve('data')
    const result = await toast.promise(promise)

    expect(toastManager.show).toHaveBeenCalledWith({
      title: 'Carregando...',
      type: 'promise',
    })

    expect(toastManager.update).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        title: 'Operação concluída!',
        type: 'success',
      }),
    )

    expect(result).toBe('data')
  })

  it('should call toastManager.update with error info when promise rejects', async () => {
    ;(toastManager as jest.Mocked<typeof toastManager>).update = jest.fn()
    const testError = new Error('Test error')
    const promise = Promise.reject(testError)

    await expect(toast.promise(promise)).rejects.toThrow(testError)

    expect(toastManager.show).toHaveBeenCalledWith({
      title: 'Carregando...',
      type: 'promise',
    })

    expect(toastManager.update).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        title: 'Ocorreu um erro!',
        type: 'error',
      }),
    )
  })

  it('should accept custom messages for promise toast', async () => {
    ;(toastManager as jest.Mocked<typeof toastManager>).update = jest.fn()
    const promise = Promise.resolve({ name: 'Test' })

    await toast.promise(promise, {
      loading: 'Custom loading',
      success: (data) => `Success with ${data.name}`,
      error: 'Custom error',
      options: { autoClose: 5000 },
    })

    expect(toastManager.show).toHaveBeenCalledWith({
      title: 'Custom loading',
      type: 'promise',
      autoClose: 5000,
    })

    expect(toastManager.update).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        title: 'Success with Test',
        type: 'success',
        autoClose: expect.any(Number),
      }),
    )
  })

  it('should use custom error function when promise rejects', async () => {
    ;(toastManager as jest.Mocked<typeof toastManager>).update = jest.fn()
    const testError = new Error('Test error message')
    const promise = Promise.reject(testError)

    try {
      await toast.promise(promise, {
        error: (err) => `Error: ${err.message}`,
      })
    } catch {
      //
    }

    expect(toastManager.update).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        title: 'Error: Test error message',
        type: 'error',
      }),
    )
  })
})
