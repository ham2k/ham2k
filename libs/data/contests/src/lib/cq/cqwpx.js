const { MODES, OPERATORS } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const { roundDateToMonth, MONTHS, lastFullWeekendInMonth, secondFullWeekendInMonth } = require("../utils/dateCalc")

class CQWPXContestInfo extends BaseContestInfo {
  get sponsor() {
    return "CQ"
  }
  get longSponsor() {
    return "CQ Magazine"
  }
  get homeUrl() {
    return "https://cqwpx.com/"
  }
  get maximumOperationInMinutes() {
    if (this.options.category.operators == OPERATORS.One) {
      return 36 * 60
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
    return ["prefixes"]
  }

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    // V-B. QSO Points: A station may be worked once on each band for QSO point credit:
    info.unique.qso = `${qso.their.call}-${qso.band}}`

    if (qso.their.entityPrefix === qso.our.entityPrefix) {
      // V-B-3. Contacts between stations in the same country are worth 1 point regardless of band.
      info.score.points = 1
    } else if (qso.their.continent != qso.our.continent) {
      // V-B-1. Contacts between stations on different continents are worth three (3) points on 28, 21,
      // and 14 MHz and six (6) points on 7, 3.5, and 1.8 MHz.
      if (qso.band === "160m" || qso.band === "80m" || qso.band === "40m") {
        info.score.points = 6
      } else {
        info.score.points = 3
      }
    } else {
      // V-B-2. Contacts between stations on the same continent, but different countries,
      // are worth one (1) point on 28, 21, and 14 MHz and two (2) points on 7, 3.5, and 1.8 MHz.
      // Exception: For North American stations only—contacts between stations within the North American boundaries
      // (both stations must be located in North America) are worth two (2) points on 28, 21, and 14 MHz
      // and four (4) points on 7, 3.5, and 1.8 MHz.

      if (qso.band === "160m" || qso.band === "80m" || qso.band === "40m") {
        info.score.points = qso.their.continent == "NA" ? 4 : 2
      } else {
        info.score.points = qso.their.continent == "NA" ? 2 : 1
      }
    }

    // V-C. Prefix Multipliers: The prefix multiplier is the number of valid prefixes worked.
    // Each PREFIX is counted only once regardless of the band or number of times the same prefix is worked.
    info.unique.prefixes = qso.their.extendedPrefix || qso.their.prefix
    info.score.prefixes = 1
    console.log(qso, info)
    return info
  }

  calculateScoreTotal() {
    // V-A. Score: The final score is the result of the total QSO points //
    // multiplied by the number of different prefixes worked.
    return this.scoring.score.points * this.scoring.score.prefixes
  }
}

class CQWPXSSBContestInfo extends CQWPXContestInfo {
  get id() {
    return "CQ-WPX-SSB"
  }
  get name() {
    return "CQ WPX SSB"
  }
  get longName() {
    return "CQ WPX Contest - SSB"
  }
  get modes() {
    return [MODES.SSB]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.March)
    const period = lastFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}

class CQWPXCWContestInfo extends CQWPXContestInfo {
  get id() {
    return "CQ-WPX-CW"
  }
  get name() {
    return "CQ WPX CW"
  }
  get longName() {
    return "CQ WPX Contest - CW"
  }
  get modes() {
    return [MODES.CW]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.May)
    const period = lastFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}

class CQWPXRTTYContestInfo extends CQWPXContestInfo {
  get homeUrl() {
    return "https://cqwpxrtty.com/"
  }
  get id() {
    return "CQ-WPX-RTTY"
  }
  get name() {
    return "CQ WPX RTTY"
  }
  get longName() {
    return "CQ WPX Contest - RTTY"
  }
  get modes() {
    return [MODES.RTTY]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.February)
    const period = secondFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}
module.exports = { CQWPXSSBContestInfo, CQWPXCWContestInfo, CQWPXRTTYContestInfo }
