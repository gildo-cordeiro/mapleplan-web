import axios from 'axios'
import { Goal } from '@/types'
import { getHeaders } from '@/lib/api'

const API_URL = import.meta.env.VITE_API_URL

export const goalService = {

  getWidgetGoals: async (token: string): Promise<Goal[]> => {
    const response = await axios.get(`${API_URL}/goals/widget`, {
      headers: getHeaders(token)
    })
    return response.data
  },
  /**
   * Busca as metas do usuário
   */
  getGoals: async (token: string, filters?: {
    status?: 'completed' | 'in-progress' | 'pending'
  }): Promise<Goal[]> => {
    const response = await axios.get(`${API_URL}/goals`, {
      headers: getHeaders(token),
      params: filters
    })
    return response.data
  },

  /**
   * Busca uma meta específica
   */
  getGoal: async (token: string, goalId: string): Promise<Goal> => {
    const response = await axios.get(`${API_URL}/goals/${goalId}`, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Cria uma nova meta
   */
  createGoal: async (token: string, goal: Omit<Goal, 'id'>): Promise<Goal> => {
    const response = await axios.post(`${API_URL}/goals`, goal, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Atualiza uma meta existente
   */
  updateGoal: async (token: string, goalId: string, updates: Partial<Goal>): Promise<Goal> => {
    const response = await axios.put(`${API_URL}/goals/${goalId}`, updates, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Marca uma meta como concluída
   */
  completeGoal: async (token: string, goalId: string): Promise<Goal> => {
    const response = await axios.patch(`${API_URL}/goals/${goalId}/complete`, {}, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Deleta uma meta
   */
  deleteGoal: async (token: string, goalId: string): Promise<void> => {
    await axios.delete(`${API_URL}/goals/${goalId}`, {
      headers: getHeaders(token)
    })
  }
}
