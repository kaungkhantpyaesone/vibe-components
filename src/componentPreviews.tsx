import { useState } from 'react'
import { Button } from './components/button'
import { Toggle } from './components/toggle'

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
