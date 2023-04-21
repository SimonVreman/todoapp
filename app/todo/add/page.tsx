import SimplePage from "@/components/SimplePage/SimplePage"
import TodoForm from "@/components/TodoForm/TodoForm"

export default function Page() {
  return (
    <SimplePage title={"Create a new todo"}>
      <TodoForm className={"w-full"} />
    </SimplePage>
  )
}
