/* eslint-disable no-unused-vars */
import React from "react"
import { Button } from "@mui/material"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import { useDispatch } from "react-redux"
import { loadCabrillo } from "../store/contest/contestSlice"
import { useNavigate } from "react-router-dom"

export function LogLoader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFileSelected = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      dispatch(loadCabrillo(reader.result))
      navigate("/analysis")
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
      Load Cabrillo
      <input type="file" hidden />
    </Button>
  )
}
