const { MODES } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const { roundDateToMonth, MONTHS, secondFullWeekendInMonth } = require("../utils/dateCalc")

class IARUHFContestInfo extends BaseContestInfo {
  get sponsor() {
    return "ARRL"
  }
  get longSponsor() {
    return "ARRL"
  }
  get homeUrl() {
    return "http://www.arrl.org/iaru-hf-world-championship"
  }
  get maximumOperationInMinutes() {
    return 24 * 60
  }
  get minimumBreakInMinutes() {
    return 0
  }
  get id() {
    return "IARU-HF"
  }
  get name() {
    return "IARU HF"
  }
  get longName() {
    return "IARU HF Championship"
  }
  get modes() {
    return [MODES.SSB, MODES.CW, MODES.Mixed]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.July)
    const period = secondFullWeekendInMonth(date)
    period[0] = period[0].set({ hour: 12 })
    period[1] = period[1].set({ hour: 11 })
    return [period.map((d) => d.toISO())]
  }
  get bands() {
    return ["160m", "80m", "40m", "20m", "15m", "10m"]
  }
  get multipliers() {
    return ["zones", "hqs"]
  }

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    info.unique.qso = `${qso.their.call}-${qso.band}-${qso.mode}`

    let theirItuZone = Number.parseInt(qso.their.zoneOrHQ)

    if (!theirItuZone || theirItuZone === qso.our.ituZone) {
      info.score.points = 1
    } else {
      if (qso.their.continent != qso.our.continent) {
        info.score.points = 5
      } else {
        info.score.points = 3
      }
    }

    if (theirItuZone) {
      info.unique.zones = `${qso.band}-${theirItuZone}`
      info.score.zones = 1
    } else {
      info.unique.hqs = `${qso.band}-${qso.their.zoneOrHQ}`
      info.score.hqs = 1
    }

    return info
  }

  calculateScoreTotal() {
    return this.scoring.score.points * (this.scoring.score.zones + this.scoring.score.hqs)
  }
}

module.exports = { IARUHFContestInfo }
