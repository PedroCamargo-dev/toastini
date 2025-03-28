import { IToastProps } from '@/interfaces'

export type ToastOptions = Partial<Omit<IToastProps, 'id' | 'title' | 'type'>>
