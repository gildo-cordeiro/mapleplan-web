import { Card, CardContent } from "@/components/ui/Card"
import { CheckCircle2, Clock, ListTodo, TrendingUp } from "lucide-react"

interface ChecklistTask {
  id: string
  title: string
  completed: boolean
  responsible: "partner1" | "partner2" | "shared" | "unassigned"
  priority: "urgent" | "normal"
  dueDate: string
  description?: string
}

interface ChecklistStatsProps {
  items: ChecklistTask[]
}

export function ChecklistStats({ items }: ChecklistStatsProps) {
  const total = items.length
  const completed = items.filter(item => item.completed).length
  const pending = total - completed
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

  const stats = [
    {
      label: "Total de Tarefas",
      value: total.toString(),
      icon: ListTodo,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
    },
    {
      label: "Pendentes",
      value: pending.toString(),
      icon: Clock,
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900",
    },
    {
      label: "Concluídas",
      value: completed.toString(),
      icon: CheckCircle2,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
    },
    {
      label: "Progresso",
      value: `${completionPercentage}%`,
      icon: TrendingUp,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900",
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className={`border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${stat.bgGradient}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mt-3`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
