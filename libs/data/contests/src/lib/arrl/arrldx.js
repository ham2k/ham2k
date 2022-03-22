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
    return 5
  }
  get bands() {
    return ["160m", "80m", "40m", "20m", "15m", "10m"]
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
  get mode() {
    return MODES.SSB
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
  get mode() {
    return MODES.CW
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.February)
    const period = thirdFullWeekendInMonth(date)
    return [period.map((d) => d.toISO())]
  }
}

module.exports = { ARRLDXSSBContestInfo, ARRLDXCWContestInfo }
