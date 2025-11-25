"use client"

import { Flag, CheckCircle2, Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Goal {
  id: string
  title: string
  status: "completed" | "in-progress" | "pending"
}

export default function GoalsWidget() {
  const goals: Goal[] = [
    {
      id: "1",
      title: "Obter a Carta de Aceitação",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Passar no Teste de Língua Inglesa",
      status: "completed",
    },
    {
      id: "3",
      title: "Solicitar Permissão de Trabalho Aberto",
      status: "pending",
    },
  ]

  const getStatusBadge = (status: string) => {
    if (status === "completed") return "Concluído"
    if (status === "in-progress") return "Em Andamento"
    return "Pendente"
  }

  const getStatusColor = (status: string) => {
    if (status === "completed") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    if (status === "in-progress") return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const getIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
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
        </div>
      </CardContent>
    </Card>
  )
}
