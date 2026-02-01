"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { AlertTriangle } from "lucide-react"

export default function FinancialAlertWidget() {
  const budget = {
    budgeted: 25000,
    spent: 18500,
    settlementFunds: 3000,
  }

  const remaining = budget.budgeted - budget.spent
  const percentage = (budget.spent / budget.budgeted) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerta Financeiro</CardTitle>
        <CardDescription>Visão rápida do orçamento de mudança</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Orçado vs. Gasto</span>
              <span className="font-semibold">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#ff6347] to-[#dc143c] h-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>CAD ${budget.spent.toLocaleString()}</span>
              <span>CAD ${budget.budgeted.toLocaleString()}</span>
            </div>
          </div>

          {/* Settlement funds alert */}
          {budget.settlementFunds < 5000 && (
            <Alert className="border-[#ff6347] bg-[#ff6347]/10">
              <AlertTriangle className="h-4 w-4 text-[#ff6347]" />
              <AlertDescription className="text-[#dc143c]">
                Fundos de assentamento baixos: CAD ${budget.settlementFunds.toLocaleString()}
              </AlertDescription>
            </Alert>
          )}

          {/* Summary */}
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Restante:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                CAD ${remaining.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Settlement Funds:</span>
              <span className="font-semibold">CAD ${budget.settlementFunds.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
