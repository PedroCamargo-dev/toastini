import { useState, useEffect, JSX } from 'react'
import { createPortal } from 'react-dom'
import { toastManager } from '@/lib/core'
import { ToastPosition } from '@/types'
import type { IToastContainerProps, IToastProps } from '@/interfaces'
import { ToastWrapper, ToastItemWrapper } from './styled'
import { Toast } from '../toast'

function getPositionStyle(
  position: ToastPosition,
  margin = 16,
): React.CSSProperties {
  const value = `${margin}px`

  switch (position) {
    case 'top-left':
      return { top: value, left: value, alignItems: 'flex-start' }
    case 'top-center':
      return {
        top: value,
        left: '50%',
        transform: 'translateX(-50%)',
        alignItems: 'center',
      }
    case 'top-right':
      return { top: value, right: value, alignItems: 'flex-end' }
    case 'bottom-left':
      return { bottom: value, left: value, alignItems: 'flex-start' }
    case 'bottom-center':
      return {
        bottom: value,
        left: '50%',
        transform: 'translateX(-50%)',
        alignItems: 'center',
      }
    case 'bottom-right':
    default:
      return { bottom: value, right: value, alignItems: 'flex-end' }
  }
}

export function ToastContainer({
  autoClose = 5000,
  closeOnClick = true,
  draggable = true,
  newestOnTop = false,
  limit,
  margin = 16,
  style,
  toastStyle,
}: Readonly<IToastContainerProps>): JSX.Element | null {
  const [toasts, setToasts] = useState<IToastProps[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const unsubscribe = toastManager.subscribe(setToasts)
    return () => unsubscribe()
  }, [])

  if (!mounted || toasts.length === 0) return null

  const visibleToasts = limit ? toasts.slice(0, limit) : toasts

  const grouped: Record<ToastPosition, IToastProps[]> = {
    'top-left': [],
    'top-center': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-center': [],
    'bottom-right': [],
  }

  visibleToasts.forEach((toast) => {
    const pos = toast.position ?? 'top-right'
    grouped[pos].push(toast)
  })

  return (
    <>
      {Object.entries(grouped).map(([position, toasts]) => {
        if (toasts.length === 0) return null

        const sorted = newestOnTop ? [...toasts].reverse() : toasts

        return createPortal(
          <ToastWrapper
            key={position}
            style={style}
            $positionStyle={getPositionStyle(position as ToastPosition, margin)}
          >
            {sorted.map((toast) => (
              <ToastItemWrapper key={toast.id} style={toastStyle}>
                <Toast
                  {...toast}
                  autoClose={toast.autoClose ?? autoClose}
                  closeOnClick={toast.closeOnClick ?? closeOnClick}
                  draggable={toast.draggable ?? draggable}
                  onRemove={() => {
                    toastManager.remove(toast.id)
                    toast.onClose?.()
                  }}
                />
              </ToastItemWrapper>
            ))}
          </ToastWrapper>,
          document.body,
        )
      })}
    </>
  )
}
