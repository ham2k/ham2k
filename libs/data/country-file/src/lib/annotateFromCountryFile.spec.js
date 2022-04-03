const { annotateFromCountryFile, setCountryFileData } = require("./annotateFromCountryFile")
const CTYData = require("../../data/bigcty.json")

setCountryFileData(CTYData)

describe("annotateFromCountryFile", () => {
  it("should work", () => {
    const info = annotateFromCountryFile({ call: "KI2D", baseCall: "KI2D", prefix: "KI2", isoPrefix: "KI" })
    expect(info.entityPrefix).toEqual("K")
    expect(info.entityName).toEqual("United States")
    expect(info.cqZone).toEqual(5)
    expect(info.ituZone).toEqual(8)
  })

  it("should find the Country File version", () => {
    const info = annotateFromCountryFile({ call: "VERSION" })
    expect(info.entityName).toEqual("Jordan")
  })

  it("should know about exact callsign exceptions", () => {
    // Your regular KP3 callsign should match to Puerto Rico
    let info = annotateFromCountryFile({ call: "KP3Z", baseCall: "KP3Z", prefix: "KP3", isoPrefix: "KP" })
    expect(info.entityPrefix).toEqual("KP4")
    expect(info.cqZone).toEqual(8)

    // But KP3Y lives in the continental US
    info = annotateFromCountryFile({ call: "KP3Y", baseCall: "KP3Y", prefix: "KP3", isoPrefix: "KP" })
    expect(info.entityPrefix).toEqual("K")
    expect(info.cqZone).toEqual(5)
  })

  it("should know about zones for US States", () => {
    let info = annotateFromCountryFile({ call: "N6RANDOM", baseCall: "N6RANDOM", prefix: "N6", isoPrefix: "N" })
    expect(info.entityPrefix).toEqual("K")
    expect(info.cqZone).toEqual(3)

    info = annotateFromCountryFile({ call: "N0RANDOM", baseCall: "N0RANDOM", prefix: "N0", isoPrefix: "N" })
    expect(info.entityPrefix).toEqual("K")
    expect(info.cqZone).toEqual(4)

    info = annotateFromCountryFile({ call: "N2RANDOM", baseCall: "N2RANDOM", prefix: "N2", isoPrefix: "N" })
    expect(info.entityPrefix).toEqual("K")
    expect(info.cqZone).toEqual(5)
  })

  it("should work with regional suffixes (letter past the digit)", () => {
    let info = annotateFromCountryFile({ call: "UQ9X", baseCall: "UQ9X", prefix: "UQ9", isoPrefix: "UQ" })
    expect(info.entityPrefix).toEqual("UN")
    expect(info.ituZone).toEqual(30)

    info = annotateFromCountryFile({ call: "UQ9Q", baseCall: "UQ9Q", prefix: "UQ9", isoPrefix: "UQ" })
    expect(info.entityPrefix).toEqual("UN")
    expect(info.ituZone).toEqual(31)
  })
})
