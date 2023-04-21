import React from "react"

export default function Input({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-start w-full"}>
      <label className={"text-gray-600 mb-1"}>{label}</label>
      {children}
    </div>
  )
}
