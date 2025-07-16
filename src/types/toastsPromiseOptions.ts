import { ToastOptions } from './toastOptions'

type ToastPromiseMessages = {
  title?: string
  description?: string
}

export type ToastPromiseOptions<T = unknown, R = Error> = {
  loading?: string
  success?: string | ((data: T) => string) | ToastPromiseMessages
  error?: string | ((error: R) => string) | ToastPromiseMessages
  options?: Partial<ToastOptions>
  successOptions?: Partial<ToastOptions>
  errorOptions?: Partial<ToastOptions>
}
