import { NonPersistedTodo, Todo } from "@/types/todo"
import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store"
import { RootStore } from "@/stores/rootStore"

export class TodoStore {
  todos: Todo[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)

    makePersistable(this, { name: "TodoStore", properties: ["todos"], storage: window.localStorage })
  }

  getById(id: number) {
    return this.todos.find((todo) => todo.id === id)
  }

  create(todo: NonPersistedTodo) {
    this.todos.push({
      ...todo,
      id: this.getAvailableId(),
    })
  }

  update(todo: NonPersistedTodo, id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id)
    this.todos[index] = {
      ...todo,
      id,
    }
  }

  deleteById(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  getAvailableId() {
    const highestTodo = this.todos.sort((a) => a.id)[this.todos.length - 1]
    return highestTodo ? highestTodo.id + 1 : 0
  }
}
