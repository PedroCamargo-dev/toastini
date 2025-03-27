import { ToastType } from "../types";

export interface IToastCardProps {
  title?: string;
  description?: React.ReactNode;
  type?: ToastType;
  onClose?: () => void;
}
