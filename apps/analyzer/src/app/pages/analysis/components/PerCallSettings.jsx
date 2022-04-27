import React from "react"
import { Autocomplete, Grid, FormLabel, TextField, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { DateTime } from "luxon"
import tzdata from "tzdata"

import commonStyles from "../../../styles/common"
import { setPerCallSettings } from "../../../store/settings"
import { useDispatch } from "react-redux"

const styles = {
  root: {},
}

const useStyles = makeStyles((theme) => ({ ...commonStyles(theme), ...styles }))

const LuxonTimezones = Object.entries(tzdata.zones)
  .filter(([zoneName, v]) => Array.isArray(v))
  .map(([zoneName, v]) => zoneName)
  .filter((tz) => DateTime.local().setZone(tz).isValid)

export function PerCallSettings({ settings }) {
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleGridChange = (event) => {
    dispatch(setPerCallSettings({ call: settings.call, grid: event.target.value }))
  }
  const handleTZChange = (event, value) => {
    console.log("handleTZChange", value, event)
    dispatch(setPerCallSettings({ call: settings.call, tz: value }))
  }

  if (settings?.call) {
    return (
      <Grid container direction="row" justifyContent="start" alignItems="start" spacing={2}>
        <Grid item>
          <Typography variant="h6" sx={{ paddingTop: "0.7em" }}>
            Settings for {settings.call}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="per-call-location"
            label="Grid Location"
            variant="standard"
            value={settings.grid || ""}
            onChange={handleGridChange}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            disablePortal
            id="per-call-timezone"
            options={LuxonTimezones}
            getOptionLabel={(option) => option.replace(/_/g, " ").replace(/\//g, ": ").replace("Etc: ", "")}
            isOptionEqualToValue={(option, value) => option === value}
            value={settings.tz || null}
            onChange={handleTZChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Timezone" variant="standard" />}
          />
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}
