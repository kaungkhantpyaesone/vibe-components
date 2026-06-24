import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function Button({ children, className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={className ? `button ${className}` : 'button'}
      type={type}
    >
      {children}
    </button>
  )
}
