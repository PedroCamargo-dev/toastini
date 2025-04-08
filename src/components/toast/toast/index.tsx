import React from 'react'
import clsx from 'clsx'
import { useContainerToast } from '@/hooks'
import { TOAST_ICONS } from '@/constants'
import { X } from '@/components/icons'
import type { IContainerToast } from '@/interfaces'
import '@/styles/styles.css'

export function ContainerToast({
  title,
  description,
  type = 'default',
  closeOnClick = true,
  draggable = true,
  onRemove,
  position = 'top-right',
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  closeButtonClassName,
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
  } = useContainerToast({ position, closeOnClick, draggable, onRemove })

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
      }}
      aria-hidden
    >
      <div className={clsx('toast-icon-wrapper', iconClassName)}>
        {TOAST_ICONS[type]}
      </div>
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
      >
        <X />
      </button>
    </div>
  )
}
