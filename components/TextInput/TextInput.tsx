import Input from "@/components/Input/Input"

export default function TextInput({ label, content }: { label: string; content: string }) {
  return (
    <Input label={label}>
      <input className={"rounded-md border border-gray-300 p-1 w-full"} value={content} />
    </Input>
  )
}
