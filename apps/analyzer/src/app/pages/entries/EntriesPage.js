/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from "react"

import { Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@mui/styles"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

import { useNavigate, useParams } from "react-router-dom"

import commonStyles from "../../styles/common"

import { findContestInfoForId } from "@ham2k/data/contests"
import { fmtDateMonthYear, fmtMinutesAsHM, fmtContestTimestampZulu } from "../../../utils/format/dateTime"
import { fmtInteger, fmtOneDecimal } from "../../../utils/format/number"

import {
  resetCurrentContestLog,
  selectCurrentContestLog,
  selectLogOverrides,
  setCurrentContestLog,
} from "../../store/contestLogs"
import classNames from "classnames"
import { camelCaseToTitleCase } from "apps/analyzer/src/utils/format/string"

const useStyles = makeStyles((theme) => ({
  ...commonStyles(theme),

  root: {
    "& h2": {
      marginTop: "1em",
      borderBottom: "2px solid #333",
    },
  },

  table: {
    width: "inherit important!",
    marginTop: "0.5em",
    "& th": {
      textAlign: "left",
      paddingRight: "1em",
    },
    "& td": {
      textAlign: "left",
      paddingRight: "1em",
    },

    "& .col-number": {
      textAlign: "right",
      maxWidth: "4em",
    },
    "& .col-time": {
      minWidth: "5.5em",
    },
    "& .col-band": {
      textAlign: "right",
      fontWeight: "bold",
    },
    "& .col-freq": {
      textAlign: "right",
    },
    "& .col-cqz, & .col-ituz, & .col-exch-cqZone, & .col-exch-ituZone": {
      textAlign: "right",
    },
  },
}))

export function EntriesPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { logKey } = useParams()
  console.log(logKey)
  useEffect(() => {
    dispatch(setCurrentContestLog(logKey))
  }, [dispatch, logKey])

  const log = useSelector(selectCurrentContestLog)
  const qson = useMemo(() => log?.qson || {}, [log])
  const ref = useMemo(() => log?.qson?.refs && log?.qson.refs.find((ref) => ref.contest), [log])
  const qsos = useMemo(() => log?.qson?.qsos || [], [log])
  const overrides = useSelector(selectLogOverrides(log.key))

  const contestRef = useMemo(() => qson?.refs && qson.refs.find((ref) => ref.contest), [qson])
  const contest = useMemo(() => {
    const contest = ref && findContestInfoForId(ref.contest, { near: qson.qsos[0].start })
    contest && contest.score(qson)
    return contest
  }, [qson, ref])
  console.log(qsos[0])

  const ourExchange = useMemo(() => {
    if (!qson.qsos[0]) return []
    return contest.exchange.filter((field) => {
      if (field === "rst") return false
      const first = qson.qsos[0].our.sent[field]
      return qson.qsos.find((qso) => qso.our.sent[field] !== first)
    })
  }, [contest, qson])
  const theirExchange = useMemo(() => {
    if (!qson.qsos[0]) return []
    return contest.exchange.filter((field) => {
      if (field === "rst") return false
      const first = qson.qsos[0].their.sent[field]
      return qson.qsos.find((qso) => qso.their.sent[field] !== first)
    })
  }, [contest, qson])

  if (!ref || !contest) {
    return null
  }

  if (log.key !== logKey) {
    return <div></div>
  }

  const handleBack = (event) => {
    dispatch(resetCurrentContestLog())
    navigate("/")
  }

  return (
    <section className={classes.root}>
      <Typography component="h1" variant="h3">
        <div style={{ float: "right" }}>
          <Button
            variant={"text"}
            color={"primary"}
            startIcon={<ChevronLeftIcon />}
            onClick={handleBack}
            size={"large"}
          >
            Back
          </Button>
        </div>
        {ref.call}
        <i> in </i>
        {contest.longName}
        {contest.periods && contest.periods[0] && contest.periods[0][0] ? (
          <i> {fmtDateMonthYear(contest.periods[0][0])}</i>
        ) : (
          <i>Unknown duration</i>
        )}
      </Typography>

      <h2>QSOs</h2>
      <table className={classNames(classes.niceTable, classes.table, classes.bandColors)}>
        <thead>
          <tr>
            <th className="col-number">#</th>
            <th className="col-time">Time</th>
            <th className="col-call">Call</th>
            <th className="col-band">Band</th>
            <th className="col-freq">Freq</th>
            {ourExchange.map((field, i) => (
              <th key={field} className={`col-exchange col-exchange-${i} col-exch-${field}`}>
                {i === 0 ? "Our " : ""}
                {exchangeLabel(field)}
              </th>
            ))}
            {theirExchange.map((field, i) => (
              <th key={field} className={`col-exchange col-exchange-${i} col-exch-${field}`}>
                {i === 0 ? "Their " : ""}
                {exchangeLabel(field)}
              </th>
            ))}

            <th className="col-prefix">Pre</th>
            <th className="col-entity">Entity</th>
            <th className="col-continent">Cont</th>
            <th className="col-cqz">CQZ</th>
            <th className="col-ituz">ITUZ</th>
          </tr>
        </thead>
        <tbody>
          {qsos.map((qso, i) => (
            <tr key={i} className={classNames(`band-${qso.band}`)}>
              <td className="col-number">{fmtInteger(qso.number)}</td>
              <td className="col-time">{fmtContestTimestampZulu(qso.startMillis)}</td>
              <td className="col-call">{qso.their.call}</td>
              <td className={classNames("col-band", "band-color")}>{qso.band}</td>
              <td className={classNames("col-freq", "band-color")}>{fmtInteger(qso.freq)}</td>
              {ourExchange.map((field, i) => (
                <td key={field} className={`col-exchange col-exchange-${i} col-exch-${field}`}>
                  {qso.our.sent[field]}
                </td>
              ))}
              {theirExchange.map((field, i) => (
                <td key={field} className={`col-exchange col-exchange-${i} col-exch-${field}`}>
                  {qso.their.sent[field]}
                </td>
              ))}
              <td className="col-prefix">{qso.their.entityPrefix}</td>
              <td className="col-entity">{qso.their.entityName}</td>
              <td className="col-continent">{qso.their.continent}</td>
              <td className="col-cqz">{qso.their.cqZone}</td>
              <td className="col-ituz">{qso.their.ituZone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function exchangeLabel(key) {
  if (key === "cqZone") return "CQZ"
  else if (key === "ituZone") return "ITUZ"
  else return camelCaseToTitleCase(key)
}
