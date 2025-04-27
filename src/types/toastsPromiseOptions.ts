import { ToastOptions } from './toastOptions'

export type ToastPromiseOptions<T = unknown, R = Error> = {
  loading?: string
  success?: string | ((data: T) => string)
  error?: string | ((error: R) => string)
  options?: Partial<ToastOptions>
  successOptions?: Partial<ToastOptions>
  errorOptions?: Partial<ToastOptions>
}
