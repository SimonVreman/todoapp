"use client"

import { NonPersistedTodo, Todo } from "@/types/todo"
import React from "react"
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

  const onSubmit = async (data) => {
    const todo = oldTodo?.id !== undefined ? todoStore.update(data, oldTodo.id) : todoStore.create(data)
    await router.push(`/todo/${todo.id}`)
  }

  const todo: NonPersistedTodo = {
    name: oldTodo?.name ?? "",
    description: oldTodo?.description ?? "",
    priority: oldTodo?.priority ?? 2,
    timestamp: oldTodo?.timestamp ?? 0,
    done: false,
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"mb-2"}>
        <label
          className={classNames("text-gray-600 mb-1", {
            "text-red-600": errors.name,
          })}
        >
          Name {errors.name?.message}
        </label>
        <input
          className={"rounded-md border border-gray-300 p-1 w-full"}
          defaultValue={todo.name}
          {...register("name", { required: true, minLength: 3, maxLength: 40 })}
          aria-invalid={errors.name ? "true" : "false"}
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
        ></textarea>
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
          {...register("priority", { required: true, min: 1, max: 3 })}
          aria-invalid={errors.priority ? "true" : "false"}
        />
      </div>

      <div className={"mb-2"}>
        <button className={"bg-blue-500 text-white rounded-md px-3 py-1"}>Save</button>
      </div>
    </form>
  )
}
