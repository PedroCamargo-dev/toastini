import React from 'react'
import clsx from 'clsx'
import { useContainerToast } from '@/hooks'
import { TOAST_ICONS } from '@/constants'
import { X } from '@/components/icons'
import type { IContainerToast } from '@/interfaces'

export function ContainerToast({
  title,
  description,
  type = 'default',
  closeOnClick = true,
  draggable = true,
  onRemove,
  position = 'top-right',
  autoClose,
  showProgressBar = true,
  actions,
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  closeButtonClassName,
  progressClassName,
  style,
  iconStyle,
  contentStyle,
  titleStyle,
  descriptionStyle,
  closeButtonStyle,
  progressStyle,
}: Readonly<IContainerToast>) {
  const {
    toastRef,
    isDragging,
    transform,
    opacity,
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    triggerRemove,
    unfreeze,
  } = useContainerToast({
    position,
    closeOnClick,
    draggable,
    autoClose,
    onRemove,
    type,
    actions,
  })

  return (
    <div
      ref={toastRef}
      className={clsx(
        'toast-container',
        `toast-type-${type}`,
        draggable && 'toast-draggable',
        isDragging && 'toast-dragging',
        className,
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        transform,
        opacity,
        ...style,
      }}
      aria-hidden
    >
      <div
        className={clsx('toast-icon-wrapper', iconClassName)}
        style={{ ...iconStyle }}
      >
        {TOAST_ICONS[type]}
      </div>
      <div
        className={clsx('toast-content-wrapper', contentClassName)}
        style={{ ...contentStyle }}
      >
        {title && (
          <h3
            className={clsx('toast-title', titleClassName)}
            style={{ ...titleStyle }}
          >
            {title}
          </h3>
        )}
        {description && (
          <div
            className={clsx('toast-description', descriptionClassName)}
            style={{ ...descriptionStyle }}
          >
            {description}
          </div>
        )}
        {actions?.length && (
          <div className="toast-actions">
            {actions.map(
              ({ label, onClick, variant = 'default', ...rest }, index) => (
                <button
                  {...rest}
                  key={index}
                  className={clsx(
                    'toast-action-button',
                    `toast-action-button-${variant}`,
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    unfreeze()
                    onClick?.(e)
                  }}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        )}
      </div>
      <button
        className={clsx(
          'toast-close-button',
          `toast-close-button-${type}`,
          closeButtonClassName,
        )}
        onClick={(e) => {
          e.stopPropagation()
          unfreeze()
          triggerRemove()
        }}
        style={{ ...closeButtonStyle }}
      >
        <X />
      </button>
      {showProgressBar &&
        typeof autoClose === 'number' &&
        type !== 'promise' && (
          <span
            className={clsx('toast-progress', progressClassName)}
            style={
              {
                ...progressStyle,
                '--toast-progress-duration': `${autoClose}ms`,
              } as React.CSSProperties
            }
          />
        )}
    </div>
  )
}
