import { NonPersistedTodo, Todo } from '@/types/todo'

export default function TodoForm ({ oldTodo }: { oldTodo?: Todo }) {
  const todo: NonPersistedTodo = {
    name: oldTodo?.name ?? '',
    description: oldTodo?.description ?? '',
    priority: oldTodo?.priority ?? 0
  }

  return (
    <form>
      todo ;)
    </form>
  )
}
