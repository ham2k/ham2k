const { parse } = require("csv/dist/cjs/sync.cjs")
// const { parse } = require("csv/sync")
const CTYData = require("../../../country-file/data/bigcty.json")
const QRZNames = require("../../data/qrz-names.json")
const ExtraInfo = require("../../data/extra-info.json")

const CTYbyCode = {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Object.entries(CTYData).forEach(([prefix, cty]) => {
  CTYbyCode[cty.dxccCode] = cty
})

Object.values(CTYData)
function preprocessDXCCData(dxccCSV) {
  const dxcc = {}

  const records = parse(dxccCSV, { columns: true, skip_empty_lines: true })
  console.log(`${records.length} records`)
  records.forEach((record) => {
    // console.log(record)
    const code = Number.parseInt(record.entityCode)
    if (dxcc[code]) {
      console.log("Duplicate entity code", code)
      console.log(dxcc[code])
      console.log(record)
    }
    dxcc[code] = {
      dxccName: record.name,
      dxccCode: code,
      continents: record.continent.split(","),
      ituZones: record.itu.split(",").map((zone) => Number.parseInt(zone)),
      cqZones: record.cq.split(",").map((zone) => Number.parseInt(zone)),
      deleted: record.deleted,
      traffic: record.thirdPartyTraffic,
      start: record.validStart,
      end: record.validEnd,
      flag: record.flag,
      countryCode: record.countryCode == "ZZ" ? "" : record.countryCode.toLowerCase(),
      notes: record.notes,
      regex: record.regex,
      prefixes: record.prefix.split(","),
    }

    dxcc[code].name = dxcc[code].dxccName

    dxcc[code].fullName = dxcc[code].dxccName
      .replace(" I.", " Island")
      .replace(" Is.", " Islands")
      .replace(" HQ", " Headquarters")
      .replace("St. ", "Saint ")
      .replace("E. ", "East ")
      .replace("W. ", "West ")
      .replace("C. ", "Central ")
      .replace("Rep. ", "Republic ")

    dxcc[code].shortName = dxcc[code].name
    dxcc[code].lotwName = dxcc[code].fullName.toUpperCase()
    dxcc[code].clublogName = dxcc[code].lotwName

    if (QRZNames[code] !== record.name) dxcc[code].qrzName = QRZNames[code]

    if (CTYbyCode[code]) dxcc[code] = { ...dxcc[code], ...CTYbyCode[code] }

    if (ExtraInfo[code]) dxcc[code] = { ...dxcc[code], ...ExtraInfo[code] }
  })

  return dxcc
}

module.exports = {
  preprocessDXCCData,
}
