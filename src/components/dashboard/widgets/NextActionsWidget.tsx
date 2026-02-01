"use client"

import { Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

interface Task {
  id: string
  title: string
  dueDate: string
  assignedTo: "partner1" | "partner2" | "both"
  priority: "high" | "medium" | "low"
}

export default function NextActionsWidget() {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Preparar documentos de passaporte",
      dueDate: "2025-12-15",
      assignedTo: "both",
      priority: "high",
    },
    {
      id: "2",
      title: "Solicitar cartas de referência profissional",
      dueDate: "2025-12-20",
      assignedTo: "partner1",
      priority: "high",
    },
    {
      id: "3",
      title: "Agendar exame médico de imigração",
      dueDate: "2026-01-05",
      assignedTo: "partner2",
      priority: "medium",
    },
  ]

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
    <Card>
      <CardHeader>
        <CardTitle>A Fazer Agora</CardTitle>
        <CardDescription>Tarefas prioritárias para sua jornada</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <div className="flex-1 space-y-2">
                <p className="font-medium text-foreground">{task.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="gap-1">
                    <User className="w-3 h-3" />
                    {getPartnerBadge(task.assignedTo)}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                  </Badge>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 gap-2 bg-transparent">
          Ver Checklist Completo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
