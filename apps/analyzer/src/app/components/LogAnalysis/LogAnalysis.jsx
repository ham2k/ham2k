/* eslint-disable no-unused-vars */
import React, { useMemo } from "react"
import { Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { makeStyles } from "@mui/styles"

import commonStyles from "../../styles/common"

import { findContestInfoForId } from "@ham2k/data/contests"
import { fmtDateMonthYear, fmtMinutesAsHM } from "../../utils/format/dateTime"
import { fmtInteger, fmtOneDecimal } from "../../utils/format/number"

import { selectContestQSOs, selectContestRef, selectContestQSON } from "../../store/contest/contestSlice"
import analyzeAll from "../../../analysis/analyzer"

import { TimeAnalysis } from "./TimeAnalysis"
import { ChartQSOs } from "./ChartQSOs"
import { LogSummary } from "./LogSummary"
import { TopTenCallsigns, TopTenContinents, TopTenCQZones, TopTenEntities, TopTenITUZones } from "./TopTenLists"

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
    const contest = ref && findContestInfoForId(ref.contest, { near: qson.qsos[0].start })
    contest && contest.score(qson)
    return contest
  }, [qson])

  const analysis = useMemo(() => analyzeAll(qson), [qson])

  if (!analysis || !ref) {
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
        <b>{fmtInteger(qsos.length)} QSOs</b>
        {" in "}
        {fmtMinutesAsHM(analysis.times.activeMinutes)} {" at "}
        <b>{fmtOneDecimal((qsos.length / analysis.times.activeMinutes) * 60)} QSO/h</b>. &nbsp;&nbsp;&nbsp; Claimed
        Score: {fmtInteger(contestRef?.claimedScore)} - Calculated Score:{" "}
        {fmtInteger(contest?.scoringResults?.total || 0)}
      </p>

      <LogSummary qson={qson} analysis={analysis} contest={contest} contestRef={contestRef} />

      <ChartQSOs qson={qson} analysis={analysis} contest={contest} contestRef={contestRef} />

      <TimeAnalysis qson={qson} analysis={analysis} contest={contest} contestRef={contestRef} />

      <h2>QSOs</h2>
      <TopTenEntities dxcc={analysis.calls.dxcc} />
      <TopTenContinents continents={analysis.calls.continents} />
      <TopTenCallsigns calls={analysis.calls.calls} />
      <TopTenCQZones cqZones={analysis.calls.cqZones} />
      <TopTenITUZones ituZones={analysis.calls.ituZones} />
    </section>
  )
}
