import axios from 'axios'
import { Task } from '@/types'
import { getHeaders } from '@/lib/api'

const API_URL = import.meta.env.VITE_API_URL

export const taskService = {
  /**
   * Busca as próximas ações/tarefas do usuário
   */
  getNextActions: async (token: string, limit: number = 5): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks/next-actions`, {
      headers: getHeaders(token),
      params: { limit }
    })
    return response.data
  },

  /**
   * Busca todas as tarefas do usuário
   */
  getTasks: async (token: string, filters?: {
    status?: 'completed' | 'pending'
    priority?: 'high' | 'medium' | 'low'
    assignedTo?: 'partner1' | 'partner2' | 'both'
  }): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: getHeaders(token),
      params: filters
    })
    return response.data
  },

  /**
   * Cria uma nova tarefa
   */
  createTask: async (token: string, task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Atualiza uma tarefa existente
   */
  updateTask: async (token: string, taskId: string, updates: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, updates, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Marca uma tarefa como concluída
   */
  completeTask: async (token: string, taskId: string): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/tasks/${taskId}/complete`, {}, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Deleta uma tarefa
   */
  deleteTask: async (token: string, taskId: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: getHeaders(token)
    })
  }
}
