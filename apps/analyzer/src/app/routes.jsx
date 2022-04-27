import * as React from "react"
import { Routes, Route } from "react-router-dom"
import { AnalysisPage } from "./pages/analysis"
import { HomePage } from "./pages/home"

export function ContentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
    </Routes>
  )
}
