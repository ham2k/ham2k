const END_OF_LINE_REGEXP = /\r?\n\s*/
const PREFIX_REGEXP = /(={0,1})([A-Z0-9/]+)(\(\d+\)){0,1}(\[\d+\]){0,1}/
const PARENS_REGEXP = /[()[\]]/

function parseCountryFile(data) {
  const lines = data.split(END_OF_LINE_REGEXP)
  const indexes = {
    entities: {},
    exact: {},
    prefix: {},
    prefixWAE: {},
    exactWAE: {},
  }

  lines.forEach((line) => {
    const lineParts = line.split(",")
    if (lineParts.length > 9) {
      const entity = {}
      entity.entityPrefix = lineParts[0]
      entity.name = lineParts[1]
      entity.dxccCode = Number.parseInt(lineParts[2])
      entity.continent = lineParts[3]
      entity.cqZone = Number.parseInt(lineParts[4])
      entity.ituZone = Number.parseInt(lineParts[5])
      entity.lat = lineParts[6]
      entity.lon = lineParts[7]
      entity.gmtOffset = lineParts[8]

      indexes.entities[entity.entityPrefix] = entity

      const isWAE = entity.entityPrefix.charAt(0) === "*"

      lineParts[9]
        .replace(";", "")
        .split(" ")
        .forEach((prefix) => {
          const prefixParts = prefix.match(PREFIX_REGEXP)

          if (prefixParts) {
            const match = { p: entity.entityPrefix }
            if (prefixParts[3]) match.c = Number.parseInt(prefixParts[3].replace(PARENS_REGEXP, ""))
            if (prefixParts[4]) match.i = Number.parseInt(prefixParts[4].replace(PARENS_REGEXP, ""))

            if (prefixParts[1] === "=") {
              if (isWAE) indexes.exactWAE[prefixParts[2]] = match
              else indexes.exact[prefixParts[2]] = match
            } else {
              if (isWAE) indexes.prefixWAE[prefixParts[2]] = match
              else indexes.prefix[prefixParts[2]] = match
            }
          }
        })
    }
  })

  return indexes
}

module.exports = {
  parseCountryFile,
}
