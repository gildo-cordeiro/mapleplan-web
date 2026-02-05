/**
 * Tipos relacionados a dados financeiros
 */

/**
 * Representa dados de orçamento financeiro
 */
export interface BudgetData {
  id: string
  budgeted: number
  spent: number
  settlementFunds: number
  currency: string
  lastUpdated: string
}
