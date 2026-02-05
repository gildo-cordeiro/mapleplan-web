import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextType, User } from '@/types'
import { userService } from '@/services/userService'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
      fetchUserData(savedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Função auxiliar para buscar dados do usuário ao carregar o token
  const fetchUserData = async (authToken: string) => {
    try {
      const userData = await userService.getCompleteUser(authToken)
      setUser(userData)
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
      // Se falhar, limpar o token
      localStorage.removeItem('token')
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para buscar os dados do usuário autenticado
  const fetchUser = async () => {
    const authToken = token ?? localStorage.getItem('token')
    if (!authToken) {
      setIsLoading(false)
      throw new Error('Token nao encontrado')
    }
    setIsLoading(true)
    if (!token) {
      setToken(authToken)
    }
    try {
      const userData = await userService.getCompleteUser(authToken)
      setUser(userData)
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
      throw error instanceof Error ? error : new Error('Erro ao buscar dados do usuario')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAuthenticated, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}