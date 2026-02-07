/**
 * Tipos relacionados a metas
 */

import { User } from "./auth"

/**
 * Status possível de uma meta
 */
export enum GoalStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in-progress",
  PENDING = "pending"
}

export enum GoalsPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low"
}

export enum GoalsPhase {
  PRE_DEPARTURE = "pre-departure",
  ARRIVAL = "arrival",
  POST_ARRIVAL = "post-arrival"
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
  phase: GoalsPhase
  priority: GoalsPriority
  dueDate: string
  progress: number
  assignedTo: string
}

export interface GoalsStatusCounts {
  total: number
  pending: number
  inProgress: number
  completed: number
}