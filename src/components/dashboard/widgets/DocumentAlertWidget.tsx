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
    <Card className="border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300" />
      <CardHeader className="relative z-10">
        <CardTitle>Alerta de Documentos</CardTitle>
        <CardDescription>Segurança e prazos críticos</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
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
              <Alert key={doc.id} className="border-[#dc143c] bg-[#dc143c]/10 dark:bg-[#dc143c]/20 hover:bg-[#dc143c]/15 dark:hover:bg-[#dc143c]/25 transition-colors duration-300">
                <AlertTriangle className="h-4 w-4 text-[#dc143c]" />
                <AlertDescription className="ml-2">
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">
                      {doc.name} de {doc.partner}
                    </p>
                    <p className="text-[#dc143c] dark:text-[#ff6347] text-xs mt-1 font-medium">
                      Expira em {doc.daysUntilExpiry} dias ({new Date(doc.expiryDate).toLocaleDateString("pt-BR")})
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            ))
          ) : (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200/50 dark:border-green-900/30">
              <FileCheck className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">Todos os documentos em dia!</p>
            </div>
          )}

          <Button variant="outline" className="w-full mt-4 bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
            Gerenciar Documentos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
