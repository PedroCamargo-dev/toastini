import React from 'react'
import { IconBase } from '../base'

interface XProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function X(props: Omit<React.SVGProps<SVGSVGElement>, 'children'> & XProps) {
  return (
    <IconBase {...props}>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </IconBase>
  )
}

export { X }
