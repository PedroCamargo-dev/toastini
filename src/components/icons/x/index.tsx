import React from 'react'

interface XProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function X({ size = 24, color = 'currentColor', ...props }: Readonly<XProps>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export { X }
