import { useEffect, useRef, useState } from "react";
import type { IToastProps } from "../../../interfaces";
import { cn } from "../../../lib/utils";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";

const TOAST_ICONS = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  default: <Info className="h-5 w-5 text-gray-500" />,
};

const TOAST_STYLES = {
  success:
    "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
  error: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
  info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
  warning:
    "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
  default:
    "bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800",
};

function isVertical(position: string): boolean {
  return position === "top-center" || position === "bottom-center";
}

function getInitialOffset(position: string): number {
  switch (position) {
    case "top-left":
    case "bottom-left":
      return -16;
    case "top-right":
    case "bottom-right":
      return 16;
    case "top-center":
      return -16;
    case "bottom-center":
      return 16;
    default:
      return 0;
  }
}

export const Toast: React.FC<IToastProps & { onRemove: () => void }> = ({
  title,
  description,
  type = "default",
  closeOnClick = true,
  draggable = true,
  onRemove,
  position = "top-right",
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const vertical = isVertical(position);
  const initialOffset = getInitialOffset(position);

  const [isDragging, setIsDragging] = useState(false);
  const [drag, setDrag] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [entered, setEntered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const dragStart = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setEntered(true);
      setOpacity(1);
    }, 10);
    return () => clearTimeout(t);
  }, []);

  const triggerRemove = () => {
    if (isExiting) return;
    setIsExiting(true);

    setOpacity(0);

    let dragValue = 0;
    if (vertical) {
      dragValue = position.includes("top") ? -100 : 100;
    } else {
      dragValue = position.includes("left") ? -100 : 100;
    }
    setDrag(dragValue);

    const exitTimer = setTimeout(() => {
      onRemove();
    }, 300);

    return () => clearTimeout(exitTimer);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    dragStart.current = vertical ? e.clientY - drag : e.clientX - drag;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const current = vertical ? e.clientY : e.clientX;
    const offset = current - dragStart.current;
    setDrag(offset);

    if (Math.abs(offset) > 100) {
      setOpacity(Math.max(0, 1 - (Math.abs(offset) - 100) / 100));
    } else {
      setOpacity(1);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(drag) > 150) {
      triggerRemove();
    } else {
      setDrag(0);
      setOpacity(1);
    }
  };

  const handleClick = () => {
    if (closeOnClick) {
      triggerRemove();
    }
  };

  const translateValue = entered ? drag : initialOffset;
  const transform = vertical
    ? `translateY(${translateValue}px)`
    : `translateX(${translateValue}px)`;

  return (
    <div
      ref={toastRef}
      className={cn(
        "z-[9999] flex w-full max-w-md items-start gap-3 rounded-lg border p-4 shadow-sm transition-all duration-300 ease-in-out",
        TOAST_STYLES[type],
        isDragging ? "cursor-grabbing" : draggable && "cursor-grab"
      )}
      style={{
        transform,
        opacity,
        transition: isDragging ? "none" : "all 0.3s ease-in-out",
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      aria-hidden
    >
      <div className="flex-shrink-0">{TOAST_ICONS[type]}</div>
      <div className="flex-1">
        {title && <h3 className="font-medium">{title}</h3>}
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          triggerRemove();
        }}
        className="flex-shrink-0 rounded-full p-1 hover:bg-muted"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
