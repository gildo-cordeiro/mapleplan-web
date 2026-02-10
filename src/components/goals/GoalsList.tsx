"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { ChevronDown, ChevronUp, Edit2, Loader, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/Progress"
import { Goal, GoalsPriority, GoalStatus } from "@/types/goals"
import { goalService } from "@/services/goalService"
import { useAuth } from "@/app/context/AuthContext"
import { UpdateGoalModal } from "./UpdateGoalModal"

interface GoalsListProps {
  goals: Goal[]
  loading: boolean
  error: string | null
  onGoalUpdated?: () => void
}

const getStatusColor = (status: GoalStatus) => {
  if (status === GoalStatus.COMPLETED) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  if (status === GoalStatus.IN_PROGRESS) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
}

const getStatusLabel = (status: GoalStatus) => {
  if (status === GoalStatus.COMPLETED) return "Concluída"
  if (status === GoalStatus.IN_PROGRESS) return "Em Progresso"
  return "Pendente"
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

const getPriorityLabel = (priority: GoalsPriority) => {
  switch (priority) {
    case GoalsPriority.HIGH:
      return "Alta"
    case GoalsPriority.MEDIUM:
      return "Média"
    case GoalsPriority.LOW:
      return "Baixa"
    default:
      return priority
  }
}

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "Sem prazo"
  try {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  } catch {
    return "Data inválida"
  }
}

export function GoalsList({ goals, loading, error, filterPriority, onGoalUpdated }: GoalsListProps & { filterPriority: string, onGoalUpdated?: () => void }) {
  const { token } = useAuth()
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null)
  const [completedGoals, setCompletedGoals] = useState<string[]>([])
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedGoalId, setSelectedGoalId] = useState<string>("")

  const handleToggleComplete = async (goalId: string) => {

    try {
      if (!token) return
      await goalService.updateGoalStatus(token, goalId, completedGoals.includes(goalId) ? GoalStatus.IN_PROGRESS : GoalStatus.COMPLETED)
      setCompletedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]))
      onGoalUpdated?.()

    } catch (err) {
      console.error("Erro ao atualizar status da meta:", err)
    }
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
          <p className="ml-2 text-sm text-muted-foreground">Carregando metas...</p>
        </div>
      ) : error ? (
        <div className="text-sm text-red-600 dark:text-red-400 py-6 px-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
          ⚠️ Erro ao carregar metas: {error}
        </div>
      ) : goals.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-muted-foreground">Nenhuma meta criada nesta fase</p>
          <p className="text-xs text-muted-foreground mt-1">Clique no + para criar uma nova meta</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals
            .filter(goal => filterPriority === "all" || goal.priority === filterPriority)
            .map((goal) => (
              <Card key={goal.id} className="border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 shadow-md hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-0.5 group">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300 rounded-lg" />
                <CardContent className="p-5 relative z-10">
                  <div className="space-y-3">
                    {/* Goal Header with Title and Metadata */}
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={completedGoals.includes(goal.id) || goal.status === GoalStatus.COMPLETED}
                        onCheckedChange={() => handleToggleComplete(goal.id)}
                        className="mt-1 w-5 h-5 accent-[var(--maple-primary)]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-semibold text-foreground truncate ${completedGoals.includes(goal.id) || goal.status === GoalStatus.COMPLETED
                                ? "line-through text-muted-foreground"
                                : ""
                                }`}
                              title={goal.title}
                            >
                              {goal.title}
                            </h3>
                            {goal.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{goal.description}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
                            className="shrink-0"
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
                    <div className="flex items-center gap-3 sm:ml-7">
                      <div className="flex-1">
                        <Progress value={goal.progress} className="h-1.5" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">{goal.progress}%</span>
                    </div>

                    {/* Badges Row */}
                    <div className="flex flex-wrap gap-2 sm:ml-7">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(goal.status)}`}>
                        {getStatusLabel(goal.status)}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-slate-100 text-slate-700">
                        <span className={getPriorityColor(goal.priority)}>●</span>
                        <span className="ml-1">{getPriorityLabel(goal.priority)}</span>
                      </Badge>
                    </div>

                    {/* Expanded Details */}
                    {expandedGoal === goal.id && (
                      <div className="sm:ml-7 pt-3 border-t space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Responsável</p>
                            <p className="text-sm font-semibold text-foreground">{goal.assignedTo}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Prazo</p>
                            <p className="text-sm font-medium text-foreground">{formatDate(goal.dueDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Progresso</p>
                            <p className="text-sm font-medium text-foreground">{goal.progress}%</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent hover:bg-slate-100"
                            onClick={() => {
                              console.log("open modal", goal.id)
                              setIsUpdateModalOpen(true); setSelectedGoalId(goal.id)
                            }}>
                            <Edit2 className="w-3 h-3 mr-2" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs text-red-600 hover:text-red-600 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="w-3 h-3 mr-2" />
                            Deletar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          <UpdateGoalModal goalId={selectedGoalId} isOpen={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen} onUpdated={onGoalUpdated} />
        </div>
      )}
    </div>
  )
}
