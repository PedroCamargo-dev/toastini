import { ToastPosition, ToastType } from '@/types'
import { IToastClassNames } from './IToastClassNames'
import { IToastStyles } from './IToastStyles'

export interface IToast
  extends Omit<IToastClassNames, 'wrapperClassName' | 'itemClassName'>,
    IToastStyles {
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
