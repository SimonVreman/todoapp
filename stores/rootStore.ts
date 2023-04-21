import { TodoStore } from "@/stores/todoStore"
import React from "react"

export class RootStore {
  public todoStore: TodoStore
  constructor() {
    this.todoStore = new TodoStore(this)
  }
}

let store: RootStore

function initializeStore(): RootStore {
  const _store = store ?? new RootStore()

  // For server side rendering always create a new store
  if (typeof window === "undefined") return _store

  // Create the store once in the client
  if (!store) store = _store

  return _store
}

const STORE_CONTEXT = React.createContext(initializeStore())
export const useStore = () => React.useContext(STORE_CONTEXT)
