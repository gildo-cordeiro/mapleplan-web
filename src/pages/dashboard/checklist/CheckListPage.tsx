"use client"

import { useState } from "react"
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { MasterChecklistHeader } from '@/components/checklist/MasterChecklistHeader'
import { ChecklistMasterList } from '@/components/checklist/ChecklistMasterList'
import { ChecklistStats } from '@/components/checklist/ChecklistStats'
import { CreateChecklistTaskModal } from '@/components/checklist/CreateChecklistTaskModal'
import { PriorityFilter } from '@/components/ui/PriorityFilter'
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { MASTER_CHECKLIST_DATA } from '@/data/checklistData'
import { PhaseNavigation } from "@/components/ui/PhaseNavigation"

export default function ChecklistPage() {
  const [activePhase, setActivePhase] = useState("pre-departure")
  const [filterResponsible, setFilterResponsible] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Get filtered items for stats calculation
  const phaseItems = MASTER_CHECKLIST_DATA[activePhase] || []
  const filteredItems = phaseItems.filter((item) => {
    if (filterResponsible !== "all" && item.responsible !== filterResponsible) {
      return false
    }
    if (filterPriority !== "all" && item.priority !== filterPriority) {
      return false
    }
    return true
  })

  const responsibleOptions = [
    { value: "all", label: "Todas as Tarefas", color: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700" },
    { value: "partner1", label: "Minhas Tarefas", color: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800" },
    { value: "partner2", label: "Tarefas do Parceiro", color: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800" },
    { value: "shared", label: "Compartilhadas", color: "bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800" },
    { value: "unassigned", label: "Não Atribuídas", color: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700" }
  ]

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 h-full px-6 py-8 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950/20">
        {/* Header */}
        <MasterChecklistHeader activePhase={activePhase} onPhaseChange={setActivePhase} />

        {/* Statistics Cards */}
        <ChecklistStats items={filteredItems} />

        <PhaseNavigation activePhase={activePhase} onPhaseChange={setActivePhase} />

        {/* Filters Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Filtrar por responsável</h3>
            <div className="flex flex-wrap gap-2">
              {responsibleOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filterResponsible === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterResponsible(option.value)}
                  className={`text-xs font-medium transition-all duration-200 border-0 ${
                    filterResponsible === option.value
                      ? "bg-gradient-to-r from-[var(--maple-primary)] to-[var(--maple-primary)]/90 text-white shadow-lg shadow-[var(--maple-primary)]/30 scale-105"
                      : `${option.color} text-foreground`
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <PriorityFilter value={filterPriority} onChange={setFilterPriority} />
        </div>

        {/* Checklist Items List */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-3">
            <ChecklistMasterList
              phase={activePhase}
              filterResponsible={filterResponsible}
              filterPriority={filterPriority}
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

        {/* Create Task Modal */}
        <CreateChecklistTaskModal isOpen={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      </div>
    </DashboardLayout>
  )
}
