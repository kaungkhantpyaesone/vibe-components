import { useState } from 'react'
import { Button } from './components/button'
import { Carousel } from './components/carousel'
import { Checkbox } from './components/checkbox'
import { LunarPhase } from './components/lunar-phase'
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

const CAROUSEL_PREVIEW_CARDS = [
  { bg: '#eef2ff', accent: '#4f46e5', label: 'Design Systems', emoji: '🎨' },
  { bg: '#f0fdf4', accent: '#16a34a', label: 'Components', emoji: '🧩' },
  { bg: '#fff7ed', accent: '#ea580c', label: 'Interactions', emoji: '✨' },
]

export function CarouselPreview() {
  return (
    <div style={{ width: '100%', maxWidth: '22rem' }}>
      <Carousel interval={10_000}>
        {CAROUSEL_PREVIEW_CARDS.map((card) => (
          <div
            key={card.label}
            style={{
              alignItems: 'center',
              background: card.bg,
              borderRadius: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              justifyContent: 'center',
              minHeight: '10rem',
              padding: '2rem',
            }}
          >
            <span style={{ fontSize: '2.5rem' }}>{card.emoji}</span>
            <strong style={{ color: card.accent }}>{card.label}</strong>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export function LunarPhasePreview() {
  return <LunarPhase />
}
