import { useAuth } from "@/app/context/AuthContext"
import { Card, CardContent } from "@/components/ui/Card"
import { CheckCircle2, Clock, Target, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { goalService } from "@/services/goalService"
import { GoalsStatusCounts } from "@/types/goals"

interface GoalsStatsProps {
  refetchTrigger?: number
}

export function GoalsStats({ refetchTrigger = 0 }: GoalsStatsProps) {
  const { token } = useAuth()
  const [goalsStatusCounts, setGoalsStatusCounts] = useState<GoalsStatusCounts>({
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
  }, [token, refetchTrigger])
  
  const stats = [
    {
      label: "Metas Totais",
      value: goalsStatusCounts.total.toString(),
      icon: Target,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-[var(--surface-1)] to-[var(--surface-2)]",
    },
    {
      label: "Pendente",
      value: goalsStatusCounts.notStarted.toString(),
      icon: Clock,
      gradient: "from-gray-500 to-gray-600",
      bgGradient: "from-[var(--surface-1)] to-[var(--surface-2)]",
    },
    {
      label: "Em Progresso",
      value: goalsStatusCounts.inProgress.toString(),
      icon: TrendingUp,
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-[var(--surface-1)] to-[var(--surface-2)]",
    },
    {
      label: "Concluídas",
      value: goalsStatusCounts.completed.toString(),
      icon: CheckCircle2,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-[var(--surface-1)] to-[var(--surface-2)]",
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
                    {loading ? '-' : stat.value}
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
