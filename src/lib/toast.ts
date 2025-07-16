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
      success,
      error,
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
      const successResult =
        typeof success === 'function'
          ? success(data)
          : (success ?? { description: 'Operação concluída!' })

      const successUpdate =
        typeof successResult === 'string'
          ? { title: 'Sucesso', description: successResult }
          : {
              title: successResult.title ?? 'Sucesso',
              description: successResult.description,
            }
      toastManager.update(toastId, {
        ...successUpdate,
        type: 'success',
        ...options,
        ...successOptions,
      })
      return data
    } catch (err) {
      const typedError = err as R
      const errorResult =
        typeof error === 'function'
          ? error(typedError)
          : (error ?? { description: 'Ocorreu um erro!' })

      const errorUpdate =
        typeof errorResult === 'string'
          ? { title: 'Erro', description: errorResult }
          : {
              title: errorResult.title ?? 'Erro',
              description: errorResult.description,
            }
      toastManager.update(toastId, {
        ...errorUpdate,
        type: 'error',
        ...options,
        ...errorOptions,
      })
      throw typedError
    }
  },
}
