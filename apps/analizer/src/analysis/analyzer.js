import analyzeQSOs from "./analizeQSOs"
import analyzeRates from "./analizeRates"
import analyzeTimes from "./analyzeTimes"
import analyzeCalls from "./analizeCalls"

const options = {
  minimumBreak: 30,
  officialBreak: 60,
}

const analizers = {
  times: { name: "Time Periods", analizer: analyzeTimes },
  rates: { name: "Rates", analizer: analyzeRates },
  qsos: { name: "QSOs", analizer: analyzeQSOs },
  calls: { name: "Callsigns", analizer: analyzeCalls },
}

export default function analyzeAll(qson) {
  const results = {}
  const scratchpads = {}

  for (let key in analizers) {
    results[key] = {}
    scratchpads[key] = {}

    const analizer = analizers[key].analizer

    if (qson && qson.qsos) {
      for (let qso of qson.qsos) {
        analizer(qso, options, results[key], scratchpads[key])
      }
    }
  }

  // Clone the results so we can components can detect their attributes have changed
  const newResults = {}
  for (let key in analizers) {
    newResults[key] = { ...results[key] }
  }

  return newResults
}
