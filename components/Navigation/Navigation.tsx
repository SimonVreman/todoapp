"use client"

import { useStore } from "@/stores/rootStore"
import Link from "next/link"
import { PlusSmallIcon } from "@heroicons/react/24/outline"
import { observer } from "mobx-react-lite"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Todo } from "@/types/todo"
import NavigationLoading from "@/components/Navigation/NavigationLoading"
import NavigationGroup from "@/components/NavigationGroup/NavigationGroup"
import dayjs from "dayjs"

const Navigation = () => {
  const { todoStore } = useStore()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const pathname = usePathname()
  const active = +pathname.split("/")[2]

  useEffect(() => {
    setTodos(todoStore.todos)
    setLoading(false)
  }, [todoStore.todos])

  if (loading) {
    return <NavigationLoading />
  }

  const notDone = todos.filter((todo) => !todo.done)
  const groups = {
    Overdue: notDone.filter((todo) => todo.timestamp && todo.timestamp < Date.now()),
    Today: notDone.filter((todo) => todo.timestamp && dayjs(todo.timestamp).diff(dayjs(), "day") === 0),
    Tomorrow: notDone.filter((todo) => todo.timestamp && dayjs(todo.timestamp).diff(dayjs(), "day") === 1),
    Later: notDone.filter((todo) => todo.timestamp && dayjs(todo.timestamp).diff(dayjs(), "day") > 1),
    "No due date": notDone.filter((todo) => !todo.timestamp),
    Done: todos.filter((todo) => todo.done),
  }

  return (
    <div className={"w-full h-full p-4 flex flex-col text-gray-600"}>
      <div>
        <Link
          href={"/todo/add"}
          className={
            "border-b border-gray-300 pb-2 md:pb-3 mb-2 text-lg flex items-center hover:text-gray-900 transition-colors"
          }
        >
          <PlusSmallIcon className={"h-6 mr-2"} /> New
        </Link>
      </div>
      <div className={"flex flex-col overflow-y-scroll"}>
        {Object.keys(groups).map((group) => {
          const todos = groups[group]
          if (todos.length === 0) return null
          return <NavigationGroup key={group} title={group} todos={groups[group]} active={active} />
        })}
      </div>
    </div>
  )
}

export default observer(Navigation)
