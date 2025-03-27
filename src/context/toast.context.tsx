import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import type { IToastProps } from "../interfaces";

interface ToastContextProps {
  toasts: IToastProps[];
  addToast: (toast: Omit<IToastProps, "id">) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<IToastProps[]>([]);
  const toastIdCounter = useRef(0);

  const addToast = useCallback((toast: Omit<IToastProps, "id">) => {
    const id = `toast-${toastIdCounter.current++}`;
    const newToast: IToastProps = {
      ...toast,
      id,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (toast.autoClose !== false) {
      const autoCloseTime =
        typeof toast.autoClose === "number" ? toast.autoClose : 5000;
      setTimeout(() => {
        removeToast(id);
      }, autoCloseTime);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const valueToastContext = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      removeAllToasts,
    }),
    [toasts, addToast, removeToast, removeAllToasts]
  );

  return (
    <ToastContext.Provider value={valueToastContext}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
