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
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  closeButtonClassName,
  style,
  iconStyle,
  contentStyle,
  titleStyle,
  descriptionStyle,
  closeButtonStyle,
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
  } = useContainerToast({
    position,
    closeOnClick,
    draggable,
    autoClose,
    onRemove,
    type,
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
      </div>
      <button
        className={clsx(
          'toast-close-button',
          `toast-close-button-${type}`,
          closeButtonClassName,
        )}
        onClick={(e) => {
          e.stopPropagation()
          triggerRemove()
        }}
        style={{ ...closeButtonStyle }}
      >
        <X />
      </button>
    </div>
  )
}
