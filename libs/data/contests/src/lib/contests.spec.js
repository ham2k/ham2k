const { OPERATORS } = require("./consts")
const { findContestInfoForId } = require("./contests")

describe("Contests", () => {
  describe("findContestInfoForId", () => {
    it("should work", () => {
      const contestInfo = findContestInfoForId("CQ-WPX-SSB")

      expect(contestInfo.sponsor).toEqual("CQ")
      expect(contestInfo.name).toEqual("CQ WPX SSB")
    })

    it("should return a generic contest for unknown ids", () => {
      const contestInfo = findContestInfoForId("Spring-Festival")

      expect(contestInfo.name).toEqual("Generic Contest")
    })
  })

  describe("CQ Contests", () => {
    it("CQ WPX SSB 2021", () => {
      const contestInfo = new findContestInfoForId("CQ-WPX-SSB", { near: "2021-01-01" })

      expect(contestInfo.id).toEqual("CQ-WPX-SSB")
      expect(contestInfo.name).toEqual("CQ WPX SSB")
      expect(contestInfo.sponsor).toEqual("CQ")
      expect(contestInfo.longSponsor).toEqual("CQ Magazine")
      expect(contestInfo.homeUrl).toEqual("https://cqwpx.com/")
      expect(contestInfo.mode).toEqual("SSB")
      expect(contestInfo.periods).toEqual([["2021-03-27T00:00:00.000Z", "2021-03-28T23:59:59.999Z"]])
      expect(contestInfo.bands).toEqual(["160m", "80m", "40m", "20m", "15m", "10m"])
      expect(contestInfo.maximumOperationInMinutes).toEqual(48 * 60)
    })

    it("CQ WPX SSB SO", () => {
      const contestInfo = new findContestInfoForId("CQ-WPX-SSB", {
        near: "2021-01-01",
        category: { operators: OPERATORS.One },
      })

      expect(contestInfo.id).toEqual("CQ-WPX-SSB")
      expect(contestInfo.maximumOperationInMinutes).toEqual(36 * 60)
    })

    it("CQ WPX SSB MULTI", () => {
      const contestInfo = new findContestInfoForId("CQ-WPX-SSB", {
        near: "2021-01-01",
        category: { operators: OPERATORS.Multi },
      })

      expect(contestInfo.id).toEqual("CQ-WPX-SSB")
      expect(contestInfo.maximumOperationInMinutes).toEqual(48 * 60)
    })

    it("CQ WPX SSB 2022", () => {
      const contestInfo = new findContestInfoForId("CQ-WPX-SSB", { near: "2021-12-01" })

      expect(contestInfo.name).toEqual("CQ WPX SSB")
      expect(contestInfo.periods).toEqual([["2022-03-26T00:00:00.000Z", "2022-03-27T23:59:59.999Z"]])
    })

    it("CQ WPX CW 2021", () => {
      const contestInfo = new findContestInfoForId("CQ-WPX-CW", { near: "2021-01-01" })

      expect(contestInfo.id).toEqual("CQ-WPX-CW")
      expect(contestInfo.name).toEqual("CQ WPX CW")
      expect(contestInfo.sponsor).toEqual("CQ")
      expect(contestInfo.longSponsor).toEqual("CQ Magazine")
      expect(contestInfo.homeUrl).toEqual("https://cqwpx.com/")
      expect(contestInfo.mode).toEqual("CW")
      expect(contestInfo.periods).toEqual([["2021-05-29T00:00:00.000Z", "2021-05-30T23:59:59.999Z"]])
    })

    it("CQ WPX CW 2022", () => {
      const contestInfo = new findContestInfoForId("CQ-WPX-CW", { near: "2022-02-01" })

      expect(contestInfo.name).toEqual("CQ WPX CW")
      expect(contestInfo.periods).toEqual([["2022-05-28T00:00:00.000Z", "2022-05-29T23:59:59.999Z"]])
    })
  })

  describe("ARRL Contests", () => {
    it("ARRL SS SSB 2021", () => {
      const contestInfo = new findContestInfoForId("ARRL-SS-SSB", { near: "2021-10-01" })

      expect(contestInfo.id).toEqual("ARRL-SS-SSB")
      expect(contestInfo.name).toEqual("ARRL SS SSB")
      expect(contestInfo.sponsor).toEqual("ARRL")
      expect(contestInfo.longSponsor).toEqual("ARRL")
      expect(contestInfo.homeUrl).toEqual("https://www.arrl.org/sweepstakes")
      expect(contestInfo.mode).toEqual("SSB")
      expect(contestInfo.periods).toEqual([["2021-11-20T21:00:00.000Z", "2021-11-22T02:59:59.999Z"]])
      expect(contestInfo.bands).toEqual(["160m", "80m", "40m", "20m", "15m", "10m"])
      expect(contestInfo.maximumOperationInMinutes).toEqual(24 * 60)
    })

    it("ARRL SS SSB 2022", () => {
      const contestInfo = new findContestInfoForId("ARRL-SS-SSB", { near: "2022-10-01" })
      expect(contestInfo.periods).toEqual([["2022-11-19T21:00:00.000Z", "2022-11-21T02:59:59.999Z"]])
    })

    it("ARRL SS CW 2021", () => {
      const contestInfo = new findContestInfoForId("ARRL-SS-CW", { near: "2021-10-01" })

      expect(contestInfo.id).toEqual("ARRL-SS-CW")
      expect(contestInfo.name).toEqual("ARRL SS CW")
      expect(contestInfo.sponsor).toEqual("ARRL")
      expect(contestInfo.mode).toEqual("CW")
      expect(contestInfo.periods).toEqual([["2021-11-06T21:00:00.000Z", "2021-11-08T02:59:59.999Z"]])
      expect(contestInfo.bands).toEqual(["160m", "80m", "40m", "20m", "15m", "10m"])
      expect(contestInfo.maximumOperationInMinutes).toEqual(24 * 60)
    })

    it("ARRL SS CW 2022", () => {
      const contestInfo = new findContestInfoForId("ARRL-SS-CW", { near: "2022-10-01" })
      expect(contestInfo.periods).toEqual([["2022-11-05T21:00:00.000Z", "2022-11-07T02:59:59.999Z"]])
    })
  })
})
