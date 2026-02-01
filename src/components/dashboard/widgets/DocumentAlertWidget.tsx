"use client"

import { AlertTriangle, FileCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { Button } from "@/components/ui/Button"

interface Document {
  id: string
  name: string
  partner: string
  expiryDate: string
  daysUntilExpiry: number
}

export default function DocumentAlertWidget() {
  const documents: Document[] = [
    {
      id: "1",
      name: "Passaporte",
      partner: "João",
      expiryDate: "2026-01-15",
      daysUntilExpiry: 51,
    },
    {
      id: "2",
      name: "Carta de Referência",
      partner: "Maria",
      expiryDate: "2025-11-30",
      daysUntilExpiry: 5,
    },
    {
      id: "3",
      name: "Comprovante de Fundos",
      partner: "João",
      expiryDate: "2026-06-20",
      daysUntilExpiry: 208,
    },
  ]

  const criticalDocuments = documents.filter((doc) => doc.daysUntilExpiry < 60)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerta de Documentos</CardTitle>
        <CardDescription>Segurança e prazos críticos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {criticalDocuments.length > 0 ? (
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
