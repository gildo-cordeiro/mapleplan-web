/**
 * Tipos relacionados a documentos
 */

import { User } from "./auth"

export enum DocumentStatus {
  VALID = "valid",
  EXPIRING_SOON = "expiring-soon",
  EXPIRED = "expired"
}

/**
 * Representa um documento do usuário
 */
export interface Document {
  id: string
  name: string
  partner: User
  uploadDate: string
  expiryDate?: string
  daysUntilExpiry?: number
  status: DocumentStatus
}
