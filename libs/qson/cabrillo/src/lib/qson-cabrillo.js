const camelCase = require("camelcase")
const { bandForFrequency } = require("@ham2k/data/operation")

function cabrilloToQSON(str) {
  return parseCabrillo(str)
}

const REGEXP_FOR_END_OF_LINE = /\r?\n/
const REGEXP_FOR_LINE_TAG = /^([A-Z-]+):\s*(.*)\s*$/
const REGEXP_FOR_LINE_PARTS = /\s+/

const CABRILLO_MODES_TO_QSON_MODES = {
  RY: "RTTY",
  CW: "CW",
  PH: "SSB",
  FM: "FM",
  DG: "DIGI",
}

function parseCabrillo(str) {
  const cache = {}
  const headers = {}
  const qsos = []
  const qsosOther = []

  const lines = str.split(REGEXP_FOR_END_OF_LINE)
  lines.forEach((line) => {
    line = line.toUpperCase()
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

  qsos.sort((a, b) => a.startMillis - b.startMillis)

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
  qso.band = bandForFrequency(qso.freq)
  qso.mode = CABRILLO_MODES_TO_QSON_MODES[parts[1]] || parts[1]
  qso.start = `${parts[2]}T${parts[3].substring(0, 2)}:${parts[3].substring(2, 4)}:00Z`
  qso.startMillis = Date.parse(qso.start).valueOf()
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

const REGEXP_FOR_OPERATOR_LIST = /(,\s*|\s+)/

function normalizeContestInfo(headers) {
  const info = { category: {} }
  info.contest = headers.contest
  if (headers.callsign) info.call = headers.callsign
  if (headers.club) info.club = headers.club
  if (headers.operators) info.operators = headers.operators.split(REGEXP_FOR_OPERATOR_LIST)
  if (headers.location) info.location = headers.location
  if (headers.gridLocator) info.grid = headers.gridLocator
  if (headers.claimedScore) info.claimedScore = headers.claimedScore

  if (headers.categoryAssisted) info.categoryAssisted = headers.categoryAssisted
  if (headers.categoryBand) info.categoryBand = headers.categoryBand
  if (headers.categoryMode) info.categoryMode = headers.categoryMode
  if (headers.categoryOperator) info.categoryOperator = headers.categoryOperator
  if (headers.categoryMode) info.categoryMode = headers.categoryMode
  if (headers.categoryOverlay) info.categoryOverlay = headers.categoryOverlay
  if (headers.categoryStation) info.categoryStation = headers.categoryStation
  if (headers.categoryTransmitter) info.categoryTransmitter = headers.categoryTransmitter

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
    fields = ["name", "location"]
  } else if (contest.match(/QSO-PARTY/)) {
    fields = ["rst", "location"]
  } else if (contest.match(/^CQ-VHF-/)) {
    fields = ["rst", "grid"]
  } else if (contest.match(/^ARRL-DX-/)) {
    fields = ["rst", "sectionOrPower"]
  } else if (contest.match(/^ARRL-160-/)) {
    fields = ["rst", "section"]
  } else if (contest.match(/^ARRL-VHF-/)) {
    fields = ["grid"]
  } else if (contest.match(/^ARRL-SS-/)) {
    fields = ["serial", "prec", "check", "section"]
  } else if (contest.match(/^CQ-WW-/)) {
    fields = ["rst", "cqZone"]
  } else if (contest.match(/^IARU-HF/)) {
    fields = ["rst", "zoneOrHQ"]
  } else {
    fields = ["rst", "exchange"]
  }

  return (parts) => {
    const len = fields.length
    const qso = { our: {}, their: {} }
    qso.our.call = parts[4]
    qso.their.call = parts[4 + len + 1]
    qso.our.sent = {}
    qso.their.sent = {}
    fields.forEach((field, i) => {
      if (isNumeric[field]) {
        qso.our[field] = Number.parseInt(parts[4 + 1 + i])
        qso.their[field] = Number.parseInt(parts[4 + 1 + len + 1 + i])
        qso.our.sent[field] = Number.parseInt(parts[4 + 1 + i])
        qso.their.sent[field] = Number.parseInt(parts[4 + 1 + len + 1 + i])
      } else {
        qso.our[field] = parts[4 + 1 + i]
        qso.their[field] = parts[4 + 1 + len + 1 + i]
        qso.our.sent[field] = parts[4 + 1 + i]
        qso.their.sent[field] = parts[4 + 1 + len + 1 + i]
      }
    })
    if (fields.length % 2 === 0) {
      qso.our.transmitter = Number.parseInt(parts[parts.length - 1])
    }
    return qso
  }
}

module.exports = {
  cabrilloToQSON,
}
