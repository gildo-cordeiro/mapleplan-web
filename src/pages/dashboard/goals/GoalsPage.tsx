"use client"

import { useState } from "react"
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { GoalsHeader } from '@/components/goals/GoalsHeader'
import { GoalsStats } from '@/components/goals/GoalsStats'
import { GoalsPhaseNavigation } from '@/components/goals/GoalsPhaseNavigation'
import { GoalsList } from '@/components/goals/GoalsList'
import { CreateGoalModal } from '@/components/goals/CreateGoalModal'
import { Button } from "@/components/ui/Button"
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
        <div className="fixed bottom-24 right-4">
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
