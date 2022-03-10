import { configureStore } from "@reduxjs/toolkit"
import contestReducer from "./contest/contestSlice"

export const store = configureStore({
  reducer: {
    contest: contestReducer,
  },
})
