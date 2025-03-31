import { IToast } from './IToast'

export interface IToastContainer extends IToast {
  newestOnTop?: boolean
  limit?: number
  margin?: number
}
