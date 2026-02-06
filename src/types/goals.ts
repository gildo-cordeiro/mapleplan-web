/**
 * Tipos relacionados a metas
 */

/**
 * Status possível de uma meta
 */
export enum GoalStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in-progress",
  PENDING = "pending"
}

/**
 * Representa uma meta de alto nível
 */
export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  description?: string
  status: GoalStatus
  phase: string
  priority: number
  dueDate?: string
  progress: number
}