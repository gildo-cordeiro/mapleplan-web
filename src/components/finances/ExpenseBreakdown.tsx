"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const expenseData = [
  { name: "Visto", value: 1200, color: "#dc143c" },
  { name: "Médico", value: 800, color: "#ff6347" },
  { name: "Documentos", value: 450, color: "#ffd700" },
  { name: "Transporte", value: 2100, color: "#8b4513" },
  { name: "Acomodação", value: 1500, color: "#daa520" },
  { name: "Outros", value: 4450, color: "#d2b48c" },
]

export default function ExpenseBreakdown() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Distribuição de Despesas</CardTitle>
        <CardDescription>Proporção de gastos por categoria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `CAD $${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
