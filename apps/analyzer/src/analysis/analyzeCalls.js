const KEYS = [
  ["dxcc", "dxccCode"],
  ["continents", "continent"],
  ["cqZones", "cqZone"],
  ["ituZones", "ituZone"],
  ["calls", "call"],
]

export default function analyzeCallsigns(qso, options, results, scratchpad) {
  for (const [totalKey, valueKey] of KEYS) {
    results[totalKey] = results[totalKey] || {}

    if (qso.their[valueKey]) {
      results[totalKey][qso.their[valueKey]] = (results[totalKey][qso.their[valueKey]] || 0) + 1
    }
  }

  return true
}
