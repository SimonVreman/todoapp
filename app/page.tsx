"use client"

import { notFound, useRouter } from "next/navigation"
import { useStore } from "@/stores/rootStore"
import { observer } from "mobx-react-lite"
import Loading from "@/app/loading"
import { useEffect } from "react"

const Home = () => {
  const { todoStore } = useStore()
  const todos = todoStore.get()
  const router = useRouter()

  if (!todos || !todos.length) {
    notFound()
  }

  useEffect(() => {
    if (todos && todos.length) {
      todoStore.executeDeletes()
      const todo = todos.slice().sort((a, b) => {
        if (a.done && !b.done) return 1
        if (a.timestamp && !b.timestamp) return -1
        if (a.timestamp < b.timestamp) return -1
        return 1
      })[0]
      router.push(`/todo/${todo.id}`)
    }
  }, [todos, router, todoStore])

  return <Loading />
}

export default observer(Home)
