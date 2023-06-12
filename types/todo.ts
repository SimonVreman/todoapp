export interface Todo {
  id: number
  name: string
  description: string
  timestamp?: number
  priority: number
  done: boolean
  updated: number
}

export interface NonPersistedTodo {
  name: string
  description: string
  timestamp?: number
  priority: number
  done: boolean
}

export interface TodoGroups {
  [key: string]: Todo[]
}
