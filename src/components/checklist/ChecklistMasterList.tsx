import { ChecklistMasterItem } from '@/components/checklist/ChecklistMasterItem'
import { MASTER_CHECKLIST_DATA } from '@/data/checklistData'

interface ChecklistMasterListProps {
  phase: string
  filterResponsible: string
  filterPriority: string
}

export function ChecklistMasterList({ phase, filterResponsible, filterPriority }: ChecklistMasterListProps) {
  const items = MASTER_CHECKLIST_DATA[phase] || []

  const filteredItems = items.filter((item) => {
    if (filterResponsible !== "all" && item.responsible !== filterResponsible) {
      return false
    }
    if (filterPriority !== "all" && item.priority !== filterPriority) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-3">
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 px-4 bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] border border-border rounded-lg shadow-md">
          <div className="text-5xl mb-3 opacity-50">✓</div>
          <p className="text-foreground font-semibold text-lg">Nenhuma tarefa encontrada</p>
          <p className="text-muted-foreground mt-2 text-sm">Nenhuma tarefa encontrada com os filtros selecionados</p>
          <p className="text-xs text-muted-foreground mt-2">Crie novas tarefas ou ajuste os filtros</p>
        </div>
      ) : (
        filteredItems.map((item) => <ChecklistMasterItem key={item.id} item={item} />)
      )}
    </div>
  )
}
