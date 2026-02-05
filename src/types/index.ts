// ============================================================================
// GLOBAL TYPES
// ============================================================================
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}

// ============================================================================
// RE-EXPORTS
// ============================================================================

// Authentication & User
export type { User, AuthResponse, AuthContextType, UserDataState } from './auth'

// Tasks
export type { Task } from './tasks'

// Goals
export type { Goal } from './goals'

// Financial
export type { BudgetData } from './finances'

// Documents
export type { Document } from './documents'
