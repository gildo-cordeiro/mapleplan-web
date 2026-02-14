"use client"

import { useState } from "react"
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { GoalsHeader } from '@/components/goals/GoalsHeader'
import { GoalsStats } from '@/components/goals/GoalsStats'
import { PhaseNavigation } from '@/components/ui/PhaseNavigation'
import { GoalsList } from '@/components/goals/GoalsList'
import { CreateGoalModal } from '@/components/goals/CreateGoalModal'
import { Button } from "@/components/ui/Button"
import { Plus, Filter } from "lucide-react"
import { useGoals } from "@/hooks/useGoals"
import { GoalStatus, GoalsPriority } from "@/types/goals"
import { PriorityFilter } from "@/components/ui/PriorityFilter"

export default function GoalsPage() {
  const [activePhase, setActivePhase] = useState("pre-departure")
  const [activeStatus, setActiveStatus] = useState<GoalStatus | "all">("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [statsTrigger, setStatsTrigger] = useState(0)
  const [filterPriority, setFilterPriority] = useState<GoalsPriority | "all">("all")
  const { goals, loading, error, refetch } = useGoals()

  const handleGoalCreated = () => {
    refetch()
    setStatsTrigger(prev => prev + 1)
  }

  const filteredGoals = goals.filter(goal => {
    const phaseMatch = goal.phase === activePhase
    const statusMatch = activeStatus === "all" || goal.status === activeStatus
    const priorityMatch = filterPriority === "all" || goal.priority === filterPriority
    return phaseMatch && statusMatch && priorityMatch
  })

  const priorityOptions = [
    { value: "all", label: "Todas", color: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700" },
    { value: GoalsPriority.HIGH, label: "Alta", color: "bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800", activeColor: "from-red-600 to-red-700" },
    { value: GoalsPriority.MEDIUM, label: "Média", color: "bg-amber-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800", activeColor: "from-amber-600 to-amber-700" },
    { value: GoalsPriority.LOW, label: "Baixa", color: "bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800", activeColor: "from-green-600 to-green-700" }
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 h-full px-6 py-8 bg-gradient-to-br from-[var(--app-bg-1)] via-[var(--app-bg-2)] to-[var(--app-bg-3)]">
        {/* Header */}
        <GoalsHeader />

        {/* Statistics Cards */}
        <GoalsStats refetchTrigger={statsTrigger} />

        {/* Filters Section */}
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Filtrar por</h3>
            <div className="space-y-4">
              {/* Phase Navigation */}
              <PhaseNavigation activePhase={activePhase} onPhaseChange={setActivePhase} />

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Todos", color: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700" },
                  { value: GoalStatus.NOT_STARTED, label: "Pendente", color: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700" },
                  { value: GoalStatus.IN_PROGRESS, label: "Em Progresso", color: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800" },
                  { value: GoalStatus.COMPLETED, label: "Concluída", color: "bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800" }
                ].map((status) => (
                  <Button
                    key={status.value}
                    variant={activeStatus === status.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveStatus(status.value as any)}
                    className={`text-xs font-medium transition-all duration-200 border-0 ${activeStatus === status.value
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50 scale-105"
                      : `${status.color} text-foreground`
                      }`}
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
              <PriorityFilter
                value={filterPriority}
                onChange={(value) => setFilterPriority(value as GoalsPriority | "all")}
                options={priorityOptions}
              />
            </div>
          </div>
        </div>

        {/* Goals List */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-3">
            <GoalsList
              goals={filteredGoals}
              loading={loading}
              error={error}
              onGoalUpdated={() => {
                refetch()
                setStatsTrigger(prev => prev + 1)
              }} filterPriority={filterPriority}
            />
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40">
          <Button
            size="lg"
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-full shadow-2xl w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/90 hover:shadow-2xl hover:shadow-[var(--maple-primary)]/40 hover:scale-110 active:scale-95 transition-all duration-300 text-white"
          >
            <Plus className="w-7 h-7" />
          </Button>
        </div>

        {/* Create Goal Modal */}
        <CreateGoalModal isOpen={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} onCreated={handleGoalCreated} />
      </div>
    </DashboardLayout>
  )
}
