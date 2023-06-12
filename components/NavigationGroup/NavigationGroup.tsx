import { Todo } from "@/types/todo"
import Link from "next/link"
import classNames from "classnames"
import { CheckIcon } from "@heroicons/react/24/outline"
import TodoPriorityBadge from "@/components/TodoPriorityBadge/TodoPriorityBadge"

const NavigationGroup = ({ title, todos, active }: { title: string; todos: Todo[]; active: number }) => {
  return (
    <div className={"mb-2"}>
      <div className={"text-gray-500 text-sm mb-1"}>{title}</div>
      {todos
        .slice()
        .sort((a, b) => (a.updated > b.updated ? -1 : 1))
        .map((todo) => (
          <div key={todo.id}>
            <Link
              href={`/todo/${todo.id}`}
              className={classNames("flex items-center hover:text-gray-900 transition-colors my-0.5")}
            >
              {todo.done && (
                <CheckIcon
                  className={classNames("h-6 mr-1 flex-shrink-0", {
                    "text-green-500 hover:text-green-900": todo.done,
                  })}
                />
              )}
              {!todo.done && <TodoPriorityBadge className={"mr-2"} priority={todo.priority} />}
              <span
                className={classNames("truncate rounded-md transition-all", { "px-2 bg-gray-300": todo.id === active })}
              >
                {todo.name}
              </span>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default NavigationGroup
