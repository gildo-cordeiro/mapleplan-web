"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

const fundsSources = [
  {
    source: "Poupança Pessoal - João",
    amount: "CAD $15,000",
    status: "confirmado",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    source: "Poupança Pessoal - Maria",
    amount: "CAD $12,000",
    status: "confirmado",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    source: "Empréstimo Familiar",
    amount: "CAD $8,000",
    status: "pendente",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    source: "Investimentos",
    amount: "CAD $10,000",
    status: "planejado",
    icon: AlertCircle,
    color: "text-orange-600",
  },
]

export default function FundsSources() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Fontes de Financiamento</CardTitle>
        <CardDescription>Total disponível: CAD $45,000</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fundsSources.map((fund) => {
          const Icon = fund.icon
          const statusColor = {
            confirmado: "bg-green-100 text-green-800",
            pendente: "bg-yellow-100 text-yellow-800",
            planejado: "bg-orange-100 text-orange-800",
          }
          return (
            <div key={fund.source} className="flex items-start justify-between pb-4 border-b last:border-0">
              <div className="space-y-1">
                <p className="text-sm font-medium">{fund.source}</p>
                <p className="text-xs text-gray-500">{fund.amount}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Icon className={`h-4 w-4 ${fund.color}`} />
                <Badge variant="outline" className={statusColor[fund.status as keyof typeof statusColor]}>
                  {fund.status}
                </Badge>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
