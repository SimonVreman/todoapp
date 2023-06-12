import Spinner from "@/components/Spinner/Spinner"

export default function Loading() {
  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <Spinner className={"h-6 text-gray-600"} />
    </div>
  )
}
