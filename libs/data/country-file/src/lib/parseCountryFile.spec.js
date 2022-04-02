const { parseCountryFile } = require("./parseCountryFile")
const fs = require("fs")
const path = require("path")

const ctyCSV = fs.readFileSync(path.join(__dirname, "../../data/bigcty-20220321.csv"), "utf8", (err, data) => data)

describe("parseCountryFile", () => {
  it("should work", () => {
    const indexes = parseCountryFile(ctyCSV)
    expect(Object.values(indexes.entities).length).toEqual(346)
  })
})
