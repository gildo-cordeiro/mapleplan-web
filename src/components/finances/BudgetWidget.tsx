"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Landmark } from "lucide-react"

const budgetCategories = [
  { category: "Taxas de Visto", allocated: 2500, spent: 1200, color: "from-red-500 to-red-600" },
  { category: "Exames Médicos", allocated: 1500, spent: 800, color: "from-orange-500 to-orange-600" },
  { category: "Documentos", allocated: 800, spent: 450, color: "from-yellow-500 to-yellow-600" },
  { category: "Transporte", allocated: 3000, spent: 2100, color: "from-green-500 to-green-600" },
  { category: "Acomodação Inicial", allocated: 4000, spent: 1500, color: "from-blue-500 to-blue-600" },
  { category: "Reserva de Emergência", allocated: 5000, spent: 0, color: "from-purple-500 to-purple-600" },
]

export default function BudgetWidget() {
  return (
    <Card className="border-0 bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300 rounded-lg" />
      <CardHeader className="relative z-10">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gradient-to-br from-[var(--maple-primary)] to-[var(--maple-primary)]/70 rounded-lg">
            <Landmark className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Orçamento por Categoria</CardTitle>
            <CardDescription>Acompanhe gastos versus orçamento alocado</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 space-y-6">
        {budgetCategories.map((item) => {
          const percentage = (item.spent / item.allocated) * 100
          return (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{item.category}</span>
                <span className="text-xs font-bold text-muted-foreground">
                  CAD ${item.spent} / ${item.allocated}
                </span>
              </div>
              <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-300 shadow-lg`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>{percentage.toFixed(0)}%</span>
                <span>Saldo: CAD ${item.allocated - item.spent}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
