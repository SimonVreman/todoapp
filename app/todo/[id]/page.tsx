"use client"

import SimplePage from "@/components/SimplePage/SimplePage"
import { useStore } from "@/stores/rootStore"
import { notFound } from "next/navigation"
import TodoDetails from "@/components/TodoDetails/TodoDetails"
import { observer } from "mobx-react-lite"

const Page = ({ params }: { params: { id: number } }) => {
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
      <TodoDetails todo={todo} />
      <div className={"mt-2"}>
        {todo.description && <p className={"whitespace-pre-line"}>{todo.description}</p>}
        {!todo.description && <p className={"italic"}>No description</p>}
      </div>
    </SimplePage>
  )
}

export default observer(Page)
