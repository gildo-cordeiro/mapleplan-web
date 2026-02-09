import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
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
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between p-4 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <Select value={filterResponsible} onValueChange={onResponsibleChange}>
          <SelectTrigger className="w-full md:w-48 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-[var(--maple-primary)]/30 transition-colors duration-300">
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
          <SelectTrigger className="w-full md:w-40 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-[var(--maple-primary)]/30 transition-colors duration-300">
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
        className="hidden md:flex w-full md:w-auto gap-2 bg-gradient-to-r from-[var(--maple-primary)] to-[var(--maple-primary)]/80 hover:from-[var(--maple-primary)]/90 hover:to-[var(--maple-dark)] text-white shadow-md hover:shadow-lg hover:shadow-[var(--maple-primary)]/30 transition-all duration-300 font-semibold rounded-lg"
      >
        <Plus className="w-4 h-4" />
        Nova Tarefa
      </Button>
    </div>
  )
}
