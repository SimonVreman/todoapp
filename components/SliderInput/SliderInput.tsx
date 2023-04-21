import Input from "@/components/Input/Input"

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
}) {
  return (
    <Input label={label}>
      <input className={"w-full"} type={"range"} min={min} max={max} step={step} value={value} />
    </Input>
  )
}
