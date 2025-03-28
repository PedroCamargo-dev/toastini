import { ToastPosition } from "../types";

export interface IToastContainerProps {
  position?: ToastPosition;
  autoClose?: boolean | number;
  closeOnClick?: boolean;
  draggable?: boolean;
  newestOnTop?: boolean;
  limit?: number;
  margin?: number;
  style?: React.CSSProperties;
  toastStyle?: React.CSSProperties;
}
