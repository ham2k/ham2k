/* eslint-disable no-unused-vars */
import React from "react"
import { Button } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { resetContest } from "../store/contest"

export function LogResetter({ variant, color, size }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (event) => {
    dispatch(resetContest())
    navigate("/")
  }

  return (
    <Button
      variant={variant || "outlined"}
      color={color || "primary"}
      startIcon={<ClearIcon />}
      onClick={handleClick}
      size={size || "medium"}
    >
      Reset
    </Button>
  )
}
