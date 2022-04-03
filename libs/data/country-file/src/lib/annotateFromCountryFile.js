const CountryFileData = {}

function setCountryFileData(indexes) {
  CountryFileData.entities = indexes.entities
  CountryFileData.prefix = indexes.prefix
  CountryFileData.exact = indexes.exact
}

function annotateFromCountryFile(info) {
  const { call, baseCall, prefix, preindicator } = info
  let match

  match = CountryFileData.exact[call]
  match = match || (baseCall && CountryFileData.exact[baseCall])

  if (!match) {
    // If call had an prefix indicator, then use that for lookup,
    // otherwise use the operator part of the callsign, which has been stripped out of any other indicators
    let effectiveCall = (preindicator ? prefix : baseCall) || call
    let i = effectiveCall.length
    while (!match && i > 0) {
      match = CountryFileData.prefix[effectiveCall.slice(0, i)]
      i--
    }
  }

  if (match?.p) {
    const entity = CountryFileData.entities[match.p]
    info.entityPrefix = entity.entityPrefix
    info.entityName = entity.name
    info.dxccId = entity.dxccId
    info.continent = entity.continent
    info.cqZone = match.c
    info.ituZone = match.i
    info.lat = entity.lat
    info.lon = entity.lon
    info.gmtOffset = entity.gmtOffset
  }

  return info
}

module.exports = {
  setCountryFileData,
  annotateFromCountryFile,
}
