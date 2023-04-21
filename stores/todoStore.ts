import { NonPersistedTodo, Todo } from "@/types/todo"
import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store"

export class TodoStore {
  todos: Todo[] = []

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, { name: "TodoStore", properties: ["todos"], storage: window.localStorage })
  }

  getTodoById(id: number) {
    return this.todos.find((todo) => todo.id === id)
  }

  createTodo(todo: NonPersistedTodo) {
    this.todos.push({
      ...todo,
      id: this.getAvailableId(),
    })
  }

  updateTodo(todo: NonPersistedTodo, id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id)
    this.todos[index] = {
      ...todo,
      id,
    }
  }

  deleteTodoById(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  getAvailableId() {
    return this.todos.sort((a, b) => a.id - b.id)[this.todos.length - 1].id + 1
  }
}
