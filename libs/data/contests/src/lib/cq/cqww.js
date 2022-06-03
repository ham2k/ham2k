const { MODES, OVERLAYS } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const { isOrIncludes } = require("../utils/comparer")
const { roundDateToMonth, MONTHS, lastFullWeekendInMonth } = require("../utils/dateCalc")

class CQWWContestInfo extends BaseContestInfo {
  get sponsor() {
    return "CQ"
  }
  get longSponsor() {
    return "CQ Magazine"
  }
  get homeUrl() {
    return "https://cqww.com/"
  }
  get maximumOperationInMinutes() {
    if (isOrIncludes(this.options.category.overlay, OVERLAYS.Classic)) {
      return 24 * 60
    } else {
      return 48 * 60
    }
  }
  get minimumBreakInMinutes() {
    return 60
  }
  get bands() {
    return ["160m", "80m", "40m", "20m", "15m", "10m"]
  }
  get multipliers() {
    return ["entities", "zones"]
  }
  get exchange() {
    return ["cqZone"]
  }

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    // IV-B. Stations may be contacted once on each band.
    info.unique.qso = `${qso.their.call}-${qso.band}-${qso.mode}`

    if (qso.their.entityPrefix === qso.our.entityPrefix) {
      // IV-B-3. Contacts between stations in the same country have zero (0) QSO point value,
      // but count for zone and country multiplier credit.
      info.score.points = 0
    } else if (qso.their.continent != qso.our.continent) {
      // IV-B-1. Contacts between stations on different continents count three (3) points.
      info.score.points = 3
    } else {
      // IV-B-2. Contacts between stations on the same continent but in different countries count one (1) point.
      // Exception: Contacts between stations in different countries within the North American boundaries
      // count two (2) points.

      info.score.points = qso.their.continent == "NA" ? 2 : 1
    }

    // IV-C. Multiplier: There are two types of multipliers.
    // * Zone: A multiplier of one (1) for each different CQ Zone contacted on each band.
    // * Country: A multiplier of one (1) for each different country contacted on each band.
    // The DXCC entity list, Worked All Europe (WAE) multiplier list plus IG9/IH9, and continental boundaries
    // are the standards for defining country multipliers. Maritime mobile stations count only for a zone multiplier.
    info.unique.entities = `${qso.their.entityPrefix}`
    info.score.entities = 1

    info.unique.zones = `${qso.their.sent?.cqZone || qso.their.cqZone}`
    info.score.zones = 1

    return info
  }

  calculateScoreTotal() {
    // IV-A. Score: The final score is the result of the total QSO points //
    // multiplied by the sum of zone and country multipliers
    return this.scoring.score.points * (this.scoring.score.entities + this.scoring.score.zones)
  }
}

class CQWWSSBContestInfo extends CQWWContestInfo {
  get id() {
    return "CQ-WW-SSB"
  }
  get name() {
    return "CQ WW SSB"
  }
  get longName() {
    return "CQ World Wide DX Contest - SSB"
  }
  get modes() {
    return [MODES.SSB]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.October)
    const period = lastFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}

class CQWWCWContestInfo extends CQWWContestInfo {
  get id() {
    return "CQ-WW-CW"
  }
  get name() {
    return "CQ WW CW"
  }
  get longName() {
    return "CQ World Wide DX Contest - CW"
  }
  get modes() {
    return [MODES.CW]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.November)
    const period = lastFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}

class CQWWRTTYContestInfo extends CQWWContestInfo {
  get homeUrl() {
    return "https://cqwwrtty.com/"
  }
  get id() {
    return "CQ-WW-RTTY"
  }
  get name() {
    return "CQ WW RTTY"
  }
  get longName() {
    return "CQ World Wide DX Contest - RTTY"
  }
  get modes() {
    return [MODES.RTTY]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.September)
    const period = lastFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}
module.exports = { CQWWSSBContestInfo, CQWWCWContestInfo, CQWWRTTYContestInfo }
