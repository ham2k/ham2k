import analyzeQSOs from "./analyzeQSOs"
import analyzeRates from "./analyzeRates"
import analyzeTimes from "./analyzeTimes"
import analyzeCalls from "./analyzeCalls"

const options = {
  minimumBreak: 30,
  officialBreak: 60,
}

const analyzers = {
  times: { name: "Time Periods", analyzer: analyzeTimes },
  rates: { name: "Rates", analyzer: analyzeRates },
  qsos: { name: "QSOs", analyzer: analyzeQSOs },
  calls: { name: "Callsigns", analyzer: analyzeCalls },
}

export default function analyzeAll(qson) {
  const results = {}
  const scratchpads = {}

  for (let key in analyzers) {
    results[key] = {}
    scratchpads[key] = {}

    const analyzer = analyzers[key].analyzer

    if (qson && qson.qsos) {
      for (let qso of qson.qsos) {
        analyzer(qso, options, results[key], scratchpads[key])
      }
    }
  }

  // Clone the results so we can components can detect their attributes have changed
  const newResults = {}
  for (let key in analyzers) {
    newResults[key] = { ...results[key] }
  }

  return newResults
}
