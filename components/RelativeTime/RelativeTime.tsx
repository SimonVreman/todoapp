import * as dayjs from "dayjs"
import * as relativeTime from "dayjs/plugin/relativeTime"

export default function RelativeTime({ timestamp }: { timestamp: number }) {
  dayjs.extend(relativeTime)

  return <span>{dayjs(timestamp).fromNow()}</span>
}
