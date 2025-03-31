import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_POSITION } from '@/constants'
import { IToastProps } from '@/interfaces'
import { toastManager } from '@/lib/core'
import { ToastPosition } from '@/types'

interface IUseContainerToasts {
  limit: number | undefined
}

const useContainerToasts = ({ limit }: IUseContainerToasts) => {
  const [toasts, setToasts] = useState<IToastProps[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const unsubscribe = toastManager.subscribe(setToasts)
    return () => unsubscribe()
  }, [])

  const visibleToasts = useMemo(
    () => (limit ? toasts.slice(0, limit) : toasts),
    [toasts, limit],
  )

  const groupedToasts = useMemo(() => {
    return visibleToasts.reduce<Record<ToastPosition, IToastProps[]>>(
      (acc, toast) => {
        const position = toast.position ?? DEFAULT_POSITION
        acc[position] = acc[position] || []
        acc[position].push(toast)
        return acc
      },
      {
        'top-left': [],
        'top-center': [],
        'top-right': [],
        'bottom-left': [],
        'bottom-center': [],
        'bottom-right': [],
      },
    )
  }, [visibleToasts])

  return { groupedToasts, mounted, toasts }
}

export { useContainerToasts }
