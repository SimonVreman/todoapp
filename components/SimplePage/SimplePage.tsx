import React from "react"

export default function SimplePage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className={"text-xl md:text-2xl mb-2"}>{title}</h1>
      <div>{children}</div>
    </div>
  )
}
