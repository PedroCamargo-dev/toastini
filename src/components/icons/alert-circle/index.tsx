import React from 'react'
import { IconBase } from '../base'

interface AlertCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function AlertCircle(
  props: Omit<React.SVGProps<SVGSVGElement>, 'children'> & AlertCircleProps,
) {
  return (
    <IconBase {...props}>
      <circle cx={12} cy={12} r={10} />
      <line x1={12} y1={8} x2={12} y2={12} />
      <line x1={12} y1={16} x2={12.01} y2={16} />
    </IconBase>
  )
}

export { AlertCircle }
