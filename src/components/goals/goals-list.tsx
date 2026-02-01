"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, Edit2, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface GoalsListProps {
  phase: string
}

interface Goal {
  id: string
  title: string
  description: string
  progress: number
  status: "completed" | "in-progress" | "pending"
  assignedTo: "partner1" | "partner2" | "both"
  dueDate: string
  priority: "low" | "medium" | "high"
}

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Passar no IELTS com mínimo 6.5",
    description: "Obter a certificação de proficiência em inglês",
    progress: 85,
    status: "in-progress",
    assignedTo: "partner1",
    dueDate: "2025-03-15",
    priority: "high",
  },
  {
    id: "2",
    title: "Acumular CAD $50.000",
    description: "Atingir o valor mínimo de fundos demonstráveis",
    progress: 60,
    status: "in-progress",
    assignedTo: "both",
    dueDate: "2025-06-01",
    priority: "high",
  },
  {
    id: "3",
    title: "Completar avaliação de créditos",
    description: "Avaliar diplomas anteriores com órgão canadense",
    progress: 40,
    status: "pending",
    assignedTo: "partner2",
    dueDate: "2025-04-20",
    priority: "medium",
  },
  {
    id: "4",
    title: "Obter histórico de trabalho",
    description: "Coletar cartas de referência e documentação",
    progress: 100,
    status: "completed",
    assignedTo: "partner1",
    dueDate: "2025-01-30",
    priority: "high",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700"
    case "in-progress":
      return "bg-[var(--maple-primary)] bg-opacity-10 text-[var(--maple-primary)]"
    case "pending":
      return "bg-amber-100 text-amber-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-600"
    case "medium":
      return "text-amber-600"
    case "low":
      return "text-green-600"
    default:
      return "text-gray-600"
  }
}

const getPartnerInitial = (assignedTo: string) => {
  if (assignedTo === "partner1") return "P1"
  if (assignedTo === "partner2") return "P2"
  return "C"
}

export function GoalsList({ phase }: GoalsListProps) {
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null)
  const [completedGoals, setCompletedGoals] = useState<string[]>([])

  const handleToggleComplete = (goalId: string) => {
    setCompletedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]))
  }

  return (
    <div className="space-y-4">
      {mockGoals.map((goal) => (
        <Card key={goal.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Goal Header */}
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={completedGoals.includes(goal.id) || goal.status === "completed"}
                  onCheckedChange={() => handleToggleComplete(goal.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-foreground ${
                          completedGoals.includes(goal.id) || goal.status === "completed"
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {goal.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
                    >
                      {expandedGoal === goal.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 md:ml-10">
                <div className="flex-1">
                  <Progress value={goal.progress} className="h-2" />
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{goal.progress}%</span>
              </div>

              {/* Goal Metadata */}
              <div className="flex flex-wrap gap-2 md:ml-10">
                <Badge variant="outline" className={getStatusColor(goal.status)}>
                  {goal.status === "completed"
                    ? "Concluída"
                    : goal.status === "in-progress"
                      ? "Em Progresso"
                      : "Pendente"}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-700">
                  <span className={getPriorityColor(goal.priority)}>●</span>
                  <span className="ml-1">
                    {goal.priority === "high" ? "Alta" : goal.priority === "medium" ? "Média" : "Baixa"}
                  </span>
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-700">
                  📅 {new Date(goal.dueDate).toLocaleDateString("pt-BR")}
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">
                  <Avatar className="w-4 h-4 mr-1">
                    <AvatarFallback className="text-xs">{getPartnerInitial(goal.assignedTo)}</AvatarFallback>
                  </Avatar>
                  {goal.assignedTo === "both" ? "Ambos" : getPartnerInitial(goal.assignedTo)}
                </Badge>
              </div>

              {/* Expanded Details */}
              {expandedGoal === goal.id && (
                <div className="md:ml-10 pt-4 border-t space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Responsável</p>
                      <p className="text-sm font-medium text-foreground mt-1">
                        {goal.assignedTo === "both"
                          ? "Ambos os parceiros"
                          : goal.assignedTo === "partner1"
                            ? "Parceiro 1"
                            : "Parceiro 2"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Prazo</p>
                      <p className="text-sm font-medium text-foreground mt-1">
                        {new Date(goal.dueDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Deletar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
