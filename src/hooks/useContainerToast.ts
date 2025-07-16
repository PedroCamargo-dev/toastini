import { useCallback, useEffect, useRef, useState } from 'react'
import { getInitialOffset, isVertical } from '@/utils'
import { ToastType } from '@/types'
import { IToastAction } from '@/interfaces'

interface IUseContainerToast {
  position: string
  closeOnClick: boolean
  draggable: boolean
  autoClose?: boolean | number
  onRemove: () => void
  type?: ToastType
  actions?: IToastAction[]
}

const useContainerToast = ({
  position,
  closeOnClick,
  draggable,
  autoClose,
  onRemove,
  type,
  actions,
}: IUseContainerToast) => {
  const toastRef = useRef<HTMLDivElement>(null)
  const vertical = isVertical(position)
  const initialOffset = getInitialOffset(position)

  const [isDragging, setIsDragging] = useState(false)
  const [drag, setDrag] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [entered, setEntered] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isFrozen, setIsFrozen] = useState(!!actions?.length)
  const dragStart = useRef(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setEntered(true)
      setOpacity(1)
    }, 10)
    return () => clearTimeout(t)
  }, [])

  const triggerRemove = useCallback(() => {
    if (isExiting) return
    setIsExiting(true)

    setOpacity(0)

    let dragValue = 0
    if (vertical) {
      dragValue = position.includes('top') ? -100 : 100
    } else {
      dragValue = position.includes('left') ? -100 : 100
    }
    setDrag(dragValue)

    const exitTimer = setTimeout(() => {
      onRemove()
    }, 300)

    return () => clearTimeout(exitTimer)
  }, [isExiting, vertical, position, onRemove])

  const triggerRemoveRef = useRef(triggerRemove)
  useEffect(() => {
    triggerRemoveRef.current = triggerRemove
  }, [triggerRemove])

  useEffect(() => {
    if (isFrozen) return

    let timer: ReturnType<typeof setTimeout> | null = null

    if (
      autoClose &&
      typeof autoClose === 'number' &&
      autoClose > 0 &&
      type !== 'promise'
    ) {
      timer = setTimeout(() => {
        triggerRemoveRef.current()
      }, autoClose)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [autoClose, type, isFrozen])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return
    dragStart.current = vertical ? e.clientY - drag : e.clientX - drag
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const current = vertical ? e.clientY : e.clientX
    const offset = current - dragStart.current
    setDrag(offset)

    if (Math.abs(offset) > 100) {
      setOpacity(Math.max(0, 1 - (Math.abs(offset) - 100) / 100))
    } else {
      setOpacity(1)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (Math.abs(drag) > 150) {
      triggerRemove()
    } else {
      setDrag(0)
      setOpacity(1)
    }
  }

  const handleClick = () => {
    if (closeOnClick) {
      triggerRemove()
    }
  }

  const unfreeze = useCallback(() => {
    setIsFrozen(false)
  }, [])

  const translateValue = entered ? drag : initialOffset
  const transform = vertical
    ? `translateY(${translateValue}px)`
    : `translateX(${translateValue}px)`

  return {
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
  }
}

export { useContainerToast }
