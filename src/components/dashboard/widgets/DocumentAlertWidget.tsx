"use client"

import { AlertTriangle, FileCheck, Loader } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { Button } from "@/components/ui/Button"
import { useDocuments } from "@/hooks/useDocuments"

interface Document {
  id: string
  name: string
  partner: string
  expiryDate: string
  daysUntilExpiry: number
}

export default function DocumentAlertWidget() {
  const { criticalDocuments, loading, error } = useDocuments()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerta de Documentos</CardTitle>
        <CardDescription>Segurança e prazos críticos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
              <p className="ml-2 text-sm text-muted-foreground">Carregando documentos...</p>
            </div>
          ) : error ? (
            <div className="text-sm text-red-600 dark:text-red-400 py-4">
              Erro ao carregar documentos: {error}
            </div>
          ) : criticalDocuments.length > 0 ? (
            criticalDocuments.map((doc) => (
              <Alert key={doc.id} className="border-[#dc143c] bg-[#dc143c]/10">
                <AlertTriangle className="h-4 w-4 text-[#dc143c]" />
                <AlertDescription className="ml-2">
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">
                      {doc.name} de {doc.partner}
                    </p>
                    <p className="text-[#dc143c] text-xs mt-1">
                      Expira em {doc.daysUntilExpiry} dias ({new Date(doc.expiryDate).toLocaleDateString("pt-BR")})
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            ))
          ) : (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <FileCheck className="w-5 h-5" />
              <p className="text-sm font-medium">Todos os documentos em dia!</p>
            </div>
          )}

          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Gerenciar Documentos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
