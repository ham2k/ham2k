/* eslint-disable no-unused-vars */
import React, { useMemo } from "react"

export function TopTenEntities({ entities }) {
  const sorted = useMemo(() => Object.entries(entities || {}).sort((a, b) => b[1] - a[1]), [entities])

  if (entities) {
    return (
      <div>
        <h3>{sorted.length} DXCC Entities</h3>

        {sorted.slice(0, 10).map((pair) => (
          <div key={pair[0]}>
            {pair[1]} {pair[0]}
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export function TopTenContinents({ continents }) {
  const sorted = useMemo(() => Object.entries(continents || {}).sort((a, b) => b[1] - a[1]), [continents])

  if (continents) {
    return (
      <div>
        <h3>{sorted.length} Continents</h3>

        {sorted.slice(0, 10).map((pair) => (
          <div key={pair[0]}>
            {pair[1]} {pair[0]}
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export function TopTenCallsigns({ calls }) {
  const sorted = useMemo(() => Object.entries(calls || {}).sort((a, b) => b[1] - a[1]), [calls])

  if (calls) {
    return (
      <div>
        <h3>{sorted.length} Unique Callsigns</h3>

        {sorted.slice(0, 10).map((pair) => (
          <div key={pair[0]}>
            {pair[1]} {pair[0]}
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export function TopTenCQZones({ cqZones }) {
  const sorted = useMemo(() => Object.entries(cqZones || {}).sort((a, b) => b[1] - a[1]), [cqZones])

  if (cqZones) {
    return (
      <div>
        <h3>{sorted.length} CQ Zones</h3>

        {sorted.slice(0, 10).map((pair) => (
          <div key={pair[0]}>
            {pair[1]} Zone {pair[0]}
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export function TopTenITUZones({ ituZones }) {
  const sorted = useMemo(() => Object.entries(ituZones || {}).sort((a, b) => b[1] - a[1]), [ituZones])

  if (ituZones) {
    return (
      <div>
        <h3>{sorted.length} ITU Zones</h3>

        {sorted.slice(0, 10).map((pair) => (
          <div key={pair[0]}>
            {pair[1]} Zone {pair[0]}
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}
