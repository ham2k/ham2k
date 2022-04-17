import React from "react"
import { Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import commonStyles from "../../styles/common"
import classNames from "classnames"
import { BAND_COLORS } from "../../styles/bandColors"
import { fmtInteger } from "../../utils/format/number"

const styles = {
  table: {
    width: "inherit important!",
    marginTop: "0.5em",
    maxWidth: "15em",
    "& .band": {
      textAlign: "right",
      maxWidth: "4em",
    },
    "& .qsos": {
      textAlign: "right",
    },
    "& .percent": {
      textAlign: "right",
      width: "3em",
      fontSize: "80%",
    },
    "& tr.totals td": {
      fontWeight: "bold",
    },
  },
}
Object.entries(BAND_COLORS).forEach((entry) => {
  styles.table[`& .band-${entry[0]} .band-color`] = {
    color: entry[1],
    filter: "brightness(0.85)",
  }
  styles.table[`& .band-${entry[0]} .band-bgcolor`] = {
    backgroundColor: entry[1],
  }
})

const useStyles = makeStyles((theme) => ({ ...commonStyles(theme), ...styles }))

export function LogSummary({ qson, analysis, contest }) {
  const classes = useStyles()
  const bands = contest.bands

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h5">
        Summary
      </Typography>

      <table className={classNames("nice-table", classes.table)}>
        <thead>
          <tr>
            <th className="band">Band</th>
            <th className="qsos">QSOs</th>
            <th className="percent">%</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <tr className={`band-${band}`} key={band}>
              <td className="band band-color strong">{band}</td>
              <td className="qsos">{analysis.qsos.totals[band] || "-"}</td>
              <td className="percent">
                {analysis.qsos.totals[band] > 0
                  ? `${fmtInteger((analysis.qsos.totals[band] / analysis.qsos.totals.all) * 100)}%`
                  : "-"}
              </td>
            </tr>
          ))}
          <tr className="totals">
            <td className="band">TOTAL</td>
            <td className="qsos">{analysis.qsos.totals.all || "-"}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
