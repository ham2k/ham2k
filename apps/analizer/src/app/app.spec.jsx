import { render } from "@testing-library/react"
import { Provider } from "react-redux"

import { store } from "./store"

import App from "./app"

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(baseElement).toBeTruthy()
  })

  it("should have a greeting as the title", () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(getAllByText(/Ham2K Analizer/gi)).toBeTruthy()
  })
})
