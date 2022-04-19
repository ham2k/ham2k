/* eslint-disable no-unused-vars */
import React from "react"
import { Button } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import { useSelector, useDispatch } from "react-redux"
import { loadCabrillo, selectContestRef, resetContest } from "../../store/contest/contestSlice"

export function LogLoader() {
  const dispatch = useDispatch()
  const ref = useSelector(selectContestRef)

  const handleFileSelected = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      dispatch(loadCabrillo(reader.result))
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    dispatch(resetContest())
  }

  console.log(ref)
  return (
    <section>
      {ref ? (
        <div style={{ textAlign: "center" }}>
          <hr />
          <p>To analyze a different contest, please select a new Cabrillo file.</p>
          <p>
            <Button
              variant="contained"
              startIcon={<FolderOpenIcon />}
              color="primary"
              component="label"
              onChange={handleFileSelected}
              size="medium"
            >
              Load Cabrillo
              <input type="file" hidden />
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="outlined" color="primary" startIcon={<ClearIcon />} onClick={handleReset} size="medium">
              Reset
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <p>
            Please select a Cabrillo file to analyze:{" "}
            <Button variant="contained" startIcon={<FolderOpenIcon />} component="label" onChange={handleFileSelected}>
              Load Cabrillo
              <input type="file" hidden />
            </Button>
          </p>
          <hr />
          <p>Your files will be processed locally on your own browser, nothing will be uploaded anywhere.</p>
          <p>
            We can analyze any Cabrillo file, but we provide deeper analysis for the following contests:
            <ul>
              <li>ARRL DX, Sweepstakes, IARU HF</li>
              <li>CQ WW, WPX, WW VHF</li>
            </ul>
            We'll be adding more soon.
          </p>
        </div>
      )}
    </section>
  )
}
