import React from 'react'

interface AlertCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function AlertCircle({
  size = 24,
  color = 'currentColor',
  ...props
}: Readonly<AlertCircleProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}

export { AlertCircle }
