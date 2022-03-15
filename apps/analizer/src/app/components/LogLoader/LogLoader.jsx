/* eslint-disable no-unused-vars */
import { Typography } from "@mui/material"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadCabrillo, selectContestQSOs } from "../../store/contest/contestSlice"

export function LogLoader() {
  const dispatch = useDispatch()
  const qsos = useSelector(selectContestQSOs)

  const handleFileSelected = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      dispatch(loadCabrillo(reader.result))
    }
    reader.readAsText(file)
  }

  return (
    <section>
      <p>
        Load a Cabrillo log file: <input type="file" onChange={handleFileSelected} />
      </p>
    </section>
  )
}
