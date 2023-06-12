"use client"

import { useStore } from "@/stores/rootStore"
import Link from "next/link"
import { PlusSmallIcon } from "@heroicons/react/24/outline"
import { observer } from "mobx-react-lite"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Todo, TodoGroups } from "@/types/todo"
import NavigationLoading from "@/components/Navigation/NavigationLoading"
import NavigationGroup from "@/components/NavigationGroup/NavigationGroup"
import dayjs from "dayjs"

const Navigation = () => {
  const { todoStore } = useStore()
  const [todos, setTodos] = useState<Todo[]>([])
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
  const [search, setSearch] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const pathname = usePathname()
  const active = +pathname.split("/")[2]

  useEffect(() => {
    setTodos(todoStore.todos)
    setLoading(false)
  }, [todoStore.todos])

  useEffect(() => {
    setFilteredTodos(search.length ? todos.filter((todo) => (todo.name + todo.description).includes(search)) : todos)
  }, [search, todos])

  if (loading) {
    return <NavigationLoading />
  }

  const notDone = filteredTodos.filter((todo) => !todo.done)
  const groups: TodoGroups = {
    Overdue: notDone.filter((todo) => todo.timestamp && todo.timestamp < Date.now()),
    Today: notDone.filter((todo) => todo.timestamp && dayjs(todo.timestamp).diff(dayjs(), "day") === 0),
    Tomorrow: notDone.filter((todo) => todo.timestamp && dayjs(todo.timestamp).diff(dayjs(), "day") === 1),
    Later: notDone.filter((todo) => todo.timestamp && dayjs(todo.timestamp).diff(dayjs(), "day") > 1),
    "No due date": notDone.filter((todo) => !todo.timestamp),
    Done: filteredTodos.filter((todo) => todo.done),
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
      {todos && todos.length !== 0 && (
        <input
          type={"search"}
          placeholder={"Search..."}
          className={
            "w-full rounded-md border border-gray-300 p-1 focus:outline-none focus:border-gray-400 transition-colors"
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <div className={"flex flex-col overflow-y-scroll mt-2"}>
        {todos &&
          todos.length !== 0 &&
          Object.keys(groups).map((group: string) => {
            const todos = groups[group]
            if (todos.length === 0) return null
            return <NavigationGroup key={group} title={group} todos={groups[group]} active={active} />
          })}
        {!todos.length && <div className={"text-gray-500 text-center mt-4"}>Nothing :(</div>}
      </div>
    </div>
  )
}

export default observer(Navigation)
