const { MODES } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const { roundDateToMonth, MONTHS, thirdFullWeekendInMonth, firstFullWeekendInMonth } = require("../utils/dateCalc")

class ARRLDXContestInfo extends BaseContestInfo {
  get sponsor() {
    return "ARRL"
  }
  get longSponsor() {
    return "ARRL"
  }
  get homeUrl() {
    return "https://www.arrl.org/arrl-dx"
  }
  get maximumOperationInMinutes() {
    return 48 * 60
  }
  get minimumBreakInMinutes() {
    return 30
  }
  get bands() {
    return ["160m", "80m", "40m", "20m", "15m", "10m"]
  }
  get multipliers() {
    return ["multipliers"]
  }
  get exchange() {
    return ["sectionOrPower"]
  }

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    info.unique.qso = `${qso.their.call}-${qso.band}`

    if (
      (qso.our.entityPrefix === "K" || qso.our.entityPrefix === "VE") &&
      (qso.their.entityPrefix === "K" || qso.their.entityPrefix === "VE")
    ) {
      info.score.points = undefined
      return info
    }

    info.score.points = 3

    if (qso.their.entityPrefix === "K" || qso.their.entityPrefix === "VE") {
      info.unique.multipliers = `${qso.band}-${qso.their.sent?.sectionOrPower}`
    } else {
      info.unique.multipliers = `${qso.band}-${qso.their.entityPrefix}`
    }
    info.score.multipliers = 1

    return info
  }

  calculateScoreTotal() {
    return this.scoring.score.points * this.scoring.score.multipliers
  }
}

class ARRLDXSSBContestInfo extends ARRLDXContestInfo {
  get id() {
    return "ARRL-DX-SSB"
  }
  get name() {
    return "ARRL DX SSB"
  }
  get longName() {
    return "ARRL DX Contest - SSB"
  }
  get modes() {
    return [MODES.SSB]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.March)
    const period = firstFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}

class ARRLDXCWContestInfo extends ARRLDXContestInfo {
  get id() {
    return "ARRL-DX-CW"
  }
  get name() {
    return "ARRL DX CW"
  }
  get longName() {
    return "ARRL DX Contest - CW"
  }
  get modes() {
    return [MODES.CW]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.February)
    const period = thirdFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}

module.exports = { ARRLDXSSBContestInfo, ARRLDXCWContestInfo }
