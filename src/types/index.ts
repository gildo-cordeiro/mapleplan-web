// Global types for the application
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface ErrorResponse {
  message: string
  code?: string
}

export interface AuthResponse {
  user: User
  token: string
}
