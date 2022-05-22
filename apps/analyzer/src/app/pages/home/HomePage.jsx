import { makeStyles } from "@mui/styles"
import * as React from "react"
import commonStyles from "../../styles/common"
import { LogsList } from "./components/LogsList"

const useStyles = makeStyles((theme) => ({
  ...commonStyles(theme),

  root: {
    "& h2": {
      marginTop: "1em",
      borderBottom: "2px solid #333",
    },
  },
}))

export function HomePage() {
  const classes = useStyles()

  return (
    <div class={classes.root}>
      <LogsList classes={classes} />
      <hr />
      <h1>Welcome to Ham2K Contest Analyzer</h1>
      <p>Your files will be processed locally on your own browser, nothing will be uploaded anywhere.</p>
      <p>We can analyze any Cabrillo file, but we provide deeper analysis for the following contests:</p>
      <ul>
        <li>ARRL DX, Sweepstakes, IARU HF</li>
        <li>CQ WW, WPX, WW VHF</li>
        <li>QSO Parties: North America, NY</li>
      </ul>
      We'll be adding more soon.
    </div>
  )
}
