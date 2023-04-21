import { NonPersistedTodo, Todo } from "@/types/todo"
import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store"
import { RootStore } from "@/stores/rootStore"

export class TodoStore {
  todos: Todo[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)

    if (typeof window !== "undefined")
      makePersistable(this, { name: "TodoStore", properties: ["todos"], storage: window.localStorage })
  }

  getById(id: number) {
    return this.todos.find((todo) => todo.id === id)
  }

  getAll() {
    return this.todos
  }

  create(todo: NonPersistedTodo) {
    const newTodo = {
      ...todo,
      id: this.getAvailableId(),
      updated: Date.now(),
    }
    this.todos.push(newTodo)
    return newTodo
  }

  update(todo: NonPersistedTodo, id: number) {
    const modifiedTodo = {
      ...todo,
      id,
      updated: Date.now(),
    }
    const index = this.todos.findIndex((todo) => todo.id === id)
    this.todos[index] = modifiedTodo
    return modifiedTodo
  }

  deleteById(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  getAvailableId() {
    const highestTodo = this.todos.sort((a) => a.id)[this.todos.length - 1]
    return highestTodo ? highestTodo.id + 1 : 0
  }
}
