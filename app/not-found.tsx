"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className={"flex justify-center items-center h-full w-full"}>
      <Link className={"text-gray-600 text-center underline"} href={"/todo/add"}>
        No todo items yet, create one now!
      </Link>
    </div>
  )
}
