import { IToast } from './IToast'
import { IToastClassNames } from './IToastClassNames'

export interface IContainerToast extends IToast, IToastClassNames {
  onRemove: () => void
}
