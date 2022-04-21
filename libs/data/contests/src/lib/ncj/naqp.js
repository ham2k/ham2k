const { MODES, OPERATORS } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const {
  roundDateToMonth,
  MONTHS,
  firstFullWeekendInMonth,
  thirdFullWeekendInMonth,
  fourthFullWeekendInMonth,
  lastSaturdayWeekendInMonth,
} = require("../utils/dateCalc")

class NAQPContestInfo extends BaseContestInfo {
  get sponsor() {
    return "NCJ"
  }
  get longSponsor() {
    return "National Contest Journal"
  }
  get homeUrl() {
    return "https://ncjweb.com/naqp/"
  }
  get maximumOperationInMinutes() {
    if (this.options.category.operators == OPERATORS.One) {
      return 10 * 60
    } else {
      return 12 * 60
    }
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

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    info.unique.qso = `${qso.their.call}-${qso.band}`

    info.score.points = 1

    if (qso.their.location.toUpperCase() !== "DX" || qso.their.continent === "NA") {
      info.unique.multipliers = `${qso.their.location}-${qso.band}`
      info.score.multipliers = 1
    }

    return info
  }

  calculateScoreTotal() {
    return this.scoring.score.points * this.scoring.score.multipliers
  }
}

class NAQPSSBContestInfo extends NAQPContestInfo {
  get id() {
    return "NAQP-SSB"
  }
  get name() {
    return "NAQP SSB"
  }
  get longName() {
    return "North American QSO Party - SSB"
  }
  get modes() {
    return [MODES.SSB]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, [MONTHS.January, MONTHS.August])
    let period
    if (date.year === 2022) {
      period = fourthFullWeekendInMonth(date)
    } else {
      period = thirdFullWeekendInMonth(date)
    }
    period[0] = period[0].set({ hour: 18 })
    period[1] = period[1].set({ hour: 5 })

    return [period.map((d) => d.toISO())]
  }
}

class NAQPCWContestInfo extends NAQPContestInfo {
  get id() {
    return "NAQP-CW"
  }
  get name() {
    return "NAQP CW"
  }
  get longName() {
    return "North American QSO Party - CW"
  }
  get modes() {
    return [MODES.CW]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, [MONTHS.January, MONTHS.August])
    let period
    if (date.year === 2022) {
      period = date.month == MONTHS.January ? thirdFullWeekendInMonth(date) : firstFullWeekendInMonth(date)
    } else {
      period = date.month == MONTHS.January ? secondFullWeekendInMonth(date) : firstFullWeekendInMonth(date)
    }
    period[0] = period[0].set({ hour: 18 })
    period[1] = period[1].set({ hour: 5 })

    return [period.map((d) => d.toISO())]
  }
}

class NAQPRTTYContestInfo extends NAQPContestInfo {
  get id() {
    return "NAQP-RTTY"
  }
  get name() {
    return "NAQP RTTY"
  }
  get longName() {
    return "North American QSO Party - RTTY"
  }
  get bands() {
    return ["80m", "40m", "20m", "15m", "10m"] // No 160m for RTTY
  }
  get modes() {
    return [MODES.RTTY]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, [MONTHS.February, MONTHS.July])
    let period
    period = date.month == MONTHS.February ? lastSaturdayWeekendInMonth(date) : firstFullWeekendInMonth(date)
    period[0] = period[0].set({ hour: 18 })
    period[1] = period[1].set({ hour: 5 })

    return [period.map((d) => d.toISO())]
  }
}

module.exports = { NAQPSSBContestInfo, NAQPCWContestInfo, NAQPRTTYContestInfo }
