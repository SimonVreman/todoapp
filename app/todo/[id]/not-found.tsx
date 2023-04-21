"use client"

import SimplePage from "@/components/SimplePage/SimplePage"
import Link from "next/link"

export default function NotFound() {
  return (
    <SimplePage title={"Todo not found :("}>
      <p className={"text-gray-600"}>
        This todo was not found, select a different one or{" "}
        <Link href={"/todo/add"} className={"underline"}>
          create a new one
        </Link>
        .
      </p>
    </SimplePage>
  )
}
