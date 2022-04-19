const { MODES } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const { roundDateToMonth, MONTHS, thirdFullWeekendInMonth, firstFullWeekendInMonth } = require("../utils/dateCalc")

class ARRLSSContestInfo extends BaseContestInfo {
  get sponsor() {
    return "ARRL"
  }
  get longSponsor() {
    return "ARRL"
  }
  get homeUrl() {
    return "https://www.arrl.org/sweepstakes"
  }
  get maximumOperationInMinutes() {
    return 24 * 60
  }
  get minimumBreakInMinutes() {
    return 30
  }
  get bands() {
    return ["160m", "80m", "40m", "20m", "15m", "10m"]
  }
  get multipliers() {
    return ["sections"]
  }

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    info.unique.qso = `${qso.their.call}`

    if (
      (qso.our.entityPrefix[0] !== "K" && qso.our.entityPrefix !== "VE") ||
      (qso.their.entityPrefix[0] !== "K" && qso.their.entityPrefix !== "VE")
    ) {
      // Only K*/VE contacts are valid
      info.score.points = undefined
      return info
    }

    info.score.points = 2

    info.unique.sections = `${qso.their.sent?.section}`
    info.score.sections = 1

    return info
  }

  calculateScoreTotal() {
    return this.scoring.score.points * this.scoring.score.sections
  }
}

class ARRLSSSSBContestInfo extends ARRLSSContestInfo {
  get id() {
    return "ARRL-SS-SSB"
  }
  get name() {
    return "ARRL SS SSB"
  }
  get longName() {
    return "ARRL November Sweepstakes - SSB"
  }
  get modes() {
    return [MODES.SSB]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.November)
    const period = thirdFullWeekendInMonth(date)
    period[0] = period[0].set({ hour: 21 })
    period[1] = period[1].plus({ hour: 3 })
    return [period.map((d) => d.toISO())]
  }
}

class ARRLSSCWContestInfo extends ARRLSSContestInfo {
  get id() {
    return "ARRL-SS-CW"
  }
  get name() {
    return "ARRL SS CW"
  }
  get longName() {
    return "ARRL November Sweepstakes - CW"
  }
  get modes() {
    return [MODES.CW]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.November)
    const period = firstFullWeekendInMonth(date)
    period[0] = period[0].set({ hour: 21 })
    period[1] = period[1].plus({ hour: 3 })
    return [period.map((d) => d.toISO())]
  }
}

module.exports = { ARRLSSSSBContestInfo, ARRLSSCWContestInfo }
