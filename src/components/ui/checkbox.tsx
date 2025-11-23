import React from 'react'

export const Checkbox: React.FC<{
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
} & React.InputHTMLAttributes<HTMLInputElement>> = ({ id, checked, onCheckedChange, ...props }) => {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      {...props}
    />
  )
}

export default Checkbox
