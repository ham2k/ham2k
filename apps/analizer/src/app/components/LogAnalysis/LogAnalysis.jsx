/* eslint-disable no-unused-vars */
import React from "react"
import { Typography } from "@mui/material"
import { useSelector } from "react-redux"

import { fmtContestTimestampZulu, fmtDateMonthYear, fmtMinutesAsHM } from "../../utils/format/dateTime"

import { selectContestQSOs, selectContestRef, selectContestAnalysis } from "../../store/contest/contestSlice"
import { fmtInteger, fmtOneDecimal } from "../../utils/format/number"

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
        {ref.callsign}
        <i> in </i>
        {ref.contest}
        <i> {fmtDateMonthYear(analysis.times.periods[0].startMillis)}</i>
      </Typography>

      <p>
        {fmtInteger(qsos.length)} QSOs
        {" in "}
        {fmtMinutesAsHM(analysis.times.activeMinutes)} {" at "}
        {fmtOneDecimal((qsos.length / analysis.times.activeMinutes) * 60)} q/h (
        {fmtMinutesAsHM(analysis.times.inactiveMinutes)} inactive)
      </p>

      <h2>Periods</h2>

      {analysis.times.periods.map((period) => (
        <p key={period.startMillis}>
          {period.qsos.length} QSOs from {fmtContestTimestampZulu(period.startMillis)} to{" "}
          {fmtContestTimestampZulu(period.endMillis)} - {fmtMinutesAsHM(period.activeMinutes)}
        </p>
      ))}

      <h2>Rates</h2>
      {Object.entries(analysis.qsos.slices).map((pair) => (
        <p key={pair[1].startMillis}>
          {pair[1].qsos.all} QSOs - {fmtContestTimestampZulu(pair[1].startMillis)}
        </p>
      ))}
    </section>
  )
}
