import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

import contestReducer from "./contest/contestSlice"

const rootReducer = combineReducers({
  contest: contestReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["contest"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const testStore = configureStore({
  reducer: rootReducer,
})

export const persistor = persistStore(store)
