import { useState } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Checkbox } from "@/components/ui/Checkbox"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
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

const getStatusColor = (isCompleted: boolean, isOverdue: boolean, isUpcoming: boolean) => {
  if (isCompleted) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  if (isOverdue) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  if (isUpcoming) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
}

export function ChecklistMasterItem({ item }: ChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCompleted, setIsCompleted] = useState(item.completed)

  const isOverdue = new Date(item.dueDate) < new Date() && !isCompleted
  const isUpcoming = new Date(item.dueDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000

  const statusLabel = isCompleted ? "Concluído" : isOverdue ? "Vencido" : isUpcoming ? "Prazo Próximo" : "Agendado"
  const priorityLabel = item.priority === "urgent" ? "Urgente" : "Normal"

  const partner = PARTNER_AVATARS[item.responsible]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300 rounded-lg" />
      <CardContent className="p-5 relative z-10">
        <div className="space-y-3">
          {/* Header with Checkbox and Title */}
          <div className="flex items-start gap-3">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={(checked) => setIsCompleted(checked as boolean)}
              className="mt-1 w-5 h-5 accent-[var(--maple-primary)]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-foreground truncate ${
                      isCompleted ? "line-through text-muted-foreground" : ""
                    }`}
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Vencimento: {formatDate(item.dueDate)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="shrink-0"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap gap-2 sm:ml-7">
            <Badge
              variant="outline"
              className={`text-xs ${getStatusColor(isCompleted, isOverdue, isUpcoming)}`}
            >
              {statusLabel}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
            >
              <span className={item.priority === "urgent" ? "text-red-600" : "text-green-600"}>●</span>
              <span className="ml-1">{priorityLabel}</span>
            </Badge>
            <div
              className={`${partner.color} rounded-full w-7 h-7 flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
              title={item.responsible}
            >
              {partner.initials}
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && item.description && (
            <div className="sm:ml-7 pt-3 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-foreground">{item.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
