import type { ReactElement } from 'react'
import { ButtonPreview, TogglePreview } from './componentPreviews'

type ComponentDefinition = {
  slug: string
  name: string
  description: string
  route: string
  copyPath: string
  usage: string
  preview: () => ReactElement
}

export const componentCatalog: ComponentDefinition[] = [
  {
    slug: 'button',
    name: 'Button',
    description: 'A simple accent button with a small shadow and keyboard focus ring.',
    route: '/components/button',
    copyPath: 'src/components/button',
    usage: "<Button type=\"button\">Primary action</Button>",
    preview: ButtonPreview,
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    description: 'A lightweight labeled switch for boolean preferences.',
    route: '/components/toggle',
    copyPath: 'src/components/toggle',
    usage:
      "<Toggle label=\"Email alerts\" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />",
    preview: TogglePreview,
  },
]
