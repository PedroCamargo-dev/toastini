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
  const isTop = position.startsWith('top')
  const isLeft = position.endsWith('left')
  const isRight = position.endsWith('right')
  const isCenter = position.endsWith('center')

  const styles: React.CSSProperties = {}

  if (isTop) styles.top = value
  else styles.bottom = value

  if (isLeft) {
    styles.left = value
    styles.alignItems = 'flex-start'
  } else if (isRight) {
    styles.right = value
    styles.alignItems = 'flex-end'
  } else if (isCenter) {
    styles.left = '50%'
    styles.transform = 'translateX(-50%)'
    styles.alignItems = 'center'
  }

  return styles
}

function generateId(): string {
  return new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
}

export { isVertical, getInitialOffset, getPositionStyle, generateId }
