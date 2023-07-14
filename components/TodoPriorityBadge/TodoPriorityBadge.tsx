import React from "react"
import classNames from "classnames"

export default function TodoPriorityBadge({ priority }: { priority: number }) {
  return (
    <span
      className={classNames("mr-2 flex h-6 shrink-0 w-6 items-center justify-center rounded-md transition-colors", {
        "bg-green-200 text-green-900": +priority === 1,
        "bg-yellow-200 text-yellow-900": +priority === 2,
        "bg-red-200 text-red-900": +priority === 3,
      })}
    >
      {priority}
    </span>
  )
}
