"use client"

import SimplePage from "@/components/SimplePage/SimplePage"
import { useStore } from "@/stores/rootStore"

export default function Page({ params }) {
  const { todoStore } = useStore()
  const todo = todoStore.getById(+params.id)

  return <SimplePage title={todo ? todo.name : "not found"}></SimplePage>
}
