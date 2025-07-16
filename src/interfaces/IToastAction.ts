import { ButtonHTMLAttributes } from 'react'
import { ToastType } from '@/types'

export interface IToastAction
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  variant?: ToastType
}
