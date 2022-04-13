const { parseCountryFile } = require("./lib/parseCountryFile")
const { setCountryFileData, annotateFromCountryFile } = require("./lib/annotateFromCountryFile")

module.exports = {
  annotateFromCountryFile,
  parseCountryFile,
  setCountryFileData,
}
