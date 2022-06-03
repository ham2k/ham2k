/* eslint-disable no-unused-vars */
import React from "react"
import { Button } from "@mui/material"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loadCabrilloLog } from "../../../store/contestLogs"

export function LogLoader({ title, classes }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFileSelected = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      dispatch(loadCabrilloLog(reader.result)).then((data) => {
        navigate(`/contest/${data.key}`)
      })
    }
    reader.readAsText(file)
  }

  return (
    <Button
      variant="contained"
      startIcon={<FolderOpenIcon />}
      color="primary"
      component="label"
      onChange={handleFileSelected}
      size="medium"
    >
      {title || "Load Cabrillo file"}
      <input type="file" hidden />
    </Button>
  )
}
