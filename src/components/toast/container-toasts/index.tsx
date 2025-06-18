import { JSX } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { toastManager } from '@/lib/core'
import { useContainerToasts } from '@/hooks'
import { IContainerToasts } from '@/interfaces/IContainerToasts'
import { ContainerToast } from '../toast'

export function ContainerToasts({
  autoClose = 5000,
  closeOnClick = true,
  draggable = true,
  newestOnTop = false,
  limit,
  showProgressBar,
  wrapperClassName,
  itemClassName,
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  closeButtonClassName,
  progressClassName,
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
          <div
            key={position}
            className={clsx('toast-wrapper', wrapperClassName)}
            data-position={position}
          >
            {sortedToasts.map((toast) => (
              <div
                key={toast.id}
                className={clsx('toast-item-wrapper', itemClassName)}
              >
                <ContainerToast
                  {...toast}
                  autoClose={toast.autoClose ?? autoClose}
                  closeOnClick={toast.closeOnClick ?? closeOnClick}
                  draggable={toast.draggable ?? draggable}
                  onRemove={() => {
                    toastManager.remove(toast.id)
                    toast.onClose?.()
                  }}
                  className={clsx(className, toast.className)}
                  iconClassName={clsx(iconClassName, toast.iconClassName)}
                  contentClassName={clsx(
                    contentClassName,
                    toast.contentClassName,
                  )}
                  titleClassName={clsx(titleClassName, toast.titleClassName)}
                  descriptionClassName={clsx(
                    descriptionClassName,
                    toast.descriptionClassName,
                  )}
                  closeButtonClassName={clsx(
                    closeButtonClassName,
                    toast.closeButtonClassName,
                  )}
                  progressClassName={clsx(
                    progressClassName,
                    toast.progressClassName,
                  )}
                  showProgressBar={toast.showProgressBar ?? showProgressBar}
                />
              </div>
            ))}
          </div>,
          document.body,
        )
      })}
    </>
  )
}
