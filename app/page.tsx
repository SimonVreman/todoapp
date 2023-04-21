import Link from "next/link"

export default function Home() {
  return (
    <div className={"flex justify-center items-center h-full w-full"}>
      <Link className={"text-gray-500 text-center underline"} href={"/todo/add"}>
        No todo items yet, create one now!
      </Link>
    </div>
  )
}
