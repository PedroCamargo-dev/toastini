import { IToastProps } from "../interfaces";
import { toastCore } from "./core/toast";

type ToastOptions = Partial<Omit<IToastProps, "id" | "title" | "type">>;

export const toast = {
  show: (toast: Omit<IToastProps, "id">) => toastCore.show(toast),
  success: (title: string, options?: Partial<ToastOptions>) =>
    toastCore.show({ title, type: "success", ...options }),
  error: (title: string, options?: Partial<ToastOptions>) =>
    toastCore.show({ title, type: "error", ...options }),
  info: (title: string, options?: Partial<ToastOptions>) =>
    toastCore.show({ title, type: "info", ...options }),
  warning: (title: string, options?: Partial<ToastOptions>) =>
    toastCore.show({ title, type: "warning", ...options }),
  remove: (id: string) => toastCore.remove(id),
  removeAll: () => toastCore.removeAll(),
};
