import { ToastPosition, ToastType } from '@/types'
import { IToastCustomization } from './IToastCustomization'

export interface IToast
  extends Omit<IToastCustomization, 'wrapperClassName' | 'itemClassName'> {
  id: string
  title?: string
  description?: React.ReactNode
  type?: ToastType
  position?: ToastPosition
  autoClose?: boolean | number
  closeOnClick?: boolean
  draggable?: boolean
  onClose?: () => void
}
