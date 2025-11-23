import React from 'react'

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }> = ({ children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  )
}

export default Button
