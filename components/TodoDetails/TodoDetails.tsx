import { Todo } from "@/types/todo"
import React from "react"
import Link from "next/link"
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import TodoPriorityBadge from "@/components/TodoPriorityBadge/TodoPriorityBadge"
import { useStore } from "@/stores/rootStore"
import classNames from "classnames"
import RelativeTime from "@/components/RelativeTime/RelativeTime"
import { useRouter } from "next/navigation"
import Spinner from "@/components/Spinner/Spinner"

const TodoDetails = ({ todo }: { todo: Todo }) => {
  const { todoStore } = useStore()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = React.useState(false)

  const deleteTodo = async () => {
    setIsDeleting(true)
    // Schedule because router events disappeared now?
    todoStore.scheduleDelete(todo.id)
    router.push("/")
  }

  return (
    <div className={"flex justify-between pb-2 border-b border-gray-300 text-gray-600"}>
      <span className={"flex"}>
        <CheckIcon
          onClick={() => !isDeleting && todoStore.toggleDone(todo.id)}
          className={classNames("h-6 mr-2 hover:text-green-500 transition-colors cursor-pointer", {
            "text-green-500 hover:text-gray-600": todo.done,
          })}
        />
        <TodoPriorityBadge priority={todo.priority} />
        {todo.timestamp && (
          <span className={classNames({ "text-red-500": todo.timestamp < Date.now() })}>
            Due <RelativeTime timestamp={todo.timestamp} />
          </span>
        )}
        {!todo.timestamp && <span>No due date</span>}
      </span>
      <span className={"flex items-center transition-colors"}>
        <Link href={`/todo/${todo.id}/edit`} className={"mr-2"}>
          <PencilIcon className={"h-6 hover:text-gray-900"} />
        </Link>
        {!isDeleting && <TrashIcon className={"h-6 hover:text-gray-900 cursor-pointer"} onClick={deleteTodo} />}
        {isDeleting && <Spinner className={"h-6"} />}
      </span>
    </div>
  )
}

export default TodoDetails
