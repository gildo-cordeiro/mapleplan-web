import { useAuth } from "@/app/context/AuthContext"
import { Card, CardContent } from "@/components/ui/Card"
import { CheckCircle2, Clock, Target, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { goalService } from "@/services/goalService"

export function GoalsStats() {
  const { token } = useAuth()
  const [goalsStatusCounts, setGoalsStatusCounts] = useState({
    total: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await goalService.getGoalsStatusCounts(token)
        setGoalsStatusCounts(data)
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [token])
  
  const stats = [
    {
      label: "Metas Totais",
      value: goalsStatusCounts.total.toString(),
      icon: Target,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "A Iniciar",
      value: goalsStatusCounts.notStarted.toString(),
      icon: Clock,
      color: "bg-red-100 text-red-600",
    },
    {
      label: "Em Progresso",
      value: goalsStatusCounts.inProgress.toString(),
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Concluídas",
      value: goalsStatusCounts.completed.toString(),
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    }
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
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {loading ? '-' : stat.value}
                  </p>
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
