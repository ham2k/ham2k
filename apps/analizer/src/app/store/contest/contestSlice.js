import { createSlice } from "@reduxjs/toolkit"
import { cabrilloToQSON } from "@ham2k/qson/cabrillo"
import analyzeAll from "apps/analizer/src/analysis/analyzer"

const initialState = {
  status: "idle",
  qsos: undefined,
  ref: undefined,
}

export const contestSlice = createSlice({
  name: "contest",

  initialState,

  reducers: {
    setQSOs: (state, action) => {
      state.qsos = action.payload
    },

    loadCabrillo: (state, action) => {
      const qson = cabrilloToQSON(action.payload)
      console.log("loadCabrillo", qson)

      state.qson = qson
      state.qsos = qson.qsos
      state.ref = qson.refs.filter((ref) => ref.contest)[0] || {}
      state.rawCabrillo = qson.rawCabrillo
    },
  },
})

export const { loadCabrillo, setQSOs } = contestSlice.actions

export const selectContestQSOs = (state) => {
  return state && state.contest.qsos
}
export const selectContestRef = (state) => state.contest.ref

export const selectContestQSON = (state) => state.contest.qson

export default contestSlice.reducer
