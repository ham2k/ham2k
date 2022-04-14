const { setCountryFileData } = require("./lib/annotateFromCountryFile")
const CTYData = require("../data/bigcty.json")

function useBuiltinCountryFile() {
  setCountryFileData(CTYData)
}

module.exports = {
  CTYData,
  useBuiltinCountryFile,
}
