import { IToast } from '@/interfaces'

export type ToastOptions = Partial<Omit<IToast, 'id' | 'title' | 'type'>>
