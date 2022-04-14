const { preprocessDXCCData } = require("./preprocessing")
const fs = require("fs")
const path = require("path")

const dxccCSV = fs.readFileSync(path.join(__dirname, "../../data/dxcc-2020-02.csv"), "utf8", (err, data) => data)

describe("preprocessDXCCData", () => {
  it("should work", () => {
    const dxcc = preprocessDXCCData(dxccCSV)
    expect(Object.values(dxcc).length).toEqual(402)

    expect(dxcc[1].dxccName).toEqual("Canada")
    expect(dxcc[1].fullName).toEqual("Canada")
    expect(dxcc[1].name).toEqual("Canada")
    expect(dxcc[1].shortName).toEqual("Canada")
    expect(dxcc[1].clublogName).toEqual("CANADA")

    expect(dxcc[291].dxccName).toEqual("United States of America")
    expect(dxcc[291].fullName).toEqual("United States of America")
    expect(dxcc[291].name).toEqual("United States")
    expect(dxcc[291].shortName).toEqual("United States")
    expect(dxcc[291].clublogName).toEqual("UNITED STATES OF AMERICA")

    // Automatic replacement of some abbreviations
    expect(dxcc[460].dxccName).toEqual("Rotuma Island")
    expect(dxcc[460].fullName).toEqual("Rotuma Island")
    expect(dxcc[460].name).toEqual("Rotuma Island")
    expect(dxcc[460].shortName).toEqual("Rotuma Island")
    expect(dxcc[460].clublogName).toEqual("ROTUMA ISLAND")

    // Overrides from extra-info.json
    expect(dxcc[502].dxccName).toEqual("North Macedonia (Republic of)")
    expect(dxcc[502].fullName).toEqual("Republic of North Macedonia")
    expect(dxcc[502].name).toEqual("North Macedonia")
    expect(dxcc[502].shortName).toEqual("N. Macedonia")
    expect(dxcc[502].clublogName).toEqual("NORTH MACEDONIA")

    // Both expansion of abbreviations and overrides
    expect(dxcc[117].dxccName).toEqual("ITU HQ")
    expect(dxcc[117].fullName).toEqual("International Telecommunications Union Headquarters")
    expect(dxcc[117].name).toEqual("ITU Headquarters")
    expect(dxcc[117].shortName).toEqual("ITU HQ")
    expect(dxcc[117].clublogName).toEqual("ITU HQ")

    // Some entities have different names on LoTW and ClubLog
    expect(dxcc[246].dxccName).toEqual("Sovereign Military Order of Malta")
    expect(dxcc[246].fullName).toEqual("Sovereign Military Order of Malta")
    expect(dxcc[246].name).toEqual("Sovereign Military Order of Malta")
    expect(dxcc[246].shortName).toEqual("SMO of Malta")
    expect(dxcc[246].lotwName).toEqual("SOVEREIGN MILITARY ORDER OF MALTA")
    expect(dxcc[246].clublogName).toEqual("SOV MILITARY ORDER OF MALTA")

    // Some entities have different names on QRZ
    expect(dxcc[414].dxccName).toEqual("Democratic Republic of the Congo")
    expect(dxcc[414].fullName).toEqual("Democratic Republic of the Congo")
    expect(dxcc[414].name).toEqual("DR of Congo-Kinshasa")
    expect(dxcc[414].shortName).toEqual("DR Congo-Kinshasa")
    expect(dxcc[414].qrzName).toEqual("Congo, Dem. Republic of")
  })
})
