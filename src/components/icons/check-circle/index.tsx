import React from 'react'

interface CheckCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function CheckCircle({
  size = 24,
  color = 'currentColor',
  ...props
}: Readonly<CheckCircleProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export { CheckCircle }
