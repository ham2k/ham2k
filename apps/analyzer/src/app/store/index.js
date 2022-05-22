import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import localforage from "localforage"

import contestReducer from "./contest"
import settingsReducer from "./settings"
import contestLogsReducer from "./contestLogs"

const rootReducer = combineReducers({
  contestLogs: contestLogsReducer,
  contest: contestReducer,
  settings: settingsReducer,
})

const persistConfig = {
  key: "root",
  storage: localforage,
  whitelist: ["contest", "settings", "contestLogs"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export const testStore = configureStore({
  reducer: rootReducer,
})

export const persistor = persistStore(store)
