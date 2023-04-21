import Input from "@/components/Input/Input"

export default function TextAreaInput({ label, content }: { label: string; content: string }) {
  return (
    <Input label={label}>
      <textarea className={"rounded-md border border-gray-300 p-1 w-full resize-none"} rows={3}>
        {content}
      </textarea>
    </Input>
  )
}
