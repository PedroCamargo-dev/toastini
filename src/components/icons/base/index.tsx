function IconBase({
  size = 24,
  color = 'currentColor',
  children,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number
  color?: string
  children: React.ReactNode
}) {
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
      className={className}
      {...props}
    >
      {children}
    </svg>
  )
}

export { IconBase }
