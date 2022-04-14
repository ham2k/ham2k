const fs = require("fs")
const path = require("path")
const { preprocessDXCCData } = require("../src/lib/preprocessing")

console.log("Generating DXCC json")

const dxccCSV = fs.readFileSync(path.join(__dirname, "../data/dxcc-2020-02.csv"), "utf8", (err, data) => data)

const dxcc = preprocessDXCCData(dxccCSV)

fs.writeFileSync(path.join(__dirname, "../data/dxcc.json"), JSON.stringify(dxcc), "utf8")

console.log("Done. Output written to data/dxcc.json")
