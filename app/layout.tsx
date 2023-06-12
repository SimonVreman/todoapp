import "./globals.css"
import React from "react"
import Navigation from "@/components/Navigation/Navigation"
import NavigationError from "@/components/Navigation/NavigationError"
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary"
import "react-loading-skeleton/dist/skeleton.css"

export const metadata = {
  title: "todo",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={"w-screen h-screen flex justify-center sm:p-10"}>
        <div
          className={
            "container max-w-screen-lg min-h-full flex flex-col sm:flex-row sm:rounded-lg sm:border border-gray-300"
          }
        >
          <nav className={"w-full h-64 sm:w-52 sm:h-full bg-gray-200 sm:rounded-r-none sm:rounded-l-lg"}>
            <ErrorBoundary fallback={<NavigationError />}>
              <Navigation />
            </ErrorBoundary>
          </nav>
          <main
            className={
              "flex-grow bg-gray-100 overflow-scroll border-t sm:border-t-0 sm:border-l border-gray-300 p-4 sm:rounded-l-none sm:rounded-r-lg"
            }
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
