import React from 'react'
import { IconBase } from '../base'

interface InfoProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function Info(
  props: Omit<React.SVGProps<SVGSVGElement>, 'children'> & InfoProps,
) {
  return (
    <IconBase {...props}>
      <circle cx={12} cy={12} r={10} />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </IconBase>
  )
}

export { Info }
