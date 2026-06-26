import type { ComponentType } from 'react'
import { ButtonPreview, CarouselPreview, CheckboxPreview, TodoAppPreview, TogglePreview } from './componentPreviews'

export type ShowcaseItem = {
  kind: 'component' | 'page'
  slug: string
  name: string
  description: string
  route: string
  copyPath: string
  usage: string
  Preview: ComponentType
}

export const componentCatalog: ShowcaseItem[] = [
  {
    kind: 'component',
    slug: 'carousel',
    name: 'Carousel',
    description: 'An auto-rotating card carousel with dot navigation and a per-dot progress ring showing time until the next slide.',
    route: '/components/carousel',
    copyPath: 'src/components/carousel',
    usage: '<Carousel>\n  <MyCard />\n  <MyOtherCard />\n  <AnotherCard />\n</Carousel>',
    Preview: CarouselPreview,
  },
  {
    kind: 'component',
    slug: 'button',
    name: 'Button',
    description: 'A simple accent button with a small shadow and keyboard focus ring.',
    route: '/components/button',
    copyPath: 'src/components/button',
    usage: "<Button type=\"button\">Primary action</Button>",
    Preview: ButtonPreview,
  },
  {
    kind: 'component',
    slug: 'toggle',
    name: 'Toggle',
    description: 'A lightweight labeled switch for boolean preferences.',
    route: '/components/toggle',
    copyPath: 'src/components/toggle',
    usage:
      "<Toggle label=\"Email alerts\" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />",
    Preview: TogglePreview,
  },
  {
    kind: 'component',
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'A checkbox field with room for a label and supporting text.',
    route: '/components/checkbox',
    copyPath: 'src/components/checkbox',
    usage:
      "<Checkbox label=\"Finish the wireframes\" description=\"Mark an item as done.\" checked={done} onChange={(event) => setDone(event.target.checked)} />",
    Preview: CheckboxPreview,
  },
]

export const pageCatalog: ShowcaseItem[] = [
  {
    kind: 'page',
    slug: 'todo-app',
    name: 'Todo App',
    description: 'A small page that combines buttons and checkboxes into a focused task list.',
    route: '/pages/todo-app',
    copyPath: 'src/pages/todo-app',
    usage: '<TodoApp />',
    Preview: TodoAppPreview,
  },
]

export const showcaseCatalog: ShowcaseItem[] = [...componentCatalog, ...pageCatalog]
