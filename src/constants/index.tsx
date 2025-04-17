import {
  AlertCircle,
  CheckCircle,
  Info,
  TriangleCircle,
} from '@/components/icons'
import { LoaderCircle } from '@/components/icons/loader-circle'
import { ToastPosition } from '@/types'

const TOAST_ICONS = {
  success: <CheckCircle color="#22c55e" />,
  error: <AlertCircle color="#ef4444" />,
  info: <Info color="#3b82f6" />,
  warning: <TriangleCircle color="#f59e0b" />,
  default: <Info color="#6b7280" />,
  promise: <LoaderCircle color="#6b7280" />,
}

const DEFAULT_POSITION: ToastPosition = 'top-right'

export { TOAST_ICONS, DEFAULT_POSITION }
