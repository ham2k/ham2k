const camelCase = require("camelcase")

export function cabrilloToQSON(str) {
  return parseCabrillo(str)
}

const REGEXP_FOR_END_OF_LINE = /\r?\n/
const REGEXP_FOR_LINE_TAG = /^([A-Z\-]+):\s*(.*)\s*$/
const REGEXP_FOR_LINE_PARTS = /\s+/

function parseCabrillo(str) {
  const cache = {}
  const headers = {}
  const qsos = []
  const qsosOther = []

  const lines = str.split(REGEXP_FOR_END_OF_LINE)
  lines.forEach((line) => {
    const matches = line.match(REGEXP_FOR_LINE_TAG)
    if (matches) {
      const tag = camelCase(matches[1])
      const data = matches[2]

      if (tag === "qso") {
        const qso = parseCabrilloQSO(data.split(REGEXP_FOR_LINE_PARTS), headers, cache)
        qsos.push(qso)
      } else if (tag === "xQso") {
        const qso = parseCabrilloQSO(data.split(REGEXP_FOR_LINE_PARTS), headers, cache)
        qsosOther.push(qso)
      } else {
        if (tag === "startOfLog") {
          headers["version"] = data
        } else if (tag === "endOfLog") {
          // Do nothing
        } else if (tag === "soapbox" || tag === "address") {
          headers[tag] = headers[tag] || []
          headers[tag].push(data)
        } else {
          headers[tag] = data
        }
      }
    }
  })
  return {
    source: "cabrillo",
    rawCabrillo: headers,
    refs: [normalizeContestInfo(headers)],
    qsos,
    qsosOther,
  }
}

function parseCabrilloQSO(parts, headers, cache) {
  if (cache.contestSplitter === undefined) cache.contestSplitter = selectContestSplitter(headers)

  const qso = cache.contestSplitter(parts)

  qso.freq = parseFrequency(parts[0])
  qso.mode = parts[1]
  qso.start = `${parts[2]} ${parts[3].substring(0, 2)}:${parts[3].substring(2, 4)}Z`
  if (cache.hasTransmitterId) {
    qso.our.transmitter = parts[parts.length - 1]
  }

  return qso
}

const REGEXP_FOR_NUMERIC_FREQUENCY = /^\d+$/
function parseFrequency(freq) {
  if (freq.match(REGEXP_FOR_NUMERIC_FREQUENCY)) return Number.parseInt(freq)
  else return freq
}

function normalizeContestInfo(headers) {
  const info = {}
  info.contest = headers.contest
  if (headers.operators) info.operators = headers.operators.split(/(\,\s*|\s+)/)
  if (headers.location) info.location = headers.location
  if (headers.gridLocation) info.grid = headers.gridLocation
  if (headers.claimedScore) info.claimedScore = headers.claimedScore

  return info
}

function selectContestSplitter(headers) {
  const contest = headers.contest || "unknown"
  const isNumeric = { serial: true, check: true, cqZone: true, ituZone: true }
  let fields = []

  if (contest.match(/^CQ-WPX-|DARC-WAEDC-|RSGB-AFS-|RSGB-NFD|RGSB-SSB|RSGB-80/)) {
    fields = ["rst", "serial"]
  } else if (contest.match(/^RSGB-160-|RSGB-COMM|RSGB-IOTA|RSGB-LOW/)) {
    fields = ["rst", "serial", "location"]
  } else if (contest.match(/^ARRL-FD-/)) {
    fields = ["category", "section"]
  } else if (contest.match(/^NAQP-/)) {
    fields = ["name", "state"]
  } else if (contest.match(/^CQ-VHF-/)) {
    fields = ["rst", "grid"]
  } else if (contest.match(/^ARRL-160-/)) {
    fields = ["rst", "section"]
  } else if (contest.match(/^ARRL-VHF-/)) {
    fields = ["grid"]
  } else if (contest.match(/^ARRL-SS-/)) {
    fields = ["serial", "prec", "check", "section"]
  } else if (contest.match(/^CQ-WW-/)) {
    fields = ["rst", "cqZone"]
  } else if (contest.match(/^IARU-HF/)) {
    fields = ["rst", "ituZone"]
  } else {
    fields = ["rst", "exchange"]
  }

  return (parts) => {
    const len = fields.length
    const qso = { our: {}, their: {} }
    qso.our.call = parts[4]
    qso.their.call = parts[4 + len + 1]

    fields.forEach((field, i) => {
      if (isNumeric[field]) {
        qso.our[field] = Number.parseInt(parts[4 + 1 + i])
        qso.their[field] = Number.parseInt(parts[4 + 1 + len + 1 + i])
      } else {
        qso.our[field] = parts[4 + 1 + i]
        qso.their[field] = parts[4 + 1 + len + 1 + i]
      }
    })
    if (fields.length % 2 === 0) {
      qso.our.transmitter = Number.parseInt(parts[parts.length - 1])
    }
    return qso
  }
}