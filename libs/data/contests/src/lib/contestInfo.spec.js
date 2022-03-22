const { BaseContestInfo, GenericContestInfo } = require("./contestInfo")

describe("Base Contest", () => {
  it("is mostly unimplemented", () => {
    const contestInfo = new BaseContestInfo("TEST-TEST")

    expect(() => {
      contestInfo.id
    }).toThrow("Not implemented")
    expect(() => {
      contestInfo.name
    }).toThrow("Not implemented")
    expect(() => {
      contestInfo.sponsor
    }).toThrow("Not implemented")
    expect(() => {
      contestInfo.longSponsor
    }).toThrow("Not implemented")
    expect(() => {
      contestInfo.homeUrl
    }).toThrow("Not implemented")
    expect(() => {
      contestInfo.mode
    }).toThrow("Not implemented")
  })
})

describe("Generic Contest", () => {
  it("accepts options", () => {
    const contestInfo = new GenericContestInfo("TEST-TEST", {
      name: "Test Contest",
      sponsor: "Ham2K",
      longSponsor: "The Ham2K Club",
      homeUrl: "https://ham2k.net/",
      mode: "FT8",
    })

    expect(contestInfo.id).toEqual("TEST-TEST")
    expect(contestInfo.name).toEqual("Test Contest")
    expect(contestInfo.sponsor).toEqual("Ham2K")
    expect(contestInfo.longSponsor).toEqual("The Ham2K Club")
    expect(contestInfo.homeUrl).toEqual("https://ham2k.net/")
    expect(contestInfo.mode).toEqual("FT8")
  })
})
