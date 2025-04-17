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
})
