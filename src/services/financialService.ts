import axios from 'axios'
import { BudgetData } from '@/types'
import { getHeaders } from '@/lib/api'

const API_URL = import.meta.env.VITE_API_URL

export const financialService = {
  /**
   * Busca dados financeiros do usuário
   */
  getBudget: async (token: string): Promise<BudgetData> => {
    const response = await axios.get(`${API_URL}/finances/budget`, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Atualiza orçamento
   */
  updateBudget: async (token: string, updates: Partial<BudgetData>): Promise<BudgetData> => {
    const response = await axios.put(`${API_URL}/finances/budget`, updates, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Busca despesas do usuário
   */
  getExpenses: async (token: string, filters?: {
    startDate?: string
    endDate?: string
    category?: string
  }): Promise<any[]> => {
    const response = await axios.get(`${API_URL}/finances/expenses`, {
      headers: getHeaders(token),
      params: filters
    })
    return response.data
  },

  /**
   * Cria uma nova despesa
   */
  createExpense: async (token: string, expense: any): Promise<any> => {
    const response = await axios.post(`${API_URL}/finances/expenses`, expense, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Busca resumo financeiro
   */
  getFinancialSummary: async (token: string): Promise<any> => {
    const response = await axios.get(`${API_URL}/finances/summary`, {
      headers: getHeaders(token)
    })
    return response.data
  }
}
