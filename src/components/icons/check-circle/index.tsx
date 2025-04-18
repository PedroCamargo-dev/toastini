import React from 'react'
import { IconBase } from '../base'

interface CheckCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function CheckCircle(
  props: Omit<React.SVGProps<SVGSVGElement>, 'children'> & CheckCircleProps,
) {
  return (
    <IconBase {...props}>
      <circle cx={12} cy={12} r={10} />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  )
}

export { CheckCircle }
