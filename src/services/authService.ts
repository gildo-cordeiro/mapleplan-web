import axios from 'axios'
import { AuthResponse, User } from '@/types'

const API_URL = import.meta.env.VITE_API_URL

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/signup`, { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return axios.post(`${API_URL}/auth/forgot-password`, { email })
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    return axios.post(`${API_URL}/auth/reset-password`, { token, newPassword })
  }
}