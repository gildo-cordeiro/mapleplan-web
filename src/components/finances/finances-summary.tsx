"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react"

const summaryData = [
  {
    title: "Orçamento Total",
    value: "CAD $45,000",
    icon: DollarSign,
    color: "text-[#dc143c]",
    bgColor: "bg-red-50",
  },
  {
    title: "Gasto até Agora",
    value: "CAD $12,500",
    percentage: "27.8%",
    icon: TrendingDown,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Saldo Disponível",
    value: "CAD $32,500",
    percentage: "72.2%",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Próximas Despesas",
    value: "CAD $3,200",
    subtitle: "nos próximos 30 dias",
    icon: AlertCircle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
]

export default function FinancesSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.title} className="border-none shadow-sm">
            <CardHeader className={`pb-3 ${item.bgColor}`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{item.title}</CardTitle>
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{item.value}</p>
              {item.percentage && <p className="text-xs text-gray-500 mt-1">{item.percentage}</p>}
              {item.subtitle && <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
