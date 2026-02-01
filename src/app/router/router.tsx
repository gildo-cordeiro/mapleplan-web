import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "@/pages/login/LoginPage"
import DashboardPage from "@/pages/dashboard/DashboardPage"
import ChecklistPage from "@/pages/dashboard/checklist/CheckListPage"
import FinancesPage from "@/pages/dashboard/finances/FinancePage"
import DocumentsPage from "@/pages/dashboard/documents/DocumentsPage"
import GoalsPage from "@/pages/dashboard/goals/GoalsPage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/checklists" element={<ChecklistPage />} />
        <Route path="/dashboard/documents" element={<DocumentsPage />} />
        <Route path="/dashboard/finances" element={<FinancesPage />} />
        <Route path="/dashboard/goals" element={<GoalsPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
