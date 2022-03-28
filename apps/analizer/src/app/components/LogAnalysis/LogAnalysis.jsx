/* eslint-disable no-unused-vars */
import React, { useMemo } from "react"
import { Typography } from "@mui/material"
import { useSelector } from "react-redux"

import { fmtContestTimestampZulu, fmtDateMonthYear, fmtMinutesAsHM } from "../../utils/format/dateTime"

import { selectContestQSOs, selectContestRef, selectContestQSON } from "../../store/contest/contestSlice"
import { fmtInteger, fmtOneDecimal } from "../../utils/format/number"
import { ChartQSOs } from "./ChartQSOs"
import analyzeAll from "../../../analysis/analyzer"

export function LogAnalysis() {
  const qson = useSelector(selectContestQSON)
  const ref = useSelector(selectContestRef)
  const qsos = useSelector(selectContestQSOs)
  console.log("LogAnalysis", qson)

  const analysis = useMemo(() => analyzeAll(qson), [qson])

  if (!analysis) {
    return null
  }

  return (
    <section>
      <Typography component="h1" variant="h3">
        {ref.callsign}
        <i> in </i>
        {ref.contest}
        {analysis.times && analysis.times.periods ? (
          <i> {fmtDateMonthYear(analysis.times.periods[0].startMillis)}</i>
        ) : (
          <i>Unknown duration</i>
        )}
      </Typography>

      <p>
        {fmtInteger(qsos.length)} QSOs
        {" in "}
        {fmtMinutesAsHM(analysis.times.activeMinutes)} {" at "}
        {fmtOneDecimal((qsos.length / analysis.times.activeMinutes) * 60)} q/h (
        {fmtMinutesAsHM(analysis.times.inactiveMinutes)} inactive)
      </p>

      <ChartQSOs analysis={analysis} />

      <h2>Periods</h2>

      {analysis.times && analysis.times.periods ? (
        analysis.times.periods.map((period) => (
          <p key={period.startMillis}>
            {period.qsos.length} QSOs from {fmtContestTimestampZulu(period.startMillis)} to{" "}
            {fmtContestTimestampZulu(period.endMillis)} - {fmtMinutesAsHM(period.activeMinutes)}
          </p>
        ))
      ) : (
        <p>No periods</p>
      )}
    </section>
  )
}
