import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { documentService } from '@/services/documentService'
import { Document } from '@/types'

interface UseDocumentsState {
  documents: Document[]
  criticalDocuments: Document[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook para buscar documentos do usuário
 */
export function useDocuments(): UseDocumentsState {
  const { token } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [criticalDocuments, setCriticalDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments()
  }, [token])

  const fetchDocuments = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const [allDocs, criticalDocs] = await Promise.all([
        documentService.getDocuments(token),
        documentService.getCriticalDocuments(token)
      ])
      setDocuments(allDocs)
      setCriticalDocuments(criticalDocs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar documentos')
      console.error('Erro ao buscar documentos:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchDocuments()
  }

  return { documents, criticalDocuments, loading, error, refetch }
}
