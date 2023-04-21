"use client"

import SimplePage from "@/components/SimplePage/SimplePage"
import { useStore } from "@/stores/rootStore"
import Link from "next/link"

export default function Page({ params }) {
  const { todoStore } = useStore()
  const todo = todoStore.getById(+params.id)

  return (
    <SimplePage title={todo ? todo.name : "Todo not found"}>
      {todo && (
        <div>
          <p>{todo.description}</p>
        </div>
      )}
      {!todo && (
        <p className={"text-gray-500"}>
          This todo was not found, select a different one or{" "}
          <Link href={"/todo/add"} className={"underline"}>
            create a new one
          </Link>
          .
        </p>
      )}
    </SimplePage>
  )
}
