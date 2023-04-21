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
    <SimplePage title={todo ? todo.name : "Todo not found"}>
      <div>
        <p>{todo.description}</p>
      </div>
    </SimplePage>
  )
}
