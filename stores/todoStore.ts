import { NonPersistedTodo, Todo } from "@/types/todo"
import { makeAutoObservable } from "mobx"
import { makePersistable, isHydrated } from "mobx-persist-store"
import { RootStore } from "@/stores/rootStore"

export class TodoStore {
  todos: Todo[] = []
  deleteQueue: number[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)

    if (typeof window !== "undefined")
      makePersistable(this, {
        name: "TodoStore",
        properties: ["todos"],
        storage: window.localStorage,
      })
  }

  get() {
    return this.todos
  }

  getById(id: number) {
    return this.todos.find((todo) => todo.id === id)
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

  toggleDone(id: number) {
    const todo = this.getById(id)
    if (!todo) return
    const modifiedTodo: any = {
      ...todo,
      done: !todo.done,
    }
    delete modifiedTodo.id
    delete modifiedTodo.updated
    return this.update(modifiedTodo, todo.id)
  }

  scheduleDelete(id: number) {
    this.deleteQueue.push(id)
  }

  executeDeletes() {
    this.deleteQueue.forEach((id) => this.delete(id))
    this.deleteQueue = []
  }

  delete(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  getAvailableId() {
    const highestTodo = this.todos.sort((a) => a.id)[this.todos.length - 1]
    return highestTodo ? highestTodo.id + 1 : 0
  }

  isHydrated() {
    return isHydrated(this)
  }
}
