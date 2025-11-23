// API service for authentication
import type { LoginCredentials, RegisterCredentials } from "../types"
import type { AuthResponse } from "@/types"

// Simulated API calls - replace with real API endpoints
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "1",
            email: credentials.email,
            firstName: "John",
            lastName: "Doe",
          },
          token: "mock-token-" + Date.now(),
        })
      }, 1500)
    })
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "2",
            email: credentials.email,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
          },
          token: "mock-token-" + Date.now(),
        })
      }, 1500)
    })
  },

  logout: async (): Promise<void> => {
    return Promise.resolve()
  },

  verifyToken: async (token: string): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "1",
            email: "user@example.com",
            firstName: "John",
            lastName: "Doe",
          },
          token,
        })
      }, 500)
    })
  },
}
