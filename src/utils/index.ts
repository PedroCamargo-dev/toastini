import { ToastPosition } from '@/types'

function isVertical(position: string): boolean {
  return position === 'top-center' || position === 'bottom-center'
}

function getInitialOffset(position: string): number {
  switch (position) {
    case 'top-left':
    case 'bottom-left':
      return -16
    case 'top-right':
    case 'bottom-right':
      return 16
    case 'top-center':
      return -16
    case 'bottom-center':
      return 16
    default:
      return 0
  }
}

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

export { isVertical, getInitialOffset, getPositionStyle }
