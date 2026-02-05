"use client"

import { Flag, CheckCircle2, Circle, Loader } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useGoals } from "@/hooks/useGoals"
import { GoalStatus } from "@/types/goals"

export default function GoalsWidget() {
  const navigate = useNavigate()
  const { goals, loading, error } = useGoals()

  const getStatusBadge = (status: string) => {
    if (status === GoalStatus.COMPLETED) return "Concluído"
    if (status === GoalStatus.IN_PROGRESS) return "Em Andamento"
    return "Pendente"
  }

  const getStatusColor = (status: string) => {
    if (status === GoalStatus.COMPLETED) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    if (status === GoalStatus.IN_PROGRESS) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const getIcon = (status: string) => {
    if (status === GoalStatus.COMPLETED) return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
    return <Circle className="w-5 h-5 text-muted-foreground" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="w-5 h-5" />
          Metas
        </CardTitle>
        <CardDescription>Seus objetivos de alto nível</CardDescription>
      </CardHeader>
      <CardContent>
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
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  {getIcon(goal.status)}
                  <span
                    className={goal.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}
                  >
                    {goal.title}
                  </span>
                </div>
                <Badge className={getStatusColor(goal.status)}>{getStatusBadge(goal.status)}</Badge>
              </div>
            ))}
            {goals.length > 3 && (
              <div className="pt-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/dashboard/goals")}
                >
                  Ver mais ({goals.length - 3} {goals.length - 3 === 1 ? 'meta' : 'metas'})
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
