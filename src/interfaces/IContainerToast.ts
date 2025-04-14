import { IToast } from './IToast'

export interface IContainerToast extends IToast {
  onRemove: () => void
}
