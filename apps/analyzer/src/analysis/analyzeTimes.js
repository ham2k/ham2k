export default function analyzeTimes(qso, options, results, scratchpad) {
  options.minimumBreak = options.minimumBreak || 15
  results.periods = results.periods || []

  const lastPeriod = results.periods[results.periods.length - 1]

  if (!lastPeriod) {
    results.periods.push({
      qsos: [qso],
      start: qso.start,
      startMillis: qso.startMillis,
      end: qso.start,
      endMillis: qso.startMillis,
      activeMinutes: 1,
    })
    results.activeMinutes = 1
    results.inactiveMinutes = 0
  } else if (qso.startMillis === lastPeriod.endMillis) {
    lastPeriod.qsos.push(qso)
  } else if (qso.startMillis - lastPeriod.endMillis > options.minimumBreak * 60 * 1000) {
    lastPeriod.inactiveMinutes = Math.floor((qso.startMillis - lastPeriod.endMillis) / (60 * 1000)) - 1
    results.inactiveMinutes += lastPeriod.inactiveMinutes
    results.activeMinutes += 1

    results.periods.push({
      qsos: [qso],
      start: qso.start,
      startMillis: qso.startMillis,
      end: qso.start,
      endMillis: qso.startMillis,
      activeMinutes: 1,
    })
  } else {
    const minutes = Math.floor((qso.startMillis - lastPeriod.endMillis) / (60 * 1000))
    lastPeriod.activeMinutes += minutes
    results.activeMinutes += minutes

    lastPeriod.qsos.push(qso)
    lastPeriod.end = qso.start
    lastPeriod.endMillis = qso.startMillis
  }

  return true
}
