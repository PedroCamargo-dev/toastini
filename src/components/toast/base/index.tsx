import React from 'react'
import clsx from 'clsx'
import { X } from '@/components/icons'
import { IContainerToast } from '@/interfaces'

export interface BaseToastProps extends IContainerToast {
  icon?: React.ReactNode
  showCloseButton?: boolean
}

export function BaseToast({
  title,
  description,
  icon,
  type = 'default',
  onClose,
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  closeButtonClassName,
  showCloseButton = true,
}: Readonly<BaseToastProps>) {
  return (
    <div className={clsx('toast-container', `toast-type-${type}`, className)}>
      {icon && (
        <div className={clsx('toast-icon-wrapper', iconClassName)}>{icon}</div>
      )}
      <div className={clsx('toast-content-wrapper', contentClassName)}>
        {title && (
          <h3 className={clsx('toast-title', titleClassName)}>{title}</h3>
        )}
        {description && (
          <div className={clsx('toast-description', descriptionClassName)}>
            {description}
          </div>
        )}
      </div>
      {showCloseButton && onClose && (
        <button
          className={clsx(
            'toast-close-button',
            `toast-close-button-${type}`,
            closeButtonClassName,
          )}
          onClick={onClose}
          type="button"
          aria-label="Fechar"
        >
          <X />
        </button>
      )}
    </div>
  )
}
