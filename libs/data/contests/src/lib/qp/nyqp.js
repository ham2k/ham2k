const { MODES } = require("../consts")
const { BaseContestInfo } = require("../contestInfo")
const { CANADIAN_GROUPED_PROVINCES, US_STATES } = require("../mults")
const { roundDateToMonth, MONTHS, thirdFullWeekendInMonth } = require("../utils/dateCalc")

const COUNTY_DATA = {
  ALB: { name: "Albany" },
  FRA: { name: "Franklin" },
  ONE: { name: "Oneida" },
  SCU: { name: "Schuyler" },
  ALL: { name: "Allegany" },
  FUL: { name: "Fulton" },
  ONO: { name: "Onondaga" },
  SEN: { name: "Seneca" },
  BRX: { name: "Bronx" },
  GEN: { name: "Genesee" },
  ONT: { name: "Ontario" },
  STL: { name: "St. Lawrence" },
  BRM: { name: "Broome" },
  GRE: { name: "Greene" },
  ORA: { name: "Orange" },
  STE: { name: "Steuben" },
  CAT: { name: "Cattaraugus" },
  HAM: { name: "Hamilton" },
  ORL: { name: "Orleans" },
  SUF: { name: "Suffolk" },
  CAY: { name: "Cayuga" },
  HER: { name: "Herkimer" },
  OSW: { name: "Oswego" },
  SUL: { name: "Sullivan" },
  CHA: { name: "Chautauqua" },
  JEF: { name: "Jefferson" },
  OTS: { name: "Otsego" },
  TIO: { name: "Tioga" },
  CHE: { name: "Chemung" },
  KIN: { name: "Kings" },
  PUT: { name: "Putnam" },
  TOM: { name: "Tompkins" },
  CGO: { name: "Chenango" },
  LEW: { name: "Lewis" },
  QUE: { name: "Queens" },
  ULS: { name: "Ulster" },
  CLI: { name: "Clinton" },
  LIV: { name: "Livingston" },
  REN: { name: "Rensselaer" },
  WAR: { name: "Warren" },
  COL: { name: "Columbia" },
  MAD: { name: "Madison" },
  ROC: { name: "Rockland" },
  WAS: { name: "Washington" },
  COR: { name: "Cortland" },
  MON: { name: "Monroe" },
  RIC: { name: "Richmond" },
  WAY: { name: "Wayne" },
  DEL: { name: "Delaware" },
  MTG: { name: "Montgomery" },
  SAR: { name: "Saratoga" },
  WES: { name: "Westchester" },
  DUT: { name: "Dutchess" },
  NAS: { name: "Nassau" },
  SCH: { name: "Schenectady" },
  WYO: { name: "Wyoming" },
  ERI: { name: "Erie" },
  NEW: { name: "New York" },
  SCO: { name: "Schoharie" },
  YAT: { name: "Yates" },
  ESS: { name: "Essex" },
  NIA: { name: "Niagara" },
}

class NYQPContestInfo extends BaseContestInfo {
  get id() {
    return "NY-QSO-PARTY"
  }
  get name() {
    return "NY QSO Party"
  }
  get longName() {
    return "New York QSO Party"
  }
  get sponsor() {
    return "RDXA"
  }
  get longSponsor() {
    return "Rochester DX Association"
  }
  get homeUrl() {
    return "http://nyqp.org/"
  }
  get modes() {
    return [MODES.CW, MODES.SSB, MODES.Digital, MODES.Mixed]
  }
  get periods() {
    const date = roundDateToMonth(this.options.near, MONTHS.October)
    const period = thirdFullWeekendInMonth(date)
    period[0] = period[0].set({ hour: 14 })
    period[1] = period[1].set({ hour: 3 })

    return [period.map((d) => d.toISO())]
  }
  get maximumOperationInMinutes() {
    return 12 * 60
  }
  get minimumBreakInMinutes() {
    return 0
  }
  get bands() {
    return ["160m", "80m", "40m", "20m", "15m", "10m"]
  }

  get multipliers() {
    return ["multipliers"]
  }

  scoringInfoForQSO(qso) {
    const info = { unique: {}, score: {} }

    const ourCounty = COUNTY_DATA[qso.our.sent.location] && qso.our.sent.location
    const theirCounty = COUNTY_DATA[qso.their.sent.location] && qso.their.sent.location

    info.unique.qso = `${qso.their.call}-${qso.band}-${qso.mode}-${ourCounty || "_"}-${theirCounty || "_"}`

    if (ourCounty || theirCounty) {
      // if (qso.mode !== "SSB") debugger
      // Either us or them have to be in the state
      if (qso.mode === MODES.RTTY || qso.mode === MODES.Digital) info.score.points = 3
      else if (qso.mode === MODES.CW) info.score.points = 2
      else info.score.points = 1
    } else {
      info.score.points = undefined
    }

    if (
      theirCounty ||
      (ourCounty && US_STATES.includes(qso.their.sent.location)) ||
      (ourCounty && CANADIAN_GROUPED_PROVINCES.includes(qso.their.sent.location))
    ) {
      info.unique.multipliers = `${qso.their.sent.location}`
      info.score.multipliers = 1
    } else {
      console.log("No Mult", qso)
    }

    return info
  }

  calculateScoreTotal() {
    return this.scoring.score.points * this.scoring.score.multipliers
  }
}

module.exports = { COUNTY_DATA, NYQPContestInfo }
