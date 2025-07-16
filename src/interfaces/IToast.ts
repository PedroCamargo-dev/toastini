import { ToastPosition, ToastType } from '@/types'
import { IToastAction } from './IToastAction'
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
  showProgressBar?: boolean
  onClose?: () => void
  actions?: IToastAction[]
}
