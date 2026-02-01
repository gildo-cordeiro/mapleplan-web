"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { GoalsHeader } from "@/components/goals/goals-header"
import { GoalsStats } from "@/components/goals/goals-stats"
import { GoalsPhaseNavigation } from "@/components/goals/goals-phase-navigation"
import { GoalsList } from "@/components/goals/goals-list"
import { CreateGoalModal } from "@/components/goals/create-goal-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function GoalsPage() {
  const [activePhase, setActivePhase] = useState("pre-departure")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 h-full p-6">
        {/* Header */}
        <GoalsHeader />

        {/* Statistics Cards */}
        <GoalsStats />

        {/* Phase Navigation */}
        <GoalsPhaseNavigation activePhase={activePhase} onPhaseChange={setActivePhase} />

        {/* Goals List */}
        <div className="flex-1 overflow-y-auto">
          <GoalsList phase={activePhase} />
        </div>

        {/* Floating Action Button (Mobile) */}
        <div className="md:hidden fixed bottom-24 right-4">
          <Button
            size="lg"
            className="rounded-full shadow-lg w-14 h-14 flex items-center justify-center bg-[var(--maple-primary)] hover:bg-[var(--maple-dark)]"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Create Goal Modal */}
        <CreateGoalModal isOpen={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      </div>
    </DashboardLayout>
  )
}
