import { ChecklistMasterItem } from '@/components/checklist/ChecklistMasterItem'

interface ChecklistMasterListProps {
  phase: string
  filterResponsible: string
  filterPriority: string
}

// Mock data for master checklist items
const MASTER_CHECKLIST_DATA: Record<
  string,
  Array<{
    id: string
    title: string
    completed: boolean
    responsible: "partner1" | "partner2" | "shared" | "unassigned"
    priority: "urgent" | "normal"
    dueDate: string
    description?: string
  }>
> = {
  "pre-departure": [
    {
      id: "1",
      title: "Obter Laudo Médico para Visto",
      completed: false,
      responsible: "partner1",
      priority: "urgent",
      dueDate: "2025-12-15",
      description: "Exame médico com médico aprovado pela IRCC",
    },
    {
      id: "2",
      title: "Solicitar Cartas de Emprego",
      completed: false,
      responsible: "partner2",
      priority: "urgent",
      dueDate: "2025-12-10",
      description: "Cartas referência dos últimos 3 empregos",
    },
    {
      id: "3",
      title: "Preparar Documentos Financeiros",
      completed: true,
      responsible: "partner1",
      priority: "normal",
      dueDate: "2025-11-30",
      description: "Extratos bancários últimos 6 meses",
    },
    {
      id: "4",
      title: "Registrar Passaporte Eletrônico",
      completed: false,
      responsible: "partner2",
      priority: "urgent",
      dueDate: "2025-12-20",
      description: "Requerer novo passaporte com validade de 10 anos",
    },
    {
      id: "5",
      title: "Traduzir Diplomas Oficialmente",
      completed: false,
      responsible: "shared",
      priority: "normal",
      dueDate: "2026-01-05",
      description: "Tradução juramentada de todos os diplomas",
    },
  ],
  arrival: [
    {
      id: "6",
      title: "Abrir Conta Bancária Canadense",
      completed: false,
      responsible: "partner1",
      priority: "urgent",
      dueDate: "2026-02-15",
      description: "Abrir conta em banco local com SIN",
    },
    {
      id: "7",
      title: "Obter Número de Seguro Social (SIN)",
      completed: false,
      responsible: "partner2",
      priority: "urgent",
      dueDate: "2026-02-10",
      description: "Aplicar para SIN no Service Canada",
    },
    {
      id: "8",
      title: "Registrar-se para Saúde Provincial",
      completed: false,
      responsible: "partner1",
      priority: "normal",
      dueDate: "2026-02-28",
      description: "Registrar ambos os parceiros para healthcare",
    },
  ],
  adaptation: [
    {
      id: "9",
      title: "Buscar Emprego na Área",
      completed: false,
      responsible: "partner1",
      priority: "normal",
      dueDate: "2026-04-01",
      description: "Procurar posições em seu campo profissional",
    },
    {
      id: "10",
      title: "Encontrar Moradia Permanente",
      completed: false,
      responsible: "shared",
      priority: "normal",
      dueDate: "2026-03-15",
      description: "Procurar casa ou apartamento para alugar/comprar",
    },
  ],
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
    <div className="space-y-2">
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma tarefa encontrada com os filtros selecionados</p>
        </div>
      ) : (
        filteredItems.map((item) => <ChecklistMasterItem key={item.id} item={item} />)
      )}
    </div>
  )
}
