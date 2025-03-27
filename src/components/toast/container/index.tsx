import { useState, useEffect, JSX } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/utils";
import { Toast } from "../toast";
import type { IToastProps } from "../../../interfaces";
import type { IToastContainerProps } from "../../../interfaces";
import { ToastPosition } from "../../../types";
import { toastCore } from "../../../lib/core/toast";

const POSITION_STYLES: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

export function ToastContainer({
  autoClose = 5000,
  closeOnClick = true,
  draggable = true,
  newestOnTop = false,
  limit,
  className,
  toastClassName,
}: Readonly<IToastContainerProps>): JSX.Element | null {
  const [toasts, setToasts] = useState<IToastProps[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = toastCore.subscribe(setToasts);
    return () => unsubscribe();
  }, []);

  if (!mounted || toasts.length === 0) return null;

  const visibleToasts = limit ? toasts.slice(0, limit) : toasts;

  const grouped: Record<ToastPosition, IToastProps[]> = {
    "top-left": [],
    "top-center": [],
    "top-right": [],
    "bottom-left": [],
    "bottom-center": [],
    "bottom-right": [],
  };

  visibleToasts.forEach((toast) => {
    const pos = toast.position ?? "top-right";
    grouped[pos].push(toast);
  });

  return (
    <>
      {Object.entries(grouped).map(([position, toasts]) => {
        if (toasts.length === 0) return null;

        const sorted = newestOnTop ? [...toasts].reverse() : toasts;

        return createPortal(
          <div
            key={position}
            className={cn(
              "fixed z-50 flex flex-col gap-2 pointer-events-none",
              POSITION_STYLES[position as ToastPosition],
              className
            )}
          >
            {sorted.map((toast) => (
              <div
                key={toast.id}
                className={cn(
                  "pointer-events-auto transition-all",
                  toastClassName
                )}
              >
                <Toast
                  {...toast}
                  autoClose={toast.autoClose ?? autoClose}
                  closeOnClick={toast.closeOnClick ?? closeOnClick}
                  draggable={toast.draggable ?? draggable}
                  onRemove={() => {
                    toastCore.remove(toast.id);
                    toast.onClose?.();
                  }}
                />
              </div>
            ))}
          </div>,
          document.body
        );
      })}
    </>
  );
}
