import { useState, useEffect, JSX } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/utils";
import { Toast } from "../toast";
import type { IToastProps } from "../../../interfaces";
import type { IToastContainerProps } from "../../../interfaces";
import { ToastPosition } from "../../../types";
import { toastCore } from "../../../lib/core/toast";

function getPositionStyle(
  position: ToastPosition,
  margin = 16
): React.CSSProperties {
  const value = `${margin}px`;

  switch (position) {
    case "top-left":
      return { top: value, left: value, alignItems: "flex-start" };
    case "top-center":
      return {
        top: value,
        left: "50%",
        transform: "translateX(-50%)",
        alignItems: "center",
      };
    case "top-right":
      return { top: value, right: value, alignItems: "flex-end" };
    case "bottom-left":
      return { bottom: value, left: value, alignItems: "flex-start" };
    case "bottom-center":
      return {
        bottom: value,
        left: "50%",
        transform: "translateX(-50%)",
        alignItems: "center",
      };
    case "bottom-right":
    default:
      return { bottom: value, right: value, alignItems: "flex-end" };
  }
}

export function ToastContainer({
  autoClose = 5000,
  closeOnClick = true,
  draggable = true,
  newestOnTop = false,
  limit,
  margin = 16,
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
            style={getPositionStyle(position as ToastPosition, margin)}
            className={cn(
              "fixed z-[9999] pointer-events-none flex flex-col gap-2 p-4 max-h-screen",
              className
            )}
          >
            {sorted.map((toast) => (
              <div
                key={toast.id}
                className={cn("pointer-events-auto", toastClassName)}
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
