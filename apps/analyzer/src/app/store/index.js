import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

import contestReducer from "./contest"
import settingsReducer from "./settings"

const rootReducer = combineReducers({
  contest: contestReducer,
  settings: settingsReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["contest", "settings"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
})

export const testStore = configureStore({
  reducer: rootReducer,
})

export const persistor = persistStore(store)
