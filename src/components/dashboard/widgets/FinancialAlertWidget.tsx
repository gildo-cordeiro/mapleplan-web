"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { AlertTriangle, Loader } from "lucide-react"
import { useFinancial } from "@/hooks/useFinancial"

export default function FinancialAlertWidget() {
  const { budget, loading, error } = useFinancial()

  const renderCard = (children: React.ReactNode) => (
    <Card className="border-0 bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--maple-primary)]/0 to-[var(--maple-primary)]/0 group-hover:from-[var(--maple-primary)]/5 group-hover:to-[var(--maple-primary)]/0 transition-all duration-300" />
      {children}
    </Card>
  )

  if (loading) {
    return renderCard(
      <>
        <CardHeader className="relative z-10">
          <CardTitle>Alerta Financeiro</CardTitle>
          <CardDescription>Visão rápida do orçamento de mudança</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center justify-center py-8">
            <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
            <p className="ml-2 text-sm text-muted-foreground">Carregando dados financeiros...</p>
          </div>
        </CardContent>
      </>
    )
  }

  if (error) {
    return renderCard(
      <>
        <CardHeader className="relative z-10">
          <CardTitle>Alerta Financeiro</CardTitle>
          <CardDescription>Visão rápida do orçamento de mudança</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-sm text-red-600 dark:text-red-400 py-4">
            Erro ao carregar dados: {error}
          </div>
        </CardContent>
      </>
    )
  }

  if (!budget) {
    return renderCard(
      <>
        <CardHeader className="relative z-10">
          <CardTitle>Alerta Financeiro</CardTitle>
          <CardDescription>Visão rápida do orçamento de mudança</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-sm text-muted-foreground py-4 text-center">
            Nenhum orçamento configurado
          </div>
        </CardContent>
      </>
    )
  }

  const remaining = budget.budgeted - budget.spent
  const percentage = (budget.spent / budget.budgeted) * 100

  return renderCard(
    <>
      <CardHeader className="relative z-10">
        <CardTitle>Alerta Financeiro</CardTitle>
        <CardDescription>Visão rápida do orçamento de mudança</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Orçado vs. Gasto</span>
              <span className="font-semibold">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-600/30 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#ff6347] to-[#dc143c] h-full transition-all duration-500"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{budget.currency} ${budget.spent.toLocaleString()}</span>
              <span>{budget.currency} ${budget.budgeted.toLocaleString()}</span>
            </div>
          </div>

          {/* Settlement funds alert */}
          {budget.settlementFunds < 5000 && (
            <Alert className="border-[#ff6347] bg-[#ff6347]/10 dark:bg-[#ff6347]/20">
              <AlertTriangle className="h-4 w-4 text-[#ff6347]" />
              <AlertDescription className="text-[#dc143c] dark:text-[#ff6347]">
                Fundos de assentamento baixos: {budget.currency} ${budget.settlementFunds.toLocaleString()}
              </AlertDescription>
            </Alert>
          )}

          {/* Summary */}
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 space-y-2 border border-slate-200/50 dark:border-slate-600/30">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Restante:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {budget.currency} ${remaining.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Settlement Funds:</span>
              <span className="font-semibold">{budget.currency} ${budget.settlementFunds.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )
}
