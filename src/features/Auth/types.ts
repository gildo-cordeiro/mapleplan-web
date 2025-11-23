// Auth-specific types
export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string
  lastName: string
  confirmPassword: string
}

export interface AuthState {
  user: import("@/types").User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}
