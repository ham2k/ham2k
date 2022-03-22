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
  get mode() {
    return MODES.SSB
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
  get mode() {
    return MODES.CW
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
  get mode() {
    return MODES.RTTY
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.September)
    const period = lastFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}
module.exports = { CQWWSSBContestInfo, CQWWCWContestInfo, CQWWRTTYContestInfo }
