const { findContestInfoForId } = require("./contests")
const { useBuiltinCountryFile } = require("@ham2k/data/country-file/builtinData")

useBuiltinCountryFile()

describe("Scoring Info for QSO", () => {
  describe("CQ Contests", () => {
    it("CQ WPX SSB 2021", () => {
      const contestInfo = findContestInfoForId("CQ-WPX-SSB", { near: "2021-01-01" })
      const qson = {
        qsos: [
          { our: { call: "KI2D" }, their: { call: "K2S" }, mode: "SSB", band: "40m" },
          { our: { call: "KI2D" }, their: { call: "YV5RAB" }, mode: "SSB", band: "20m" },
          { our: { call: "KI2D" }, their: { call: "F5RAG" }, mode: "SSB", band: "10m" },
        ],
      }
      contestInfo.resetScoring()
      contestInfo.prepareOneQSO(qson.qsos[0])
      expect(contestInfo.scoringInfoForQSO(qson.qsos[0])).toEqual({
        score: { points: 1, prefixes: 1 },
        unique: { qso: "K2S-40m-SSB", prefixes: "K2" },
      })
      contestInfo.prepareOneQSO(qson.qsos[1])
      expect(contestInfo.scoringInfoForQSO(qson.qsos[1])).toEqual({
        score: { points: 3, prefixes: 1 },
        unique: { qso: "YV5RAB-20m-SSB", prefixes: "YV5" },
      })
      contestInfo.prepareOneQSO(qson.qsos[2])
      expect(contestInfo.scoringInfoForQSO(qson.qsos[2])).toEqual({
        score: { points: 3, prefixes: 1 },
        unique: { qso: "F5RAG-10m-SSB", prefixes: "F5" },
      })
    })
  })
})

describe("Scoring for Contest", () => {
  describe("CQ Contests", () => {
    it("CQ WPX SSB 2021", () => {
      const contestInfo = findContestInfoForId("CQ-WPX-SSB", { near: "2021-01-01" })
      const qson = {
        qsos: [
          { our: { call: "KI2D" }, their: { call: "K2S" }, mode: "SSB", band: "40m" }, // 1 point, 1 mult
          { our: { call: "KI2D" }, their: { call: "YV5BCS" }, mode: "SSB", band: "20m" }, // 3 points, 1 mult
          { our: { call: "KI2D" }, their: { call: "F5RAG" }, mode: "SSB", band: "10m" }, // 3 points, 1 mult
          { our: { call: "KI2D" }, their: { call: "YV5RAB" }, mode: "SSB", band: "10m" }, // 3 points, 0 mult
          { our: { call: "KI2D" }, their: { call: "YV5BCS" }, mode: "SSB", band: "10m" }, // 3 points, 0 mult
          { our: { call: "KI2D" }, their: { call: "YV5BCS" }, mode: "SSB", band: "20m" }, // dupe
        ],
      }
      const scoring = contestInfo.score(qson)
      expect(scoring.total).toEqual(39)
      expect(scoring.summary).toEqual({
        points: { "10m": 9, "10m-SSB": 9, "20m": 3, "20m-SSB": 3, "40m": 1, "40m-SSB": 1, SSB: 13, all: 13 },
        prefixes: { "10m": 1, "10m-SSB": 1, "20m": 1, "20m-SSB": 1, "40m": 1, "40m-SSB": 1, SSB: 3, all: 3 },
        qsos: { "10m": 3, "10m-SSB": 3, "20m": 1, "20m-SSB": 1, "40m": 1, "40m-SSB": 1, SSB: 5, all: 5 },
        dupes: { "20m": 1, "20m-SSB": 1, SSB: 1, all: 1 },
      })
    })
  })
})
