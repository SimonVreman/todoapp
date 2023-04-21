export interface Todo {
  id: number
  name: string
  description: string
  timestamp: number
  priority: number
}

export interface NonPersistedTodo {
  name: string
  description: string
  timestamp?: number
  priority: number
}
