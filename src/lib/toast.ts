import { IToast } from '../interfaces'
import { ToastOptions, ToastPromiseOptions } from '../types'
import { toastManager } from './core/toastManager'

export const toast = {
  show: (toast: Omit<IToast, 'id'>) => toastManager.show(toast),
  success: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: 'success', ...options }),
  error: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: 'error', ...options }),
  info: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: 'info', ...options }),
  warning: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: 'warning', ...options }),
  remove: (id: string) => toastManager.remove(id),
  removeAll: () => toastManager.removeAll(),
  default: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: 'default', ...options }),
  promise: async <T = unknown, R = Error>(
    promise: Promise<T>,
    {
      loading = 'Carregando...',
      success = 'Operação concluída!',
      error = 'Ocorreu um erro!',
      options = {},
      successOptions = {},
      errorOptions = {},
    }: ToastPromiseOptions<T, R> = {},
  ): Promise<T> => {
    const toastId = toastManager.show({
      title: loading,
      type: 'promise',
      ...options,
    })

    try {
      const data = await promise
      const successMessage =
        typeof success === 'function' ? success(data) : success
      toastManager.update(toastId, {
        title: successMessage,
        type: 'success',
        ...options,
        ...successOptions,
      })
      return data
    } catch (err) {
      const typedError = err as R
      const errorMessage =
        typeof error === 'function' ? error(typedError) : error
      toastManager.update(toastId, {
        title: errorMessage,
        type: 'error',
        ...options,
        ...errorOptions,
      })
      throw typedError
    }
  },
}
