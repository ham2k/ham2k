import analyzeTimes from "./analyzeTimes"

const options = {
  minimumBreak: 15,
  officialBreak: 60,
}

const analizers = {
  times: { name: "Time Periods", analizer: analyzeTimes },
}

export default function analyzeAll(qson) {
  const results = {}
  const scratchpads = {}

  for (let key in analizers) {
    results[key] = {}
    scratchpads[key] = {}

    const analizer = analizers[key].analizer

    for (let qso of qson.qsos) {
      analizer(qso, options, results[key], scratchpads[key])
    }
  }

  return results
}
