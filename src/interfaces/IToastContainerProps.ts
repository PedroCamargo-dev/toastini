import { ToastPosition } from "../types";

export interface IToastContainerProps {
  position?: ToastPosition;
  autoClose?: boolean | number;
  closeOnClick?: boolean;
  draggable?: boolean;
  newestOnTop?: boolean;
  limit?: number;
  margin?: number;
  className?: string;
  toastClassName?: string;
}
