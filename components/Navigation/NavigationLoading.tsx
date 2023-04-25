import Spinner from "@/components/Spinner/Spinner"

export default function NavigationLoading() {
  return (
    <div className={"flex justify-center items-center h-full w-full"}>
      <Spinner className={"h-6 text-gray-600"} />
    </div>
  )
}
