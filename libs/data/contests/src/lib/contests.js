const { GenericContestInfo } = require("./contestInfo")
const { CQWPXCWContestInfo, CQWPXSSBContestInfo, CQWPXRTTYContestInfo } = require("./cq/cqwpx")
const { CQWWCWContestInfo, CQWWSSBContestInfo, CQWWRTTYContestInfo } = require("./cq/cqww")
const { ARRLDXCWContestInfo, ARRLDXSSBContestInfo } = require("./arrl/arrldx")
const { ARRLSSSSBContestInfo, ARRLSSCWContestInfo } = require("./arrl/arrlss")
const { IARUHFContestInfo } = require("./arrl/iaru")
const { NAQPCWContestInfo, NAQPSSBContestInfo, NAQPRTTYContestInfo } = require("./ncj/naqp")

const CONTEST_MAP = {
  "CQ-WPX-SSB": CQWPXSSBContestInfo,
  "CQ-WPX-CW": CQWPXCWContestInfo,
  "CQ-WPX-RTTY": CQWPXRTTYContestInfo,
  "CQ-WW-SSB": CQWWSSBContestInfo,
  "CQ-WW-CW": CQWWCWContestInfo,
  "CQ-WW-RTTY": CQWWRTTYContestInfo,
  "ARRL-DX-SSB": ARRLDXSSBContestInfo,
  "ARRL-DX-CW": ARRLDXCWContestInfo,
  "ARRL-SS-SSB": ARRLSSSSBContestInfo,
  "ARRL-SS-CW": ARRLSSCWContestInfo,
  "IARU-HF": IARUHFContestInfo,
  "NAQP-SSB": NAQPSSBContestInfo,
  "NAQP-CW": NAQPCWContestInfo,
  "NAQP-RTTY": NAQPRTTYContestInfo,
}

function findContestInfoForId(id, options = {}) {
  let InfoClass = null

  if (CONTEST_MAP[id]) InfoClass = CONTEST_MAP[id]
  else InfoClass = GenericContestInfo

  return InfoClass && new InfoClass(id, options)
}

module.exports = {
  findContestInfoForId,
}
