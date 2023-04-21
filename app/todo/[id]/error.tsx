"use client"

import SimplePage from "@/components/SimplePage/SimplePage"

export default function Error() {
  return (
    <SimplePage title={"Something went wrong :("}>
      <p className={"text-gray-600"}>Please try opening a different todo.</p>
    </SimplePage>
  )
}
