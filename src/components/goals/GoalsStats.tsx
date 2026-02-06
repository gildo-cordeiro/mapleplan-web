import { Card, CardContent } from "@/components/ui/Card"
import { CheckCircle2, Clock, Target, TrendingUp } from "lucide-react"

export function GoalsStats() {
  const stats = [
    {
      label: "Metas Totais",
      value: "12",
      icon: Target,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Concluídas",
      value: "7",
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Em Progresso",
      value: "4",
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Próximas",
      value: "1",
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
