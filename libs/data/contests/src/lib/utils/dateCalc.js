const { DateTime } = require("luxon")

const MONTHS = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
}

const WEEKDAYS = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
}

function nthFullWeekendInMonth(dt, n) {
  if (typeof dt === "string") dt = DateTime.fromISO(dt, { zone: "UTC" })

  const firstDayInMonth = dt.startOf("month")

  let start = firstDayInMonth.plus({ days: ((7 + 6 - firstDayInMonth.weekday) % 7) + (n - 1) * 7 })
  let end = start.plus({ days: 1 }).endOf("day")

  return [start, end]
}

const firstFullWeekendInMonth = (dt) => nthFullWeekendInMonth(dt, 1)
const secondFullWeekendInMonth = (dt) => nthFullWeekendInMonth(dt, 2)
const thirdFullWeekendInMonth = (dt) => nthFullWeekendInMonth(dt, 3)
const fourthFullWeekendInMonth = (dt) => nthFullWeekendInMonth(dt, 4)

function lastFullWeekendInMonth(dt) {
  if (typeof dt === "string") dt = DateTime.fromISO(dt, { zone: "UTC" })

  const lastDayInMonth = dt.endOf("month")

  let end = lastDayInMonth.minus({ days: (7 + lastDayInMonth.weekday) % 7 })
  let start = end.minus({ days: 1 }).startOf("day")

  return [start, end]
}

function lastSaturdayWeekendInMonth(dt) {
  if (typeof dt === "string") dt = DateTime.fromISO(dt, { zone: "UTC" })

  const lastDayInMonth = dt.endOf("month")

  let start = lastDayInMonth.minus({ days: (7 + lastDayInMonth.weekday + 1) % 7 }).startOf("day")
  let end = start.plus({ days: 1 }).endOf("day")

  return [start, end]
}

function roundDateToMonth(dt, month) {
  if (typeof dt === "string") dt = DateTime.fromISO(dt, { zone: "UTC" })

  let months = []
  if (month instanceof Array) {
    months = months.concat(month)
  } else {
    months.push(month)
  }

  const dates = []
  months.forEach((m) => {
    dates.push(dt.set({ month: m }))
    dates.push(dt.set({ month: m, year: dt.year + 1 }))
    dates.push(dt.set({ month: m, year: dt.year - 1 }))
  })

  return dates.sort((a, b) => Math.abs(dt.diff(a, "days").days) - Math.abs(dt.diff(b, "days").days))[0]
}

module.exports = {
  MONTHS,
  WEEKDAYS,
  nthFullWeekendInMonth,
  firstFullWeekendInMonth,
  secondFullWeekendInMonth,
  thirdFullWeekendInMonth,
  fourthFullWeekendInMonth,
  lastFullWeekendInMonth,
  lastSaturdayWeekendInMonth,
  roundDateToMonth,
}
