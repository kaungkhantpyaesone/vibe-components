import { useState } from 'react'
import { Button } from './components/button'
import { Checkbox } from './components/checkbox'
import { Toggle } from './components/toggle'
import { TodoApp } from './pages/todo-app'

export function ButtonPreview() {
  return <Button>Primary action</Button>
}

export function TogglePreview() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Toggle
      checked={enabled}
      hint={enabled ? 'Enabled' : 'Disabled'}
      label="Email alerts"
      onChange={(event) => setEnabled(event.target.checked)}
    />
  )
}

export function CheckboxPreview() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      description="Mark an item as done."
      label="Finish the wireframes"
      onChange={(event) => setChecked(event.target.checked)}
    />
  )
}

export function TodoAppPreview() {
  return <TodoApp />
}
