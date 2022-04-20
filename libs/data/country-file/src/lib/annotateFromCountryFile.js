let CTYIndexes = {}

function setCountryFileData(indexes) {
  CTYIndexes = indexes
}

function annotateFromCountryFile(info, options = {}) {
  const { call, baseCall, prefix } = info
  let match

  match = CTYIndexes.exact[call]
  if (options.wae) {
    match = match || CTYIndexes.exactWAE[call]
  }
  match = match || (baseCall && CTYIndexes.exact[baseCall])
  if (options.wae) {
    match = match || CTYIndexes.exactWAE[baseCall]
  }

  if (!match) {
    // If call had an prefix or postfix modifier that replaces the call prefix, then use that for lookup,
    // otherwise use the base part of the callsign, which has been stripped out of any other indicators
    let effectiveCall = baseCall || call
    if (prefix && effectiveCall && !effectiveCall.startsWith(prefix)) effectiveCall = prefix

    let i = effectiveCall.length
    while (!match && i > 0) {
      if (options.wae) {
        match = CTYIndexes.prefixWAE[effectiveCall.slice(0, i)]
      }
      match = match || CTYIndexes.prefix[effectiveCall.slice(0, i)]
      i--
    }
  }

  // Special case: Guantanamo uses the KG4 prefix, but only for callsigns with 2 suffix letters
  if (match?.p === "KG4" && call.length !== 5 && !info?.postindicators?.includes("KG4")) {
    match = { p: "K" }
  }

  if (match?.p) {
    const entity = CTYIndexes.entities[match.p]
    info.entityPrefix = entity.entityPrefix
    info.entityName = entity.name
    info.dxccCode = entity.dxccCode
    info.continent = match.o || entity.continent
    info.cqZone = match.c || entity.cqZone
    info.ituZone = match.i || entity.ituZone
    info.lat = match.y || entity.lat
    info.lon = match.x || entity.lon
    info.locSource = "prefix"
    info.gmtOffset = entity.gmtOffset
  }

  return info
}

module.exports = {
  setCountryFileData,
  annotateFromCountryFile,
}
