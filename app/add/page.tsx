import SimplePage from '@/components/SimplePage/SimplePage'
import TodoForm from '@/components/TodoForm/TodoForm'

export default function Home () {
  return (
    <SimplePage title={'Create a new todo'}>
      <TodoForm />
    </SimplePage>
  )
}
