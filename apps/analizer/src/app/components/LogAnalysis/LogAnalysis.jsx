/* eslint-disable no-unused-vars */
import React from "react"
import { Typography } from "@mui/material"
import { useSelector } from "react-redux"

import { contestTimestamp, minutesAsHM } from "../../utils/format/dateTime"

import { selectContestQSOs, selectContestRef, selectContestAnalysis } from "../../store/contest/contestSlice"
import { decimals } from "../../utils/format/number"

export function LogAnalysis() {
  const ref = useSelector(selectContestRef)
  const analysis = useSelector(selectContestAnalysis)
  const qsos = useSelector(selectContestQSOs)

  if (!analysis) {
    return null
  }

  return (
    <section>
      <Typography component="h1" variant="h3">
        {ref.contest} for {ref.callsign}
      </Typography>

      <p>
        {qsos.length} QSOs
        {" in "}
        {minutesAsHM(analysis.times.activeMinutes)} at {decimals((qsos.length / analysis.times.activeMinutes) * 60, 0)}{" "}
        q/h ({minutesAsHM(analysis.times.inactiveMinutes)} inactive)
      </p>

      {analysis.times.periods.map((period) => (
        <p key={period.startMillis}>
          {period.qsos.length} QSOs from {contestTimestamp(period.startMillis)} to {contestTimestamp(period.endMillis)}
        </p>
      ))}
    </section>
  )
}
