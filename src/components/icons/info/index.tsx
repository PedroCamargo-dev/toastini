import React from 'react'

interface InfoProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

function Info({
  size = 24,
  color = 'currentColor',
  ...props
}: Readonly<InfoProps>) {
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
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

export { Info }
