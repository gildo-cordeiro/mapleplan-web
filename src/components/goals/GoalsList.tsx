"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { ChevronDown, ChevronUp, Edit2, Loader, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/Progress"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Goal, GoalsPriority, GoalStatus } from "@/types/goals"

interface GoalsListProps {
  goals: Goal[]
  loading: boolean
  error: string | null
}

const getStatusColor = (status: GoalStatus) => {
  if (status === GoalStatus.COMPLETED) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  if (status === GoalStatus.IN_PROGRESS) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
}

const getPriorityColor = (priority: GoalsPriority) => {
  switch (priority) {
    case GoalsPriority.HIGH:
      return "text-red-600"
    case GoalsPriority.MEDIUM:
      return "text-amber-600"
    case GoalsPriority.LOW:
      return "text-green-600"
    default:
      return "text-gray-600"
  }
}

export function GoalsList({ goals, loading, error }: GoalsListProps) {
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null)
  const [completedGoals, setCompletedGoals] = useState<string[]>([])

  const handleToggleComplete = (goalId: string) => {
    setCompletedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]))
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
          <p className="ml-2 text-sm text-muted-foreground">Carregando metas...</p>
        </div>
      ) : error ? (
        <div className="text-sm text-red-600 dark:text-red-400 py-4">
          Erro ao carregar metas: {error}
        </div>
      ) : goals.length === 0 ? (
        <div className="text-sm text-muted-foreground py-4 text-center">
          Nenhuma meta criada
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Goal Header */}
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={completedGoals.includes(goal.id) || goal.status === GoalStatus.COMPLETED}
                      onCheckedChange={() => handleToggleComplete(goal.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-foreground ${completedGoals.includes(goal.id) || goal.status === GoalStatus.COMPLETED
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
                      {goal.status === GoalStatus.COMPLETED
                        ? "Concluída"
                        : goal.status === GoalStatus.IN_PROGRESS
                          ? "Em Progresso"
                          : "Pendente"}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      <span className={getPriorityColor(goal.priority)}>●</span>
                      <span className="ml-1">
                        {goal.priority === GoalsPriority.HIGH ? "Alta" : goal.priority === GoalsPriority.MEDIUM ? "Média" : "Baixa"}
                      </span>
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                      📅 {new Date(goal.dueDate).toLocaleDateString("pt-BR")}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      <Avatar className="w-4 h-4 mr-1">
                        <AvatarFallback className="text-xs">{goal.assignedTo}</AvatarFallback>
                      </Avatar>
                      {goal.assignedTo === "both" ? "Ambos" : goal.assignedTo}
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
      )}
    </div>
  )
}
