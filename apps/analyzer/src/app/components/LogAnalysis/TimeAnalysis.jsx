import { Typography } from "@mui/material"
import React, { useMemo } from "react"
import { fmtContestTimestampZulu, fmtDateMonthYear, fmtMinutesAsHM } from "../../utils/format/dateTime"
import { fmtInteger, fmtOneDecimal, fmtPercent } from "../../utils/format/number"

export function TimeAnalysis({ qson, analysis, contest, contestRef }) {
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
        Contest goes for <b>{fmtInteger(contestPeriodInfo.totalMinutes / 60)} hours</b>
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
        {contestRef?.callsign} <b>operated for {fmtMinutesAsHM(analysis.times.activeMinutes)}</b> (
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
        {contestRef?.callsign} <b>operated for {fmtMinutesAsHM(analysis.times.activeMinutes)}</b>,{" "}
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
      {sentences.map((sentence) => (
        <p>{sentence}</p>
      ))}
    </>
  )
}
