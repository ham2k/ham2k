const { MODES } = require("./consts")
const { CONTEST_BANDS } = require("@ham2k/data/operation")

class BaseContestInfo {
  constructor(id, options) {
    this.options = options || {}
    this.options.category = this.options.category || {}
    this.options.near = this.options.near || new Date().toISOString()

    this.options.id = id
  }

  get sponsor() {
    throw "Not implemented"
  }
  get longSponsor() {
    throw "Not implemented"
  }
  get homeUrl() {
    throw "Not implemented"
  }
  get id() {
    throw "Not implemented"
  }
  get name() {
    throw "Not implemented"
  }
  get longName() {
    throw "Not implemented"
  }
  get mode() {
    throw "Not implemented"
  }
  get start() {
    throw "Not implemented"
  }
  get end() {
    throw "Not implemented"
  }
  get periods() {
    throw "Not implemented"
  }
  get maximumOperationInMinutes() {
    throw "Not implemented"
  }
  get minimumBreakInMinutes() {
    throw "Not implemented"
  }
  get bands() {
    throw "Not implemented"
  }
}

class GenericContestInfo extends BaseContestInfo {
  get sponsor() {
    return this.options.sponsor || ""
  }
  get longSponsor() {
    return this.options.longSponsor || this.sponsor
  }
  get homeUrl() {
    return this.options.homeUrl
  }
  get name() {
    return this.options.name || "Generic Contest"
  }
  get longName() {
    return this.options.longName || this.name
  }
  get id() {
    return this.options.id || "CONTEST"
  }
  get mode() {
    return this.options.mode || MODES.Mixed
  }
  get periods() {
    return this.options.periods || []
  }
  get maximumOperationInMinutes() {
    return this.options.maximumOperationInMinutes || 48 * 60
  }
  get minimumBreakInMinutes() {
    return this.options.minimumBreakInMinutes || 0
  }
  get bands() {
    return CONTEST_BANDS
  }
}

module.exports = {
  BaseContestInfo,
  GenericContestInfo,
}
