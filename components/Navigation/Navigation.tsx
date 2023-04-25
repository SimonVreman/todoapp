"use client"

import { useStore } from "@/stores/rootStore"
import Link from "next/link"
import { CheckIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { observer } from "mobx-react-lite"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Todo } from "@/types/todo"
import NavigationLoading from "@/components/Navigation/NavigationLoading"

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
        {todos
          .slice()
          .sort((a, b) => (a.updated > b.updated ? -1 : 1))
          .map((todo) => (
            <div key={todo.id}>
              <Link
                href={`/todo/${todo.id}`}
                className={classNames("flex items-center hover:text-gray-900 transition-all", {
                  "pl-2 text-gray-900": todo.id === active,
                })}
              >
                {todo.done && (
                  <CheckIcon
                    className={classNames("h-6 mr-2 flex-shrink-0", {
                      "text-green-500 hover:text-green-900": todo.done,
                    })}
                  />
                )}
                {!todo.done && <MinusSmallIcon className={classNames("h-6 mr-2 flex-shrink-0")} />}
                <span className={"truncate"}>{todo.name}</span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default observer(Navigation)
