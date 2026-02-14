"use client"

import { Calendar, User, ArrowRight, Loader } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useNextActions } from "@/hooks/useNextActions"

interface Task {
  id: string
  title: string
  dueDate: string
  assignedTo: "partner1" | "partner2" | "both"
  priority: "high" | "medium" | "low"
}

export default function NextActionsWidget() {
  const { tasks, loading, error } = useNextActions()

  const getPartnerBadge = (assignedTo: string) => {
    if (assignedTo === "both") return "Ambos"
    if (assignedTo === "partner1") return "João"
    return "Maria"
  }

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    if (priority === "medium") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300" />
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2">Próximas Ações</CardTitle>
        <CardDescription>Tarefas prioritárias para sua jornada</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
            <p className="ml-2 text-sm text-muted-foreground">Carregando tarefas...</p>
          </div>
        ) : error ? (
          <div className="text-sm text-red-600 dark:text-red-400 py-4">
            Erro ao carregar tarefas: {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-sm text-muted-foreground py-4 text-center">
            Nenhuma tarefa pendente
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 border border-slate-200/50 dark:border-slate-600/30 hover:border-[var(--maple-primary)]/30"
              >
                <div className="flex-1 space-y-2">
                  <p className="font-semibold text-foreground">{task.title}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="gap-1 font-semibold px-3 py-1">
                      <User className="w-3 h-3" />
                      {getPartnerBadge(task.assignedTo)}
                    </Badge>
                    <Badge variant="outline" className="gap-1 font-semibold px-3 py-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                    </Badge>
                    <Badge className={`${getPriorityColor(task.priority)} font-semibold px-3 py-1`}>
                      {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button variant="outline" className="w-full mt-4 gap-2 bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
          Ver Checklist Completo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
