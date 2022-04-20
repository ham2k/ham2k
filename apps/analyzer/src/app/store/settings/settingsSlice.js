import { createSlice } from "@reduxjs/toolkit"
import { parseCallsign } from "@ham2k/data/callsigns"

const initialState = {
  perCall: {},
}

export const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    setPerCallSettings: (state, action) => {
      const { call } = action.payload
      state.perCall[call] = { ...state.perCall[call], ...action.payload }
    },
  },
})

export const { setPerCallSettings } = settingsSlice.actions

export const selectPerCallSettings = (call) => (state) => state.settings.perCall[call] || { call }

export default settingsSlice.reducer
