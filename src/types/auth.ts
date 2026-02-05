/**
 * Tipos relacionados a autenticação e usuário
 */

/**
 * Representa um usuário da aplicação
 */
export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  dateOfBirth?: string
  partnerEmail?: string
  partnerName?: string
  province?: string
  createdAt?: string
}

/**
 * Resposta da API ao fazer login/signup
 */
export interface AuthResponse {
  token: string
  user: User
}

/**
 * Contexto de autenticação da aplicação
 */
export interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  fetchUser: () => Promise<void>
  logout: () => void
}

/**
 * Estado do hook useUserData
 */
export interface UserDataState {
  user: User | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}
