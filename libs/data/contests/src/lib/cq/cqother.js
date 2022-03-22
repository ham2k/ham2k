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
  get mode() {
    return MODES.SSB
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
}

module.exports = { CQWWVHFContestInfo }
