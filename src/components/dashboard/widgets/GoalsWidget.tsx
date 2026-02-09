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
  const { goalsWidget, loading, error } = useGoals()

  const getStatusBadge = (status: GoalStatus) => {
    if (status === GoalStatus.COMPLETED) return "Concluído"
    if (status === GoalStatus.IN_PROGRESS) return "Em Andamento"
    return "Não Iniciado"
  }

  const getStatusColor = (status: GoalStatus) => {
    if (status === GoalStatus.COMPLETED) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    if (status === GoalStatus.IN_PROGRESS) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const getIcon = (status: GoalStatus) => {
    if (status === GoalStatus.COMPLETED) return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
    return <Circle className="w-5 h-5 text-muted-foreground" />
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300" />
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-[var(--maple-primary)]" />
          Metas
        </CardTitle>
        <CardDescription>Seus objetivos de alto nível</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
            <p className="ml-2 text-sm text-muted-foreground">Carregando metas...</p>
          </div>
        ) : error ? (
          <div className="text-sm text-red-600 dark:text-red-400 py-4">
            Erro ao carregar metas: {error}
          </div>
        ) : goalsWidget.length === 0 ? (
          <div className="text-sm text-muted-foreground py-4 text-center">
            Nenhuma meta criada
            <div className="pt-3">
              <Button
                variant="outline"
                className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                onClick={() => navigate("/dashboard/goals")}
              >
                Criar Meta
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {goalsWidget.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 border border-slate-200/50 dark:border-slate-600/30 hover:border-[var(--maple-primary)]/30"
              >
                <div className="flex items-center gap-3 flex-1">
                  {getIcon(goal.status)}
                  <div className="flex-1">
                    <span
                      className={goal.status === GoalStatus.COMPLETED ? "line-through text-muted-foreground" : "text-foreground font-medium"}
                    >
                      {goal.title}
                    </span>
                    {goal.assignedTo && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Atribuído a: {goal.assignedTo}
                      </p>
                    )}
                  </div>
                </div>
                <Badge className={`${getStatusColor(goal.status)} font-semibold px-3 py-1`}>{getStatusBadge(goal.status)}</Badge>
              </div>
            ))}
            <div className="pt-3\">
              <Button
                variant="outline"
                className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                onClick={() => navigate("/dashboard/goals")}
              >
                Ver mais
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
