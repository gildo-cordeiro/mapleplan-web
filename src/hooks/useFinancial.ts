import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { financialService } from '@/services/financialService'
import { BudgetData } from '@/types'

interface UseFinancialState {
  budget: BudgetData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook para buscar dados financeiros do usuário
 */
export function useFinancial(): UseFinancialState {
  const { token } = useAuth()
  const [budget, setBudget] = useState<BudgetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBudget()
  }, [token])

  const fetchBudget = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await financialService.getBudget(token)
      setBudget(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar dados financeiros')
      console.error('Erro ao buscar orçamento:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchBudget()
  }

  return { budget, loading, error, refetch }
}
