import { useId } from 'react'
import type { ChangeEventHandler, InputHTMLAttributes } from 'react'
import './Toggle.css'

export type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  hint?: string
  label: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function Toggle({ checked, hint, id, label, onChange, ...props }: ToggleProps) {
  const generatedId = useId()

  return (
    <label className="toggle" htmlFor={id ?? generatedId}>
      <span className="toggle__text">
        <span className="toggle__label">{label}</span>
        {hint ? <span className="toggle__hint">{hint}</span> : null}
      </span>
      <span>
        <input
          {...props}
          checked={checked}
          className="toggle__input"
          id={id ?? generatedId}
          onChange={onChange}
          type="checkbox"
        />
        <span aria-hidden="true" className="toggle__track">
          <span className="toggle__thumb" />
        </span>
      </span>
    </label>
  )
}
