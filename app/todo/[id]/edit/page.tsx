"use client"

import SimplePage from "@/components/SimplePage/SimplePage"
import TodoForm from "@/components/TodoForm/TodoForm"
import { useStore } from "@/stores/rootStore"
import { notFound } from "next/navigation"
import { observer } from "mobx-react-lite"

const Page = ({ params }) => {
  const { todoStore } = useStore()
  const todo = todoStore.getById(+params.id)

  if (!todo) {
    notFound()
  }

  return (
    <SimplePage title={"Modify todo"}>
      <TodoForm className={"w-full"} oldTodo={todo} />
    </SimplePage>
  )
}

export default observer(Page)
