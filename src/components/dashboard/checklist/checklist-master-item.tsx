import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ChecklistItemProps {
  item: {
    id: string
    title: string
    completed: boolean
    responsible: "partner1" | "partner2" | "shared" | "unassigned"
    priority: "urgent" | "normal"
    dueDate: string
    description?: string
  }
}

const PARTNER_AVATARS: Record<string, { initials: string; color: string }> = {
  partner1: { initials: "P1", color: "bg-[#dc143c]" },
  partner2: { initials: "P2", color: "bg-[#ffd700]" },
  shared: { initials: "SH", color: "bg-[#8b4513]" },
}

export function ChecklistMasterItem({ item }: ChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCompleted, setIsCompleted] = useState(item.completed)

  const isOverdue = new Date(item.dueDate) < new Date() && !isCompleted
  const isUpcoming = new Date(item.dueDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000

  const statusColor = isCompleted
    ? "bg-green-100 text-green-800"
    : isOverdue
      ? "bg-red-100 text-red-800"
      : isUpcoming
        ? "bg-yellow-100 text-yellow-800"
        : "bg-blue-100 text-blue-800"

  const statusLabel = isCompleted ? "Concluído" : isOverdue ? "Vencido" : isUpcoming ? "Prazo Próximo" : "Agendado"

  const partner = PARTNER_AVATARS[item.responsible]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden transition-all hover:shadow-md">
      <div className="flex items-center gap-4 p-4 bg-card hover:bg-secondary/50 transition-colors">
        {/* Checkbox */}
        <Checkbox
          checked={isCompleted}
          onCheckedChange={(checked) => setIsCompleted(checked as boolean)}
          className="w-6 h-6"
        />

        {/* Task title and details */}
        <div className="flex-1">
          <h3
            className={`font-semibold text-sm ${isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}
          >
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Vencimento: {formatDate(item.dueDate)}</p>
        </div>

        {/* Partner Avatar Badge */}
        <div
          className={`${partner.color} rounded-full w-8 h-8 flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
        >
          {partner.initials}
        </div>

        {/* Status Badge */}
        <Badge className={`${statusColor} flex-shrink-0`}>{statusLabel}</Badge>

        {/* Expand button */}
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="flex-shrink-0">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {/* Expanded content */}
      {isExpanded && item.description && (
        <div className="px-4 py-3 bg-secondary/30 border-t border-border">
          <p className="text-sm text-foreground">{item.description}</p>
        </div>
      )}
    </div>
  )
}
