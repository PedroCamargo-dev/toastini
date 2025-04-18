import React from 'react'
import { IconBase } from '../base'

interface LoaderCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function LoaderCircle(
  props: Omit<React.SVGProps<SVGSVGElement>, 'children'> & LoaderCircleProps,
) {
  return (
    <IconBase {...props} className={`animation-spin ${props.className}`}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </IconBase>
  )
}

export { LoaderCircle }
