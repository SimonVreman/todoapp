"use client"

import { NonPersistedTodo, Todo } from "@/types/todo"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import classNames from "classnames"
import { useStore } from "@/stores/rootStore"
import { useRouter } from "next/navigation"

export default function TodoForm({ oldTodo }: { oldTodo?: Todo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { todoStore } = useStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setLoading(true)
    if (data.timestamp) data.timestamp = new Date(data.timestamp).getTime()
    const todo = oldTodo?.id !== undefined ? todoStore.update(data, oldTodo.id) : todoStore.create(data)
    await router.push(`/todo/${todo.id}`)
  }

  const todo: NonPersistedTodo = {
    name: oldTodo?.name ?? "",
    description: oldTodo?.description ?? "",
    priority: oldTodo?.priority ?? 2,
    timestamp: oldTodo?.timestamp,
    done: false,
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"w-full"}>
      <div className={"mb-2"}>
        <label
          className={classNames("text-gray-600 mb-1", {
            "text-red-600": errors.name,
          })}
        >
          Name {errors.name?.message?.toString()}
        </label>
        <input
          className={"rounded-md border border-gray-300 p-1 w-full"}
          defaultValue={todo.name}
          {...register("name", { required: true, minLength: 3, maxLength: 40 })}
          aria-invalid={errors.name ? "true" : "false"}
          disabled={loading}
        />
      </div>

      <div className={"mb-2"}>
        <label
          className={classNames("text-gray-600 mb-1", {
            "text-red-600": errors.description,
          })}
        >
          Description
        </label>
        <textarea
          className={"rounded-md border border-gray-300 p-1 w-full resize-none"}
          rows={3}
          defaultValue={todo.description}
          aria-invalid={errors.description ? "true" : "false"}
          {...register("description", { required: false, maxLength: 250 })}
          disabled={loading}
        ></textarea>
      </div>

      <div className={"mb-2"}>
        <label className={"text-gray-600 mb-1"}>Due</label>
        <input
          className={"w-full p-1 rounded-md border border-gray-300"}
          type={"datetime-local"}
          defaultValue={todo.timestamp ? new Date(todo.timestamp).toISOString().slice(0, 16) : undefined}
          {...register("timestamp", { required: false })}
          aria-invalid={errors.priority ? "true" : "false"}
          disabled={loading}
        />
      </div>

      <div className={"mb-2"}>
        <label
          className={classNames("text-gray-600 mb-1", {
            "text-red-600": errors.priority,
          })}
        >
          Priority
        </label>
        <input
          className={"w-full"}
          type={"range"}
          step={1}
          min={1}
          max={3}
          defaultValue={todo.priority}
          {...register("priority", { required: true, min: 1, max: 3 })}
          aria-invalid={errors.priority ? "true" : "false"}
          disabled={loading}
        />
      </div>

      <div className={"mb-2"}>
        <button
          className={classNames("bg-blue-500 text-white rounded-md px-3 py-1", { "bg-gray-400": loading })}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </form>
  )
}
