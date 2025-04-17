import React from 'react'

interface LoaderCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function LoaderCircle({
  size = 24,
  color = 'currentColor',
  ...props
}: Readonly<LoaderCircleProps>) {
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
      className={`animation-spin ${props.className}`}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export { LoaderCircle }
