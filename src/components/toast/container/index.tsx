import { useState, useEffect, JSX } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/utils";
import { Toast } from "../toast";
import type { IToastProps } from "../../../interfaces";
import type { IToastContainerProps } from "../../../interfaces";
import { ToastPosition } from "../../../types";
import { toastCore } from "../../../lib/core/toast";

const POSITION_STYLES: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
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

  const grouped: Record<ToastPosition, IToastProps[]> = {
    "top-left": [],
    "top-center": [],
    "top-right": [],
    "bottom-left": [],
    "bottom-center": [],
    "bottom-right": [],
  };

  const visibleToasts = limit ? toasts.slice(0, limit) : toasts;

  for (const toast of visibleToasts) {
    const pos = toast.position ?? "top-right";
    grouped[pos].push(toast);
  }

  return (
    <>
      {Object.entries(grouped).map(([position, group]) => {
        if (group.length === 0) return null;

        const sorted = newestOnTop ? [...group].reverse() : group;

        return createPortal(
          <div
            key={position}
            className={cn(
              "fixed z-50 flex flex-col gap-2 p-4 max-h-screen overflow-hidden",
              POSITION_STYLES[position as ToastPosition],
              className
            )}
          >
            {sorted.map((toast) => (
              <div
                key={toast.id}
                className={cn(
                  "transform transition-all duration-300 ease-in-out",
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
