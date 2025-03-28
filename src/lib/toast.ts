import { IToastProps } from "../interfaces";
import { ToastOptions } from "../types";
import { toastManager } from "./core/toastManager";

export const toast = {
  show: (toast: Omit<IToastProps, "id">) => toastManager.show(toast),
  success: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: "success", ...options }),
  error: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: "error", ...options }),
  info: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: "info", ...options }),
  warning: (title: string, options?: Partial<ToastOptions>) =>
    toastManager.show({ title, type: "warning", ...options }),
  remove: (id: string) => toastManager.remove(id),
  removeAll: () => toastManager.removeAll(),
};
