import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { taskService } from '@/services/taskService'
import { Task } from '@/types'

interface UseNextActionsState {
  tasks: Task[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook para buscar próximas ações do usuário
 */
export function useNextActions(): UseNextActionsState {
  const { token } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [token])

  const fetchTasks = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await taskService.getNextActions(token, 5)
      setTasks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar tarefas')
      console.error('Erro ao buscar próximas ações:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchTasks()
  }

  return { tasks, loading, error, refetch }
}
