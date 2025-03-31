import { IToastContainer } from './IToastContainer'
import { IToastStyles } from './IToastStyles'

export interface IContainerToasts
  extends Omit<IToastContainer, 'id'>,
    IToastStyles {}
