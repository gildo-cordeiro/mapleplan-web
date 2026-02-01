import { useState } from "react"
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import NextActionsWidget from '@/components/dashboard/widgets/NextActionsWidget'
import FinancialAlertWidget from '@/components/dashboard/widgets/FinancialAlertWidget'
import DocumentAlertWidget from '@/components/dashboard/widgets/DocumentAlertWidget'
import GoalsWidget from '@/components/dashboard/widgets/GoalsWidget'

export default function DashboardPage() {
  const [coupleNames] = useState({ partner1: "Gildo", partner2: "Jenny" })
  const [progress] = useState({
    currentPhase: "Fase 1: Pré-Partida",
    percentage: 0,
  })

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <DashboardHeader couple={coupleNames} progress={progress} />

        <div className="px-4 py-8 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <NextActionsWidget />
              <GoalsWidget />
            </div>

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
