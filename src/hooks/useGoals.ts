import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { goalService } from '@/services/goalService'
import { Goal } from '@/types'

interface UseGoalsState {
  goals: Goal[]
  goalsWidget: Goal[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook para buscar metas do usuário
 */
export function useGoals(): UseGoalsState {
  const { token } = useAuth()
  const [goalsWidget, setGoalsWidget] = useState<Goal[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGoals()
  }, [token])

  const fetchGoals = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const dataWidget = await goalService.getWidgetGoals(token)
      const data = await goalService.getGoals(token)
      setGoals(data)
      setGoalsWidget(dataWidget)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar metas')
      console.error('Erro ao buscar metas:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchGoals()
  }

  return { goals, goalsWidget, loading, error, refetch }
}
