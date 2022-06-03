import { Typography } from "@mui/material"
import React, { useMemo } from "react"
import Maidenhead from "maidenhead"
import SunCalc from "suncalc"

import {
  fmtContestTimestampZulu,
  fmtDateMonthYear,
  fmtDateTime,
  fmtMinutesAsHM,
} from "../../../../utils/format/dateTime"
import { fmtInteger, fmtOneDecimal, fmtPercent } from "../../../../utils/format/number"
import { constants } from "buffer"

export function TimeAnalysis({ qson, analysis, contest, contestRef, overrides }) {
  const contestPeriodInfo = useMemo(() => {
    const info = { periods: [], total: 0 }
    info.periods = contest?.periods || []
    info.totalMinutes = Math.round(
      contest.periods.reduce((acc, period) => {
        return acc + (Date.parse(period[1]) - Date.parse(period[0])) / 1000 / 60
      }, 0)
    )
    return info
  }, [contest])

  const grid = new Maidenhead()
  try {
    grid.locator = overrides?.grid || contestRef?.grid
  } catch (error) {
    // Ignore grid location
  }

  let sun
  if (grid.lat && grid.lon && contest?.periods && contest.periods[0] && contest.periods[0][0]) {
    const date = Date.parse(contest.periods[0][0])
    sun = SunCalc.getTimes(date, grid.lat, grid.lon)
  }

  return (
    <div>
      <Typography component="h2" variant="h5">
        Times
      </Typography>

      <ExpandOnTimes
        contestPeriodInfo={contestPeriodInfo}
        contest={contest}
        analysis={analysis}
        contestRef={contestRef}
      />

      {sun ? (
        <p>
          Local Sunset: {fmtContestTimestampZulu(sun.sunset)} — Local Sunrise: {fmtContestTimestampZulu(sun.sunrise)}
        </p>
      ) : (
        <p>Please enter a grid square location in settings to calculate sunset and sunrise times.</p>
      )}
      {analysis.times && analysis.times.periods ? (
        analysis.times.periods.map((period) => (
          <p key={period.startMillis} style={{ marginLeft: "1em" }}>
            {period.qsos.length} QSOs from {fmtContestTimestampZulu(period.startMillis)} to{" "}
            {fmtContestTimestampZulu(period.endMillis)} - {fmtMinutesAsHM(period.activeMinutes)}
          </p>
        ))
      ) : (
        <p>No periods</p>
      )}
    </div>
  )
}

function ExpandOnTimes({ contestPeriodInfo, contest, analysis, contestRef }) {
  const sentences = []
  let sentence = []
  if (contestPeriodInfo.periods.length > 0) {
    sentence.push(
      <span key="a">
        Contest goes for <b>{fmtInteger(contestPeriodInfo.totalMinutes / 60)} hours</b> from{" "}
        {fmtDateTime(contestPeriodInfo.periods[0][0], "niceDateTime")} to{" "}
        {fmtDateTime(contestPeriodInfo.periods[contestPeriodInfo.periods.length - 1][1], "niceDateTime")}
        {" ("}
        {fmtContestTimestampZulu(contestPeriodInfo.periods[0][0], "niceDateTime")}
        {" to "}
        {fmtContestTimestampZulu(contestPeriodInfo.periods[contestPeriodInfo.periods.length - 1][1], "niceDateTime")})
      </span>
    )

    if (contest.maximumOperationInMinutes < contestPeriodInfo.totalMinutes) {
      sentence.push(
        <span key="b">
          , operating for a <b>maximum of {fmtInteger(contest.maximumOperationInMinutes / 60)} hours</b> with{" "}
          {fmtInteger(contest.minimumBreakInMinutes)} minute minimum breaks
        </span>
      )
    }

    sentence.push(<span key="z">.</span>)
    sentences.push(sentence)

    sentences.push(
      <>
        {contestRef?.call} <b>operated for {fmtMinutesAsHM(analysis.times.activeMinutes)}</b> (
        {fmtPercent(analysis.times.activeMinutes / contestPeriodInfo.totalMinutes, "integer")} of allowed time){" "}
        {analysis.times.inactiveMinutes > 0 ? (
          <span>with {fmtMinutesAsHM(analysis.times.inactiveMinutes)} of breaks.</span>
        ) : (
          <span>without breaks.</span>
        )}
      </>
    )
  } else {
    sentences.push(
      <>
        {contestRef?.call} <b>operated for {fmtMinutesAsHM(analysis.times.activeMinutes)}</b>,{" "}
        {analysis.times.inactiveMinutes > 0 ? (
          <span>with {fmtMinutesAsHM(analysis.times.inactiveMinutes)} of breaks.</span>
        ) : (
          <span>without breaks.</span>
        )}
      </>
    )
  }

  return (
    <>
      {sentences.map((sentence, i) => (
        <p key={i}>{sentence}</p>
      ))}
    </>
  )
}
