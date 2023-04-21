"use client"

import SimplePage from "@/components/SimplePage/SimplePage"
import { useStore } from "@/stores/rootStore"
import { notFound } from "next/navigation"

export default function Page({ params }) {
  const { todoStore } = useStore()
  const todo = todoStore.getById(+params.id)

  if (!todo) {
    notFound()
  }

  return (
    <SimplePage title={todo.name}>
      <div>
        {todo.done && <span></span>}
        {!todo.done && <span></span>}
      </div>
      <div className={"text-gray-600"}>
        {todo.description && <p>{todo.description}</p>}
        {!todo.description && <p className={"italic"}>No description</p>}
      </div>
    </SimplePage>
  )
}
