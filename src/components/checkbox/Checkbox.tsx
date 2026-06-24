import { useId } from 'react'
import type { ChangeEventHandler, InputHTMLAttributes } from 'react'
import './Checkbox.css'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  description?: string
  label: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function Checkbox({ checked, description, id, label, onChange, ...props }: CheckboxProps) {
  const generatedId = useId()

  return (
    <label className="checkbox" htmlFor={id ?? generatedId}>
      <input
        {...props}
        checked={checked}
        className="checkbox__input"
        id={id ?? generatedId}
        onChange={onChange}
        type="checkbox"
      />
      <span aria-hidden="true" className="checkbox__indicator">
        <span className="checkbox__checkmark" />
      </span>
      <span className="checkbox__text">
        <span className="checkbox__label">{label}</span>
        {description ? <span className="checkbox__description">{description}</span> : null}
      </span>
    </label>
  )
}
