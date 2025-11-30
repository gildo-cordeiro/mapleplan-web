import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface ChecklistFiltersToolbarProps {
  filterResponsible: string
  onResponsibleChange: (value: string) => void
  filterPriority: string
  onPriorityChange: (value: string) => void
  onAddNew: () => void
}

export function ChecklistFiltersToolbar({
  filterResponsible,
  onResponsibleChange,
  filterPriority,
  onPriorityChange,
  onAddNew,
}: ChecklistFiltersToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between p-4 bg-card border border-border rounded-lg">
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <Select value={filterResponsible} onValueChange={onResponsibleChange}>
          <SelectTrigger className="w-full md:w-48 bg-background">
            <SelectValue placeholder="Filtrar por responsável" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as tarefas</SelectItem>
            <SelectItem value="mine">Minhas Tarefas</SelectItem>
            <SelectItem value="partner1">Tarefas do Parceiro 1</SelectItem>
            <SelectItem value="partner2">Tarefas do Parceiro 2</SelectItem>
            <SelectItem value="unassigned">Não Atribuídas</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={onPriorityChange}>
          <SelectTrigger className="w-full md:w-40 bg-background">
            <SelectValue placeholder="Filtrar por prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onAddNew}
        className="hidden md:flex w-full md:w-auto gap-2 bg-[#dc143c] hover:bg-[#8b4513] text-white"
      >
        <Plus className="w-4 h-4" />
        Nova Tarefa
      </Button>
    </div>
  )
}
