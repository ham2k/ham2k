import { findContestInfoForId } from "@ham2k/data/contests"

export default function analyzeQSOs(qso, options, results, scratchpad) {
  scratchpad.contestInfo = scratchpad.contestInfo || findContestInfoForId(scratchpad.contest)

  options.sliceLength = options.sliceLength || 15
  results.slices = results.slices || {}
  results.totals = results.totals || {}

  const sliceMillis = qso.startMillis - (qso.startMillis % (options.sliceLength * 60 * 1000))
  const sliceTime = new Date(sliceMillis).toISOString()

  results.slices[sliceTime] = results.slices[sliceTime] || {
    startMillis: sliceMillis,
    start: sliceTime,
    qsos: {},
  }

  results.slices[sliceTime].qsos["all"] = (results.slices[sliceTime].qsos["all"] || 0) + 1
  if (qso.band) {
    results.slices[sliceTime].qsos[qso.band] = (results.slices[sliceTime].qsos[qso.band] || 0) + 1
  }

  results.totals["all"] = (results.totals["all"] || 0) + 1
  if (qso.band) {
    results.totals[qso.band] = (results.totals[qso.band] || 0) + 1
  }

  return true
}
