import * as React from "react"
import { LogLoader } from "../../components/LogLoader"

export function HomePage() {
  return (
    <div>
      <h1>Welcome to Ham2K Contest Analyzer</h1>
      <p>
        Please select a Cabrillo file to analyze: <LogLoader />
      </p>
      <hr />
      <p>Your files will be processed locally on your own browser, nothing will be uploaded anywhere.</p>
      <p>We can analyze any Cabrillo file, but we provide deeper analysis for the following contests:</p>
      <ul>
        <li>ARRL DX, Sweepstakes, IARU HF</li>
        <li>CQ WW, WPX, WW VHF</li>
        <li>QSO Parties: North America, NY</li>
      </ul>
      We'll be adding more soon.
    </div>
  )
}
