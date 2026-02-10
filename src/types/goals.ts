/**
 * Tipos relacionados a metas
 */


/**
 * Status possível de uma meta
 */
export enum GoalStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in-progress",
  NOT_STARTED = "not-started",
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
  description?: string
  status: GoalStatus
  phase: GoalsPhase
  priority: GoalsPriority
  dueDate: string
  progress: number
  assignedTo: string | null
  assignedToUser: string | null
  assignedToCouple: string | null
}

export interface CreateGoal {
  title: string
  description?: string
  status: GoalStatus
  phase: GoalsPhase
  priority: GoalsPriority
  dueDate: string
  progress: number
  assignedToUser: string | null
  assignedToCouple: string | null
}

export interface UpdateFormData {
    title: string
    description: string
    dueDate: string
    priority: GoalsPriority
    phase: GoalsPhase
    assignedToUser: string | null
    assignedToCouple: string | null
    status: GoalStatus
}

export interface GoalsStatusCounts {
  total: number
  notStarted: number
  inProgress: number
  completed: number
}