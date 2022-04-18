import { StrictMode } from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import App from "./app/app"
import { persistor, store } from "./app/store"

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
)
