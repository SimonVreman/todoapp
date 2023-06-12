import { Todo } from "@/types/todo"
import React from "react"
import Link from "next/link"
import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline"
import TodoPriorityBadge from "@/components/TodoPriorityBadge/TodoPriorityBadge"
import { useStore } from "@/stores/rootStore"
import classNames from "classnames"

const TodoDetails = ({ todo }: { todo: Todo }) => {
  const { todoStore } = useStore()

  return (
    <div className={"flex justify-between pb-2 border-b border-gray-300 text-gray-600"}>
      <span className={"flex"}>
        <CheckIcon
          onClick={() => todoStore.toggleDone(todo.id)}
          className={classNames("h-6 mr-2 hover:text-green-500 transition-colors", {
            "text-green-500 hover:text-gray-600": todo.done,
          })}
        />
        <TodoPriorityBadge priority={todo.priority} />
        {todo.timestamp && <span>Due {todo.timestamp}</span>}
        {!todo.timestamp && <span>No due date</span>}
      </span>
      <Link
        href={`/todo/edit/${todo.id}`}
        className={"text-lg flex items-center hover:text-gray-900 transition-colors"}
      >
        <PencilIcon className={"h-6"} />
      </Link>
    </div>
  )
}

export default TodoDetails
