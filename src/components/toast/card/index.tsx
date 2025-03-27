import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { IToastCardProps } from "../../../interfaces";
import type { ToastType } from "../../../types";
import { JSX } from "react";

const TOAST_ICONS: Record<ToastType, JSX.Element> = {
  default: <Info className="h-5 w-5 text-gray-500" />,
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
};

const TOAST_STYLES: Record<ToastType, string> = {
  default:
    "bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800",
  success:
    "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
  error: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
  info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
  warning:
    "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
};

export const ToastCard = ({
  title,
  description,
  type = "info",
  onClose,
}: IToastCardProps) => {
  return (
    <div
      className={cn(
        "flex w-full max-w-md items-start gap-3 rounded-lg border p-4 shadow-sm",
        TOAST_STYLES[type]
      )}
    >
      <div className="flex-shrink-0">{TOAST_ICONS[type]}</div>
      <div className="flex-1">
        {title && <h3 className="font-medium">{title}</h3>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-full p-1 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
