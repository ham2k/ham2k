import { parseCallsign } from "@ham2k/data/callsigns"
import { annotateFromCountryFile } from "@ham2k/data/country-file"
import { useBuiltinCountryFile } from "@ham2k/data/country-file/builtinData"

// Not sure why ESLint thinks this is a hook 🤷
useBuiltinCountryFile() // eslint-disable-line react-hooks/rules-of-hooks

const KEYS = [
  ["entities", "entityPrefix"],
  ["continents", "continent"],
  ["cqZones", "cqZone"],
  ["ituZones", "ituZone"],
  ["calls", "call"],
]

export default function analyzeCallsigns(qso, options, results, scratchpad) {
  parseCallsign(qso.their.call, qso.their)
  annotateFromCountryFile(qso.their)

  results.entities = results.entities || {}
  results.continents = results.continents || {}
  results.cqZones = results.cqZones || {}
  results.ituZones = results.ituZones || {}
  results.calls = results.calls || {}

  for (const [totalKey, valueKey] of KEYS) {
    if (qso.their[valueKey]) {
      results[totalKey][qso.their[valueKey]] = (results[totalKey][qso.their[valueKey]] || 0) + 1
    }
  }

  return true
}
