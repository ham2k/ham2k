import * as React from "react"
import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/home"
import { AnalysisPage } from "./pages/analysis"
import { EntriesPage } from "./pages/entries"

export function ContentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contest/:logKey/entries" element={<EntriesPage />} />
      <Route path="/contest/:logKey" element={<AnalysisPage />} />
    </Routes>
  )
}
