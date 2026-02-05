/**
 * Tipos relacionados a tarefas e ações
 */

import { User } from "./auth"

export enum TaskPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low"
}

/**
 * Representa uma tarefa/ação no checklist
 */
export interface Task {
  id: string
  title: string
  description?: string
  dueDate: string
  assignedTo: User[]
  priority: TaskPriority
  completed?: boolean
}
