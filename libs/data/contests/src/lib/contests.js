const { CQWPXCWContestInfo, CQWPXSSBContestInfo, CQWPXRTTYContestInfo } = require("./cq/cqwpx")
const { CQWWCWContestInfo, CQWWSSBContestInfo, CQWWRTTYContestInfo } = require("./cq/cqww")
const { GenericContestInfo } = require("./contestInfo")
const { ARRLDXCWContestInfo, ARRLDXSSBContestInfo } = require("./arrl/arrldx")
const { ARRLSSSSBContestInfo, ARRLSSCWContestInfo } = require("./arrl/arrlss")
const { IARUHFContestInfo } = require("./arrl/iaru")

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
