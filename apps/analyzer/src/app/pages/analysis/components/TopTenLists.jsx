/* eslint-disable no-unused-vars */
import React, { useMemo } from "react"
import { CONTINENTS, ENTITIES } from "@ham2k/data/dxcc"
import { CQZONES } from "@ham2k/data/cqzones"
import { parseCallsign } from "@ham2k/data/callsigns"
import { annotateFromCountryFile } from "@ham2k/data/country-file"

export function TopTenEntities({ dxcc }) {
  const sorted = useMemo(() => Object.entries(dxcc || {}).sort((a, b) => b[1] - a[1]), [dxcc])

  if (dxcc) {
    return (
      <div>
        <h3>{sorted.length} DXCC Entities</h3>

        <table>
          <tbody>
            {sorted.slice(0, 10).map((pair) => (
              <tr key={pair[0]}>
                <td align="right">{pair[1]}</td>
                <td>{ENTITIES[pair[0]]?.flag}</td>
                <td>{ENTITIES[pair[0]]?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

        <table>
          <tbody>
            {sorted.slice(0, 10).map((pair) => (
              <tr key={pair[0]}>
                <td align="right">{pair[1]}</td>
                <td>{CONTINENTS[pair[0]]}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <table>
          <tbody>
            {sorted.slice(0, 10).map((pair) => {
              const callInfo = parseCallsign(pair[0])
              annotateFromCountryFile(callInfo)
              return (
                <tr key={pair[0]}>
                  <td align="right">{pair[1]}</td>
                  <td>{ENTITIES[callInfo.dxccCode]?.flag}</td>
                  <td>{pair[0]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
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

        <table>
          <tbody>
            {sorted.slice(0, 10).map((pair) => (
              <tr key={pair[0]}>
                <td align="right">{pair[1]}</td>
                <td>
                  CQ Zone {pair[0]} - {CQZONES[pair[0]].name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

        <table>
          <tbody>
            {sorted.slice(0, 10).map((pair) => (
              <tr key={pair[0]}>
                <td align="right">{pair[1]}</td>
                <td>ITU Zone {pair[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  } else {
    return null
  }
}
