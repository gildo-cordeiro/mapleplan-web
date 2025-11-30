import { useState } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import NextActionsWidget from "@/components/dashboard/widgets/next-actions-widget"
import FinancialAlertWidget from "@/components/dashboard/widgets/financial-alert-widget"
import DocumentAlertWidget from "@/components/dashboard/widgets/document-alert-widget"
import GoalsWidget from "@/components/dashboard/widgets/goals-widget"

export default function DashboardPage() {
  const [coupleNames] = useState({ partner1: "João", partner2: "Maria" })
  const [progress] = useState({
    currentPhase: "Fase 1: Pré-Partida",
    percentage: 25,
  })

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <DashboardHeader couple={coupleNames} progress={progress} />

        <div className="px-4 py-8 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left column - full height */}
            <div className="lg:col-span-2 space-y-6">
              <NextActionsWidget />
              <GoalsWidget />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <FinancialAlertWidget />
              <DocumentAlertWidget />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
