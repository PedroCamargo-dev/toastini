import type React from "react";
import { useState, useRef, useEffect } from "react";
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

export const Toast: React.FC<IToastProps & { onRemove: () => void }> = ({
  title,
  description,
  type = "default",
  closeOnClick = true,
  draggable = true,
  onRemove,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const toastRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = toastRef.current;
    if (!element) return;

    element.style.transform = "translateX(0)";
    element.style.opacity = "1";

    return () => {};
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;

    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStartPos.current.x;
    setPosition({ x: newX, y: 0 });

    if (Math.abs(newX) > 100) {
      setOpacity(Math.max(0, 1 - (Math.abs(newX) - 100) / 100));
    } else {
      setOpacity(1);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (Math.abs(position.x) > 150) {
      onRemove();
    } else {
      setPosition({ x: 0, y: 0 });
      setOpacity(1);
    }
  };

  const handleClick = () => {
    if (closeOnClick) {
      onRemove();
    }
  };

  return (
    <div
      ref={toastRef}
      className={cn(
        "flex w-full max-w-md items-start gap-3 rounded-lg border p-4 shadow-sm transition-all duration-300 ease-in-out",
        TOAST_STYLES[type],
        isDragging ? "cursor-grabbing" : draggable ? "cursor-grab" : "",
        "transform translate-x-full opacity-0"
      )}
      style={{
        transform: `translateX(${position.x}px)`,
        opacity: opacity,
        transition: isDragging ? "none" : "all 0.3s ease-in-out",
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
          onRemove();
        }}
        className="flex-shrink-0 rounded-full p-1 hover:bg-muted"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
