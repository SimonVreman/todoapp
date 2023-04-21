"use client"

import { useStore } from "@/stores/rootStore"
import Link from "next/link"
import { CheckIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { observer } from "mobx-react-lite"

const Navigation = () => {
  const { todoStore } = useStore()

  const todos = todoStore.getAll()

  return (
    <div className={"w-full h-full p-4 flex flex-col text-gray-600"}>
      <div>
        <Link
          href={"/todo/add"}
          className={
            "border-b border-gray-300 pb-3 mb-2 text-lg flex items-center hover:text-gray-900 transition-colors"
          }
        >
          <PlusSmallIcon className={"h-6 mr-2"} /> New
        </Link>
      </div>
      {todos
        .slice()
        .sort((a, b) => (a.updated > b.updated ? -1 : 1))
        .map((todo) => (
          <div key={todo.id}>
            <Link href={`/todo/${todo.id}`} className={"flex items-center hover:text-gray-900 transition-colors"}>
              {todo.done && (
                <CheckIcon
                  className={classNames("h-6 mr-2", {
                    "text-green-500 hover:text-green-900": todo.done,
                  })}
                />
              )}
              {!todo.done && <MinusSmallIcon className={classNames("h-6 mr-2")} />}
              <span className={"truncate flex-shrink"}>{todo.name}</span>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default observer(Navigation)
