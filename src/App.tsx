import { useState } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  done: boolean
}

function App() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = () => {
    const text = input.trim()
    if (!text) return

    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
    }

    setTodos((prev) => [newTodo, ...prev])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>My Todo List</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="输入待办事项..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={addTodo} style={{ padding: '10px 14px' }}>
          添加
        </button>
      </div>

      {todos.length === 0 ? (
        <p>还没有任务，先加一个吧 👀</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? '#999' : '#111',
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
