import { parseCallsign } from "@ham2k/data/callsigns"
import { findContestInfoForId } from "@ham2k/data/contests"
import { annotateFromCountryFile } from "@ham2k/data/country-file"
import { cabrilloToQSON } from "@ham2k/qson/cabrillo"
import { createSlice } from "@reduxjs/toolkit"
import { contestLogsDB } from "./contestLogsDB"
import { generateContestLogKey, guessStartOfContest } from "./contestLogsUtils"

const initialState = {
  logs: [],
  overrides: {},
}

export const contestLogsSlice = createSlice({
  name: "contestLogs",

  initialState,

  reducers: {
    setCurrentLog: (state, action) => {
      state.current = action.payload
    },
    addLog: (state, action) => {
      const existing = state.logs.find((x) => x.key === action.payload.key)
      if (existing) {
        state.logs[state.logs.indexOf(existing)] = action.payload
      } else {
        state.logs.push(action.payload)
      }
    },
    removeLog: (state, action) => {
      // delete state.logs[action.payload.id]
      // if (state.current.id === action.payload.id) {
      //   state.current = undefined
      // }
    },
    setLogList: (state, action) => {
      state.logs = action.payload
    },
    setLogOverrides: (state, action) => {
      state.overrides = state.overrides || {}
      state.overrides[action.payload.key] = action.payload
    },
  },
})

export const { setCurrentLog, addLog, removeLog, setLogList, setLogOverrides } = contestLogsSlice.actions

export const loadCabrilloLog = (data) => (dispatch) => {
  return contestLogsDB().then((db) => {
    const qson = cabrilloToQSON(data)
    qson.qsos.forEach((qso) => {
      parseCallsign(qso.our.call, qso.our)
      annotateFromCountryFile(qso.our)

      parseCallsign(qso.their.call, qso.their)
      annotateFromCountryFile(qso.their)
    })

    const contestRef = qson?.refs && qson.refs.find((ref) => ref.contest)
    const contestInfo = contestRef && findContestInfoForId(contestRef.contest, { near: qson.qsos[0].start })
    contestInfo?.score(qson)

    const key = generateContestLogKey({ qson, contestInfo, contestRef })

    const listEntry = {
      key,
      call: contestRef.call,
      qsoCount: qson.qsos.length,
      score: contestInfo?.scoringResults?.total,
      contestId: contestInfo?.id,
      longName: contestInfo?.longName,
      name: contestInfo?.name,
      modes: contestInfo?.modes,
      sponsor: contestInfo?.modes,
      longSponsor: contestInfo?.longSponsor,
      start: guessStartOfContest({ qson, contestInfo, contestRef }),
    }
    const dataEntry = {
      ...listEntry,
      qson,
      data,
    }

    const transaction = db.transaction(["logs", "logData"], "readwrite")
    transaction.objectStore("logData").put(dataEntry)
    transaction.objectStore("logs").put(listEntry)
    transaction.onsuccess = () => {
      dispatch(addLog(listEntry))
    }

    return dataEntry
  })
}

export const fetchContestLogList = () => (dispatch) => {
  contestLogsDB().then((db) => {
    const transaction = db.transaction("logs", "readonly")
    const request = transaction.objectStore("logs").getAll()
    request.onsuccess = () => {
      dispatch(setLogList(request.result))
    }
  })
}

export const setCurrentContestLog = (key) => (dispatch) => {
  contestLogsDB().then((db) => {
    const transaction = db.transaction("logData", "readonly")
    const request = transaction.objectStore("logData").get(key)
    request.onsuccess = () => {
      dispatch(setCurrentLog(request.result))
    }
  })
}

export const resetCurrentContestLog = () => (dispatch) => {
  dispatch(setCurrentLog(undefined))
}

export const selectContestLogList = (state) => {
  return state?.contestLogs?.logs
}

export const selectCurrentContestLog = (state) => {
  return state?.contestLogs?.current
}

export const selectLogOverrides = (key) => (state) => {
  return (state?.contestLogs?.overrides && state?.contestLogs?.overrides[key]) || {}
}

export default contestLogsSlice.reducer
