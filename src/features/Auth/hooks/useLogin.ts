"use client"

import { useState } from "react"
import { authService } from "../api/authService"
import type { LoginCredentials, AuthState } from "../types"

export const useLogin = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  })

  const login = async (credentials: LoginCredentials) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }))

    try {
      const response = await authService.login(credentials)
      setState({
        user: response.user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      })

      // Store token (in real app, use secure storage)
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", response.token)
      }

      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      setState({
        user: null,
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
      })
      throw error
    }
  }

  return { ...state, login }
}
