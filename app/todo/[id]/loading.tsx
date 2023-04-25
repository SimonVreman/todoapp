import SimplePage from "@/components/SimplePage/SimplePage"
import Skeleton from "react-loading-skeleton"

export default function Loading() {
  return (
    <SimplePage title={<Skeleton />}>
      <Skeleton count={5} />
    </SimplePage>
  )
}
