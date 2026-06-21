import type { ReactNode } from 'react'

type IconButtonVariant = 'ghost' | 'primary' | 'muted'

interface IconButtonProps {
  children: ReactNode
  variant?: IconButtonVariant
  label: string
  onClick?: () => void
}

export function IconButton({ children, variant = 'ghost', label, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`icon-btn icon-btn--${variant}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
