import axios from 'axios'
import { Document, User } from '@/types'
import { DocumentStatus } from '@/types/documents'
import { getHeaders } from '@/lib/api'

const API_URL = import.meta.env.VITE_API_URL

export const documentService = {
  /**
   * Busca documentos do usuário
   */
  getDocuments: async (token: string, filters?: {
    partner?: User
    status?: DocumentStatus
  }): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/documents`, {
      headers: getHeaders(token),
      params: filters
    })
    return response.data
  },

  /**
   * Busca documentos críticos (vencendo em breve ou vencidos)
   */
  getCriticalDocuments: async (token: string): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/documents/critical`, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Upload de um novo documento
   */
  uploadDocument: async (token: string, file: File, metadata: {
    name: string
    partner: User
    expiryDate?: string
  }): Promise<Document> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', metadata.name)
    formData.append('partner', metadata.partner.id)
    if (metadata.expiryDate) {
      formData.append('expiryDate', metadata.expiryDate)
    }

    const response = await axios.post(`${API_URL}/documents/upload`, formData, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Atualiza informações de um documento
   */
  updateDocument: async (token: string, documentId: string, updates: Partial<Document>): Promise<Document> => {
    const response = await axios.put(`${API_URL}/documents/${documentId}`, updates, {
      headers: getHeaders(token)
    })
    return response.data
  },

  /**
   * Deleta um documento
   */
  deleteDocument: async (token: string, documentId: string): Promise<void> => {
    await axios.delete(`${API_URL}/documents/${documentId}`, {
      headers: getHeaders(token)
    })
  },

  /**
   * Download de um documento
   */
  downloadDocument: async (token: string, documentId: string): Promise<Blob> => {
    const response = await axios.get(`${API_URL}/documents/${documentId}/download`, {
      headers: getHeaders(token),
      responseType: 'blob'
    })
    return response.data
  }
}
