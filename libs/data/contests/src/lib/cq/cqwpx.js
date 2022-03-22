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
  get mode() {
    return MODES.SSB
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
  get mode() {
    return MODES.CW
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
  get mode() {
    return MODES.RTTY
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.February)
    const period = secondFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}
module.exports = { CQWPXSSBContestInfo, CQWPXCWContestInfo, CQWPXRTTYContestInfo }
