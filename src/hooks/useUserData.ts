import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { UserDataState } from '@/types'

/**
 * Hook customizado para buscar e gerenciar dados do usuário
 * Busca informações completas do usuário autenticado
 */
export function useUserData(): UserDataState {
  const { user: contextUser, isLoading: authLoading, fetchUser } = useAuth()
  const [loading, setLoading] = useState(authLoading)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(authLoading)
  }, [authLoading])

  const refetch = async () => {
    setLoading(true)
    setError(null)
    try {
      await fetchUser()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar dados do usuário')
    } finally {
      setLoading(false)
    }
  }

  return {
    user: contextUser,
    loading,
    error,
    refetch
  }
}
