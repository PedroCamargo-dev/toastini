import { IToast } from './IToast'
import { IToastStyles } from './IToastStyles'

export interface IContainerToast extends IToast, IToastStyles {
  onRemove: () => void
}
