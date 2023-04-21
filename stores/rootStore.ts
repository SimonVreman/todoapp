import { TodoStore } from "@/stores/todoStore"
import React from "react"

export class RootStore {
  public todoStore: TodoStore
  constructor() {
    this.todoStore = new TodoStore(this)
  }
}

const STORE_CONTEXT = React.createContext(new RootStore())
export const useStore = () => React.useContext(STORE_CONTEXT)
