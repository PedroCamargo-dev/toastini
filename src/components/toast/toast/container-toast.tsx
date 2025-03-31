import { X } from 'lucide-react'
import type { IToastProps } from '@/interfaces'
import { useContainerToast } from '@/hooks'
import { TOAST_ICONS } from '@/constants'
import { ToastContainerWrapper } from './container-toast.styled'
import { ContentWrapper, IconWrapper } from './styled'
import { Title } from './title.styled'
import { Description } from './description.styled'
import { CloseButton } from './button.styled'

export function ContainerToast({
  title,
  description,
  type = 'default',
  closeOnClick = true,
  draggable = true,
  onRemove,
  position = 'top-right',
}: IToastProps & { onRemove: () => void }) {
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
    <ToastContainerWrapper
      ref={toastRef}
      $type={type}
      $isDragging={isDragging}
      $draggable={draggable}
      $transform={transform}
      $opacity={opacity}
      $isDraggingNow={isDragging}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      aria-hidden
    >
      <IconWrapper>{TOAST_ICONS[type]}</IconWrapper>
      <ContentWrapper>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
      </ContentWrapper>
      <CloseButton
        $type={type}
        onClick={(e) => {
          e.stopPropagation()
          triggerRemove()
        }}
      >
        <X className="h-4 w-4" />
      </CloseButton>
    </ToastContainerWrapper>
  )
}
