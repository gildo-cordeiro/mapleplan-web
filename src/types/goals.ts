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
  description?: string
  status: GoalStatus
  dueDate?: string
  progress?: number
}