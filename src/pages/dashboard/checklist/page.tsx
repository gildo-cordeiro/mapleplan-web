import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MasterChecklistHeader } from "@/components/checklist/master-checklist-header"
import { ChecklistFiltersToolbar } from "@/components/checklist/checklist-filters-toolbar"
import { ChecklistMasterList } from "@/components/checklist/checklist-master-list"
import { CreateChecklistTaskModal } from "@/components/checklist/create-checklist-task-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ChecklistPage() {
  const [activePhase, setActivePhase] = useState("pre-departure")
  const [filterResponsible, setFilterResponsible] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 h-full">
        {/* Header with phase tabs */}
        <MasterChecklistHeader activePhase={activePhase} onPhaseChange={setActivePhase} />

        {/* Filters toolbar */}
        <ChecklistFiltersToolbar
          filterResponsible={filterResponsible}
          onResponsibleChange={setFilterResponsible}
          filterPriority={filterPriority}
          onPriorityChange={setFilterPriority}
          onAddNew={() => setIsCreateModalOpen(true)}
        />

        {/* Checklist items list */}
        <div className="flex-1 overflow-y-auto pr-4">
          <ChecklistMasterList
            phase={activePhase}
            filterResponsible={filterResponsible}
            filterPriority={filterPriority}
          />
        </div>

        {/* Floating Action Button (Mobile) */}
        <div className="md:hidden fixed bottom-24 right-4">
          <Button
            size="lg"
            className="rounded-full shadow-lg w-14 h-14 flex items-center justify-center bg-[#dc143c] hover:bg-[#8b4513]"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Create Task Modal */}
        <CreateChecklistTaskModal isOpen={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      </div>
    </DashboardLayout>
  )
}
