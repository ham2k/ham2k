import { findContestInfoForId } from "@ham2k/data/contests"

export default function analyzeQSOs(qso, options, results, scratchpad) {
  scratchpad.contestInfo = scratchpad.contestInfo || findContestInfoForId(scratchpad.contest)

  options.binLength = options.binLength || 15
  results.bins = results.bins || {}
  results.bands = results.bands || {}
  results.modes = results.modes || {}
  results.totals = results.totals || {}

  const binMillis = qso.startMillis - (qso.startMillis % (options.binLength * 60 * 1000))
  const binTime = new Date(binMillis).toISOString()

  results.bands[qso.band] = true
  results.modes[qso.mode] = true

  results.bins[binTime] = results.bins[binTime] || {
    startMillis: binMillis,
    start: binTime,
    qsos: {},
  }

  results.bins[binTime].qsos["all"] = (results.bins[binTime].qsos["all"] || 0) + 1
  if (qso.band) {
    results.bins[binTime].qsos[qso.band] = (results.bins[binTime].qsos[qso.band] || 0) + 1
  }

  results.totals["all"] = (results.totals["all"] || 0) + 1
  if (qso.band) {
    results.totals[qso.band] = (results.totals[qso.band] || 0) + 1
  }

  return true
}
