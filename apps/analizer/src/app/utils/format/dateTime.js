import { DateTime } from "luxon"

const HAM2K_CONTEST_TIMESTAMP = {
  hour12: false,
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
}

const HAM2K_CONTEST_TIMESTAMP_ZULU = {
  ...HAM2K_CONTEST_TIMESTAMP,
  timeZone: "UTC",
}

export function contestTimestamp(dt) {
  if (typeof dt === "string") {
    dt = DateTime.parse(dt)
  } else if (typeof dt === "number") {
    dt = DateTime.fromMillis(dt)
  }

  return dt.toLocaleString(HAM2K_CONTEST_TIMESTAMP)
}

export function contestTimestampZulu(dt) {
  if (typeof dt === "string") {
    dt = DateTime.parse(dt)
  } else if (typeof dt === "number") {
    dt = DateTime.fromMillis(dt)
  }

  return dt.toLocaleString(HAM2K_CONTEST_TIMESTAMP_ZULU)
}

export function minutesAsHM(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60

  return `${h}h ${m}m`
}
