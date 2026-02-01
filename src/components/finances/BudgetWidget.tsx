"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"

const budgetCategories = [
  { category: "Taxas de Visto", allocated: 2500, spent: 1200, color: "bg-red-500" },
  { category: "Exames Médicos", allocated: 1500, spent: 800, color: "bg-orange-500" },
  { category: "Documentos", allocated: 800, spent: 450, color: "bg-yellow-500" },
  { category: "Transporte", allocated: 3000, spent: 2100, color: "bg-green-500" },
  { category: "Acomodação Inicial", allocated: 4000, spent: 1500, color: "bg-blue-500" },
  { category: "Reserva de Emergência", allocated: 5000, spent: 0, color: "bg-purple-500" },
]

export default function BudgetWidget() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Orçamento por Categoria</CardTitle>
        <CardDescription>Acompanhe gastos versus orçamento alocado</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {budgetCategories.map((item) => {
          const percentage = (item.spent / item.allocated) * 100
          return (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.category}</span>
                <span className="text-xs text-gray-500">
                  CAD ${item.spent} / ${item.allocated}
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
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
