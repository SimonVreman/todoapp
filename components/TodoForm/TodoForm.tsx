import { NonPersistedTodo, Todo } from "@/types/todo"
import TextInput from "@/components/TextInput/TextInput"
import TextAreaInput from "@/components/TextAreaInput/TextAreaInput"
import SliderInput from "@/components/SliderInput/SliderInput"

export default function TodoForm({ oldTodo }: { oldTodo?: Todo }) {
  const todo: NonPersistedTodo = {
    name: oldTodo?.name ?? "",
    description: oldTodo?.description ?? "",
    priority: oldTodo?.priority ?? 2,
    timestamp: oldTodo?.timestamp ?? 0,
  }

  return (
    <form>
      <div className={"mb-2"}>
        <TextInput label={"Name"} content={todo.name} />
      </div>

      <div className={"mb-2"}>
        <TextAreaInput className={"mb-2"} label={"Description"} content={todo.description} />
      </div>

      <div className={"mb-2"}>
        <SliderInput className={"mb-2"} label={"Priority"} value={todo.priority} min={1} max={3} step={1} />
      </div>
    </form>
  )
}
