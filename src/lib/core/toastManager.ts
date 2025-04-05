import { IToast } from '@/interfaces'
import { ToastListener } from '@/types'
import { generateId } from '@/utils'

class ToastManager {
  private toasts: IToast[] = []
  private listeners: ToastListener[] = []

  subscribe(listener: ToastListener) {
    this.listeners.push(listener)
    listener(this.toasts)
    return () => this.unsubscribe(listener)
  }

  unsubscribe(listener: ToastListener) {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.toasts))
  }

  show(toast: Omit<IToast, 'id'>) {
    const id = generateId()
    const newToast: IToast = { ...toast, id }
    this.toasts = [...this.toasts, newToast]
    this.notify()

    if (toast.autoClose !== false) {
      const timeout =
        typeof toast.autoClose === 'number' ? toast.autoClose : 5000
      setTimeout(() => this.remove(id), timeout)
    }

    return id
  }

  remove(id: string) {
    const toastToRemove = this.toasts.find((toast) => toast.id === id)
    if (toastToRemove && typeof toastToRemove.onClose === 'function') {
      toastToRemove.onClose()
    }
    this.toasts = this.toasts.filter((toast) => toast.id !== id)
    this.notify()
  }

  removeAll() {
    this.toasts = []
    this.notify()
  }

  getToasts() {
    return this.toasts
  }
}

export const toastManager = new ToastManager()
