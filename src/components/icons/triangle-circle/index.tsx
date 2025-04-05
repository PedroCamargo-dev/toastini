import React from 'react'

interface TriangleCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function TriangleCircle({
  size = 24,
  color = 'currentColor',
  ...props
}: Readonly<TriangleCircleProps>) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

export { TriangleCircle }
