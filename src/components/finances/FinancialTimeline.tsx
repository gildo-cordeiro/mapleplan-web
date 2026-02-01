"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Calendar } from "lucide-react"

const timelineEvents = [
  {
    date: "15 de Dezembro",
    event: "Pagamento de Taxas de Visto",
    amount: "CAD $500",
    type: "despesa",
  },
  {
    date: "20 de Dezembro",
    event: "Exames Médicos Agendados",
    amount: "CAD $350",
    type: "despesa",
  },
  {
    date: "10 de Janeiro",
    event: "Transferência de Fundos",
    amount: "CAD $8,000",
    type: "receita",
  },
  {
    date: "25 de Janeiro",
    event: "Documentação Notariada",
    amount: "CAD $200",
    type: "despesa",
  },
]

export default function FinancialTimeline() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Cronograma Financeiro</CardTitle>
        <CardDescription>Próximas transações nos próximos 60 dias</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
            <div className="flex flex-col items-center">
              <Calendar className="h-5 w-5 text-[#dc143c]" />
              {index < timelineEvents.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2" />}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{event.date}</p>
                  <p className="text-sm font-medium">{event.event}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={event.type === "despesa" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}
                  >
                    {event.type === "despesa" ? "-" : "+"} {event.amount}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
