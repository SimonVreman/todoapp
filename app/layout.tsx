import "./globals.css"
import React from "react"

export const metadata = {
  title: "todo",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={"w-screen h-screen flex justify-center p-10"}>
        <div
          className={
            "container max-w-screen-lg min-h-full flex flex-col sm:flex-row rounded-lg border border-gray-300 overflow-hidden"
          }
        >
          <nav className={"w-full h-52 sm:w-52 sm:h-full overflow-x-scroll bg-gray-200"}></nav>
          <main
            className={"flex-grow overflow-x-scroll bg-gray-100 border-t sm:border-t-0 sm:border-l border-gray-300 p-4"}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
