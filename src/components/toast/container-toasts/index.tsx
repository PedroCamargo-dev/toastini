import { JSX } from 'react'
import { createPortal } from 'react-dom'
import { toastManager } from '@/lib/core'
import { ToastPosition } from '@/types'
import { getPositionStyle } from '@/utils'
import { useContainerToasts } from '@/hooks'
import { IContainerToasts } from '@/interfaces/IContainerToasts'
import { ToastWrapper, ToastItemWrapper } from './styled'
import { ContainerToast } from '../toast/container-toast'

export function ContainerToasts({
  autoClose = 5000,
  closeOnClick = true,
  draggable = true,
  newestOnTop = false,
  limit,
  margin = 16,
  toastWrapperStyle,
  toastItemWrapperStyle,
}: Readonly<IContainerToasts>): JSX.Element | null {
  const { groupedToasts, mounted, toasts } = useContainerToasts({ limit })

  if (!mounted || toasts.length === 0) return null

  return (
    <>
      {Object.entries(groupedToasts).map(([position, toastsGroup]) => {
        if (toastsGroup.length === 0) return null

        const sortedToasts = newestOnTop
          ? [...toastsGroup].reverse()
          : toastsGroup

        return createPortal(
          <ToastWrapper
            key={position}
            style={toastWrapperStyle}
            $positionStyle={getPositionStyle(position as ToastPosition, margin)}
          >
            {sortedToasts.map((toast) => (
              <ToastItemWrapper key={toast.id} style={toastItemWrapperStyle}>
                <ContainerToast
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
