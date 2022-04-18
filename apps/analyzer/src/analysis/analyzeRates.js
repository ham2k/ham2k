export default function analyzeRates(qso, options, results, scratchpad) {
  scratchpad.rollingTimes = scratchpad.rollingTimes || {}

  options.rollingCount = 10

  results.all = results.all || []
  results[qso.band] = results[qso.band] || []

  const keys = ["all", qso.band]
  keys.forEach((key) => {
    scratchpad.rollingTimes[key] = scratchpad.rollingTimes[key] || []
    results[key] = results[key] || []

    scratchpad.rollingTimes[key].push(qso.startMillis)

    while (scratchpad.rollingTimes[key].length > options.rollingCount) {
      scratchpad.rollingTimes[key].shift()
    }

    const len = scratchpad.rollingTimes[key].length

    if (len === 1) {
      results[key].push({ qso, rate: 1 })
    } else {
      const rollingTimeDelta =
        (scratchpad.rollingTimes[key][len - 1] - scratchpad.rollingTimes[key][0] + 60 * 1000) / 60 / 1000 // in minutes

      results[key].push({ qso, rate: Math.round((60 * len) / rollingTimeDelta) })
    }
  })

  return true
}

// rollingTimes:
//   [15] -> 1 QSO/h
//   [15, 16] -> 2 in 2 minutes -> 60 QSO/h
//   [15, 16, 17] -> 3 in 3 minutes -> 60 QSO/h
//   [15, 17] -> 2 in 3 minutes -> 60 * 2 / 3 = 40 QSO/h

//   [15, 15] -> 2 in 1 minute -> 120 QSO/h
//   [15, 15, 15] -> 3 in 1 minute -> 180 QSO/h
