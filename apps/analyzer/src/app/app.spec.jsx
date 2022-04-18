import { render } from "@testing-library/react"
import { Provider } from "react-redux"

import { testStore } from "./store"

import App from "./app"

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Provider store={testStore}>
        <App />
      </Provider>
    )

    expect(baseElement).toBeTruthy()
  })

  it("should have a greeting as the title", () => {
    const { getAllByText } = render(
      <Provider store={testStore}>
        <App />
      </Provider>
    )

    expect(getAllByText(/Ham2K Analyzer/gi)).toBeTruthy()
  })
})
