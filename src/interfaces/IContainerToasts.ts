import { IToastContainer } from './IToastContainer'
import { IToastClassNames } from './IToastClassNames'

export interface IContainerToasts
  extends Omit<IToastContainer, 'id'>,
    IToastClassNames {}
