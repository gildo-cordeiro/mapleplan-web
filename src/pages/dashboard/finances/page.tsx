"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import FinancesHeader from "@/components/finances/finances-header"
import FinancesSummary from "@/components/finances/finances-summary"
import BudgetWidget from "@/components/finances/budget-widget"
import ExpenseBreakdown from "@/components/finances/expense-breakdown"
import FundsSources from "@/components/finances/funds-sources"
import FinancialTimeline from "@/components/finances/financial-timeline"

export default function FinancesPage() {
  const [coupleNames] = useState({ partner1: "João", partner2: "Maria" })

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <FinancesHeader couple={coupleNames} />

        <div className="px-4 py-8 md:px-6 lg:px-8">
          {/* Summary Cards */}
          <FinancesSummary />

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3 mt-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              <BudgetWidget />
              <ExpenseBreakdown />
              <FinancialTimeline />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <FundsSources />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
