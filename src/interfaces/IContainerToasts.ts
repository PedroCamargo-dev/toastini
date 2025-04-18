import { IToast } from './IToast'
import { IToastCustomization } from './IToastCustomization'

export interface IContainerToasts
  extends Omit<IToast, 'id'>,
    IToastCustomization {
  newestOnTop?: boolean
  limit?: number
}
