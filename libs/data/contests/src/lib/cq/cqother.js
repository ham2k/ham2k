const { MODES } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const { roundDateToMonth, MONTHS, lastFullWeekendInMonth } = require("../utils/dateCalc")

class CQWWVHFContestInfo extends BaseContestInfo {
  get sponsor() {
    return "CQ"
  }
  get longSponsor() {
    return "CQ Magazine"
  }
  get homeUrl() {
    return "https://cqww-vhf.com/"
  }
  get id() {
    return "CQ-VHF"
  }
  get name() {
    return "CQ World Wide VHF Contest"
  }
  get modes() {
    return [MODES.SSB]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.October)
    const period = lastFullWeekendInMonth(date)
    period[0] = period[0].set({ hour: 18 })
    period[1] = period[1].set({ hour: 21 })
    return [period.map((d) => d.toISO())]
  }
  get maximumOperationInMinutes() {
    return 27 * 60
  }
  get minimumBreakInMinutes() {
    return 0
  }
  get bands() {
    return ["6m", "2m"]
  }
  get multipliers() {
    return ["grids"]
  }
  get exchange() {
    return ["grid"]
  }

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    info.unique.qso = `${qso.their.call}-${qso.band}-${qso.their.sent?.grid}-${qso.our.sent?.grid}`

    if (qso.band === "6m") {
      info.score.points = 1
    } else if (qso.band === "2m") {
      info.score.points = 2
    }

    info.unique.grids = `${qso.band}-${qso.their.sent?.grid}-${qso.our.sent?.grid}`
    info.score.grids = 1

    return info
  }

  calculateScoreTotal() {
    return this.scoring.score.points * this.scoring.score.grids
  }
}

module.exports = { CQWWVHFContestInfo }
