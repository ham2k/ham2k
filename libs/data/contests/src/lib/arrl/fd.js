const { MODES } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const { roundDateToMonth, MONTHS, fourthFullWeekendInMonth } = require("../utils/dateCalc")

class ARRLFieldDayContestInfo extends BaseContestInfo {
  get sponsor() {
    return "ARRL"
  }
  get longSponsor() {
    return "ARRL"
  }
  get homeUrl() {
    return "http://www.arrl.org/field-day"
  }
  get maximumOperationInMinutes() {
    return 24 * 60
  }
  get minimumBreakInMinutes() {
    return 0
  }
  get id() {
    return "ARRL-FIELD-DAY"
  }
  get name() {
    return "ARRL Field Day"
  }
  get longName() {
    return "ARRL Field Day"
  }
  get modes() {
    return [MODES.SSB, MODES.CW, MODES.Digital, MODES.Mixed]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.June)
    const period = fourthFullWeekendInMonth(date)
    period[0] = period[0].set({ hour: 18 })
    period[1] = period[1].set({ hour: 17 })
    return [period.map((d) => d.toISO())]
  }
  get bands() {
    return ["160m", "80m", "40m", "20m", "15m", "10m", "6m", "2m", "70cm"]
  }
  get multipliers() {
    return []
  }
  get exchange() {
    return ["class", "section"]
  }

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    info.unique.qso = `${qso.their.call}-${qso.band}-${qso.mode}`

    if (qso.mode === MODES.CW || qso.mode === MODES.Digital) {
      info.score.points = 2
    } else {
      info.score.points = 1
    }

    return info
  }

  calculateScoreTotal() {
    return this.scoring.score.points * 2
  }
}

module.exports = { ARRLFieldDayContestInfo }
