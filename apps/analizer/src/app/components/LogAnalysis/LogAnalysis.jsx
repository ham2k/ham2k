/* eslint-disable no-unused-vars */
import React, { useMemo } from "react"
import { Typography } from "@mui/material"
import { useSelector } from "react-redux"

import { fmtContestTimestampZulu, fmtDateMonthYear, fmtMinutesAsHM } from "../../utils/format/dateTime"

import { selectContestQSOs, selectContestRef, selectContestQSON } from "../../store/contest/contestSlice"
import { fmtInteger, fmtOneDecimal } from "../../utils/format/number"
import { ChartQSOs } from "./ChartQSOs"
import analyzeAll from "../../../analysis/analyzer"
import { TopTenCallsigns, TopTenContinents, TopTenCQZones, TopTenEntities, TopTenITUZones } from "./TopTenLists"
import { LogSummary } from "./LogSummary"
import { findContestInfoForId } from "@ham2k/data/contests"
import { makeStyles } from "@mui/styles"
import commonStyles from "../../styles/common"

const useStyles = makeStyles((theme) => ({
  ...commonStyles(theme),

  root: {
    "& .nice-table": {
      borderCollapse: "collapse",
    },
    "& .nice-table th": {
      borderBottom: "1px solid #666",
      margin: 0,
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
    },
    "& .nice-table td": {
      margin: 0,
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
    },
    "& .nice-table tr.totals": {
      borderTop: "1px solid #666",
    },
    "& h2": {
      marginTop: "1em",
      borderBottom: "2px solid #333",
    },
  },
}))

export function LogAnalysis() {
  const classes = useStyles()
  const qson = useSelector(selectContestQSON)
  const ref = useSelector(selectContestRef)
  const qsos = useSelector(selectContestQSOs)
  const contestRef = useMemo(() => qson?.refs && qson.refs.find((ref) => ref.contest), [qson])
  const contest = useMemo(() => {
    const ref = qson?.refs && qson.refs.find((ref) => ref.contest)
    const contest = ref && findContestInfoForId(ref.contest)
    contest && contest.score(qson)
    return contest
  }, [qson])

  const analysis = useMemo(() => analyzeAll(qson), [qson])

  if (!analysis) {
    return null
  }

  return (
    <section className={classes.root}>
      <Typography component="h1" variant="h3">
        {ref.callsign}
        <i> in </i>
        {contest.longName}
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
      <p>
        Claimed Score: {fmtInteger(contestRef?.claimedScore)} - Calculated Score:{" "}
        {fmtInteger(contest?.scoringResults?.total || 0)}
      </p>

      <LogSummary qson={qson} analysis={analysis} contest={contest} />

      <ChartQSOs qson={qson} analysis={analysis} contest={contest} />

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
      <h2>QSOs</h2>
      <TopTenEntities dxcc={analysis.calls.dxcc} />
      <TopTenContinents continents={analysis.calls.continents} />
      <TopTenCallsigns calls={analysis.calls.calls} />
      <TopTenCQZones cqZones={analysis.calls.cqZones} />
      <TopTenITUZones ituZones={analysis.calls.ituZones} />
    </section>
  )
}
