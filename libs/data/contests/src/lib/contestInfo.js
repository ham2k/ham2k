const { default: autoBind } = require("auto-bind")
const { MODES } = require("./consts")
const { CONTEST_BANDS } = require("@ham2k/data/operation")
const { parseCallsign } = require("@ham2k/data/callsigns")
const { annotateFromCountryFile } = require("@ham2k/data/country-file")

class BaseContestInfo {
  constructor(id, options) {
    this.options = options || {}
    this.options.category = this.options.category || {}
    this.options.near = this.options.near || new Date().toISOString()

    this.options.id = id
    autoBind(this)
  }

  get sponsor() {
    throw "Not implemented"
  }
  get longSponsor() {
    throw "Not implemented"
  }
  get homeUrl() {
    throw "Not implemented"
  }
  get id() {
    throw "Not implemented"
  }
  get name() {
    throw "Not implemented"
  }
  get longName() {
    throw "Not implemented"
  }
  get modes() {
    throw "Not implemented"
  }
  get start() {
    throw "Not implemented"
  }
  get end() {
    throw "Not implemented"
  }
  get periods() {
    throw "Not implemented"
  }
  get maximumOperationInMinutes() {
    throw "Not implemented"
  }
  get minimumBreakInMinutes() {
    throw "Not implemented"
  }
  get bands() {
    throw "Not implemented"
  }

  // Contest Scoring
  get scoringResults() {
    return this.scoring
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  score(qson, options = {}) {
    this.resetScoring()
    qson.qsos.forEach((qso) => {
      this.processOneQSO(qso)
    })
    return this.scoring
  }

  resetScoring() {
    this.scoring = { score: {}, uniqueIndex: {}, summary: {} }
    this.scoringScratchpad = {}
  }

  prepareOneQSO(qso) {
    if (!qso.their?.prefix) {
      parseCallsign(qso.their.call, qso.their)
      annotateFromCountryFile(qso.their)
    }

    if (!this.scoringScratchpad?.our?.prefix) {
      this.scoringScratchpad.our = { ...qso.our }
      parseCallsign(this.scoringScratchpad.our.call, this.scoringScratchpad.our)
      annotateFromCountryFile(this.scoringScratchpad.our)
    }
  }

  scoringInfoForQSO(qso) {
    throw "Not implemented"
  }
  calculateScoreTotal() {
    throw "Not implemented"
  }

  processOneQSO(qso) {
    this.prepareOneQSO(qso)
    const scoringInfo = this.scoringInfoForQSO(qso)
    const { score, unique } = scoringInfo
    if (unique.qso) {
      if (score.points === undefined) {
        console.log("Invalid QSO", qso, scoringInfo)
        this.addToSummary(qso, "invalid", 1)
      } else if (this.scoring.uniqueIndex[unique.qso]) {
        this.addToSummary(qso, "dupes", 1)
      } else {
        this.scoring.uniqueIndex[unique.qso] = true
        this.addToSummary(qso, "qsos", 1)

        const keys = Object.keys(score)
        keys.forEach((key) => {
          if (unique[key]) {
            if (!this.scoring.uniqueIndex[unique[key]]) {
              this.scoring.uniqueIndex[unique[key]] = true
              this.scoring.score[key] = (this.scoring.score[key] || 0) + score[key]
              this.addToSummary(qso, key, score[key])
            }
          } else {
            this.scoring.score[key] = (this.scoring.score[key] || 0) + score[key]
            this.addToSummary(qso, key, score[key])
          }
        })
      }
    }

    const prevTotal = this.scoring.total
    this.scoring.total = this.calculateScoreTotal()
    this.addToSummary(qso, "total", this.scoring.total - prevTotal)

    return this.scoring
  }

  addToSummary(qso, key, add) {
    this.scoring.summary[key] = this.scoring.summary[key] || {}
    this.scoring.summary[key].all = (this.scoring.summary[key].all || 0) + add
    this.scoring.summary[key][`${qso.band}`] = (this.scoring.summary[key][`${qso.band}`] || 0) + add
    this.scoring.summary[key][`${qso.mode}`] = (this.scoring.summary[key][`${qso.mode}`] || 0) + add
    this.scoring.summary[key][`${qso.band}-${qso.mode}`] =
      (this.scoring.summary[key][`${qso.band}-${qso.mode}`] || 0) + add
  }
}

class GenericContestInfo extends BaseContestInfo {
  get sponsor() {
    return this.options.sponsor || ""
  }
  get longSponsor() {
    return this.options.longSponsor || this.sponsor
  }
  get homeUrl() {
    return this.options.homeUrl
  }
  get name() {
    return this.options.name || `${this.id} (Unknown Contest)`
  }
  get longName() {
    return this.options.longName || this.name
  }
  get id() {
    return this.options.id || "CONTEST"
  }
  get bands() {
    return this.options.bands || CONTEST_BANDS
  }
  get modes() {
    return this.options.modes || [MODES.Mixed]
  }
  get periods() {
    return this.options.periods || []
  }
  get maximumOperationInMinutes() {
    return this.options.maximumOperationInMinutes || 48 * 60
  }
  get minimumBreakInMinutes() {
    return this.options.minimumBreakInMinutes || 0
  }

  scoringInfoForQSO(qso) {
    // Default contest behavior: one point per QSO, no mults, once per call per band.

    return { qsos: 1, points: 1, unique: { qsos: `call-${qso.their.call}-${qso.band}-${qso.mode}` } }
  }

  calculateScoreTotal() {
    return this.scoring.score.points
  }
}

module.exports = {
  BaseContestInfo,
  GenericContestInfo,
}
