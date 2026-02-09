"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react"

const summaryData = [
  {
    title: "Orçamento Total",
    value: "CAD $45,000",
    icon: DollarSign,
    color: "text-[#dc143c]",
    bgGradient: "from-red-500 to-red-600",
  },
  {
    title: "Gasto até Agora",
    value: "CAD $12,500",
    percentage: "27.8%",
    icon: TrendingDown,
    color: "text-orange-600",
    bgGradient: "from-orange-500 to-orange-600",
  },
  {
    title: "Saldo Disponível",
    value: "CAD $32,500",
    percentage: "72.2%",
    icon: TrendingUp,
    color: "text-green-600",
    bgGradient: "from-green-500 to-green-600",
  },
  {
    title: "Próximas Despesas",
    value: "CAD $3,200",
    subtitle: "nos próximos 30 dias",
    icon: AlertCircle,
    color: "text-yellow-600",
    bgGradient: "from-yellow-500 to-yellow-600",
  },
]

export default function FinancesSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => {
        const Icon = item.icon
        return (
          <Card
            key={item.title}
            className="border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 shadow-md hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300 rounded-lg" />
            <CardHeader className="relative z-10 pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                  {item.title}
                </h3>
                <div className={`p-2 bg-gradient-to-br ${item.bgGradient} rounded-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-2xl font-black text-foreground">{item.value}</p>
              {item.percentage && (
                <p className="text-xs font-semibold text-muted-foreground mt-2">{item.percentage}</p>
              )}
              {item.subtitle && (
                <p className="text-xs font-semibold text-muted-foreground mt-2">{item.subtitle}</p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
