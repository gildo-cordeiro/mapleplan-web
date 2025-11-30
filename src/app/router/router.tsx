import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "@/pages/login/page"
import DashboardPage from "@/pages/dashboard/page"
import ChecklistPage from "@/pages/dashboard/checklist/page"
import FinancesPage from "@/pages/dashboard/finances/page"
import DocumentsPage from "@/pages/dashboard/documents/page"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/checklists" element={<ChecklistPage />} />
        <Route path="/dashboard/documents" element={<DocumentsPage />} />
        <Route path="/dashboard/finances" element={<FinancesPage />} />
        <Route path="/dashboard/goals" element={<div>Metas Page</div>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
