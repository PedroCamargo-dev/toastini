import React from 'react'
import { IconBase } from '../base'

interface TriangleCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function TriangleCircle(
  props: Omit<React.SVGProps<SVGSVGElement>, 'children'> & TriangleCircleProps,
) {
  return (
    <IconBase {...props}>
      <path d="M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </IconBase>
  )
}

export { TriangleCircle }
