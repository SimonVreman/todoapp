import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

export default function RelativeTime({ timestamp }: { timestamp: number }) {
  dayjs.extend(relativeTime)

  return <span>{dayjs(timestamp).fromNow()}</span>
}
