import { useMemo, useState } from 'react'
import { Button, Checkbox } from '../../components'
import './TodoApp.css'

type Todo = {
  id: number
  done: boolean
  title: string
}

const initialTodos: Todo[] = [
  { id: 1, done: false, title: 'Draft the release notes' },
  { id: 2, done: true, title: 'Publish the component checklist' },
  { id: 3, done: false, title: 'Review the accessibility pass' },
]

export function TodoApp() {
  const [nextId, setNextId] = useState(initialTodos.length + 1)
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState(initialTodos)
  const remainingCount = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])

  function addTodo() {
    const title = newTodo.trim()

    if (!title) {
      return
    }

    setTodos((currentTodos) => [{ id: nextId, done: false, title }, ...currentTodos])
    setNextId((currentId) => currentId + 1)
    setNewTodo('')
  }

  function clearCompleted() {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.done))
  }

  function toggleTodo(id: number, done: boolean) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo)),
    )
  }

  return (
    <section className="todo-app">
      <div className="todo-app__header">
        <div>
          <p className="eyebrow">Page example</p>
          <h3>Small Todo App</h3>
        </div>
        <span className="todo-app__count">{remainingCount} left</span>
      </div>
      <div className="todo-app__composer">
        <input
          className="todo-app__field"
          onChange={(event) => setNewTodo(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addTodo()
            }
          }}
          placeholder="Add a task"
          value={newTodo}
        />
        <Button disabled={!newTodo.trim()} onClick={addTodo}>
          Add task
        </Button>
      </div>
      <div className="todo-app__list">
        {todos.map((todo) => (
          <div className="todo-app__item" key={todo.id}>
            <Checkbox
              checked={todo.done}
              label={todo.title}
              onChange={(event) => toggleTodo(todo.id, event.target.checked)}
            />
          </div>
        ))}
      </div>
      <div className="todo-app__footer">
        <p>{remainingCount === 1 ? '1 task remains.' : `${remainingCount} tasks remain.`}</p>
        <button className="todo-app__clear" onClick={clearCompleted} type="button">
          Clear completed
        </button>
      </div>
    </section>
  )
}
